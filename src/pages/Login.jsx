import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin()
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-[0_18px_50px_rgba(11,46,42,.12)]"
      >
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-xl font-serif text-accent">
            B
          </div>
          <h1 className="font-serif text-2xl text-navy">Welcome back</h1>
          <p className="mt-1 text-sm text-[#6B7B72]">Sign in to Bambardara Dashboard</p>
        </div>

        <label className="mb-4 block text-sm text-ink">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-1.5 h-10 w-full rounded-md border border-[#DDE5DF] px-3 outline-none focus:border-[#416454]"
          />
        </label>

        <label className="mb-6 block text-sm text-ink">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-1.5 h-10 w-full rounded-md border border-[#DDE5DF] px-3 outline-none focus:border-[#416454]"
          />
        </label>

        <button
          type="submit"
          className="h-10 w-full rounded-md bg-navy text-sm font-medium text-white hover:bg-[#28533F]"
        >
          Login
        </button>
      </form>
    </main>
  )
}
