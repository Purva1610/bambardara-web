/**
 * Completely prevents Webpack 5 / Terser worker thread deadlocks and OOM during container builds.
 *
 * In Docker / WSL2 environments, spawning Jest-worker worker threads inside Node.js
 * causes thread exhaustion, libuv threadpool starvation, and IPC MessagePort deadlocks.
 *
 * This script:
 * 1. Hooks terser-webpack-plugin to force getAvailableNumberOfCores() => 0, which instructs
 *    TerserPlugin to minify directly on the main event loop without spawning any worker threads.
 * 2. Clamps os.cpus() and os.availableParallelism() to 1 so that other parallel build steps
 *    do not spawn multi-core worker pools.
 */
const os = require('os');
const Module = require('module');

const maxCores = parseInt(process.env.BUILD_MAX_CORES, 10) || 1;

// Clamp os.cpus()
const origCpus = os.cpus.bind(os);
os.cpus = function () {
  const cpus = origCpus() || [];
  return cpus.slice(0, Math.max(1, maxCores));
};

// Clamp os.availableParallelism()
if (typeof os.availableParallelism === 'function') {
  os.availableParallelism = function () {
    return Math.max(1, maxCores);
  };
}

// Intercept terser-webpack-plugin to force in-process, single-threaded minification (no jest-worker)
const origRequire = Module.prototype.require;
Module.prototype.require = function (id) {
  const res = origRequire.apply(this, arguments);
  if (
    typeof id === 'string' &&
    (id === 'terser-webpack-plugin' || id.endsWith('/terser-webpack-plugin') || id.endsWith('\\terser-webpack-plugin'))
  ) {
    if (res && typeof res.getAvailableNumberOfCores === 'function') {
      res.getAvailableNumberOfCores = () => 0;
    }
  }
  return res;
};

