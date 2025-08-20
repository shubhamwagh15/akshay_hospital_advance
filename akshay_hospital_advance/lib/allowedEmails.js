// lib/allowedEmails.js
// Configure the email addresses that have dashboard access
export const allowedEmails = new Set([
  'swaghdwagh@gmail.com',
  'darshanwagh1@gmail.com',

  // Add more authorized email addresses here
]);

// Helper function to check if user has dashboard access
export function hasAdminAccess(userEmail) {
  if (!userEmail) return false;
  return allowedEmails.has(userEmail.toLowerCase().trim());
}
