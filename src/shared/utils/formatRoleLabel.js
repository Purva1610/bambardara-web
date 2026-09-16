/** "PROJECT_DIRECTOR" -> "Project Director" - for display only, never for authorization decisions. */
export default function formatRoleLabel(code) {
  if (!code) return '';
  return code
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}
