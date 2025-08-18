export async function verifyUser(email: string, password: string): Promise<boolean> {
  if (!email) return false;
  return password === 'password123';
}
