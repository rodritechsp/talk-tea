const AUTH_KEY = 'talk_tea_auth';

// Simulate network latency
const fakeNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const authService = {
  async login(username: string, password?: string): Promise<boolean> {
    await fakeNetworkDelay(500);

    // In a real app, this would be a fetch call to a backend API
    const isValidUser = username.toLowerCase() === 'pai' || username.toLowerCase() === 'mae';
    const isValidPassword = password === 'cuidar';

    if (isValidUser && isValidPassword) {
      try {
        localStorage.setItem(AUTH_KEY, 'true');
        return true;
      } catch (error) {
        console.error('Could not access localStorage:', error);
        // Fallback for environments where localStorage is disabled
        return true; 
      }
    }
    return false;
  },

  logout(): void {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Could not access localStorage:', error);
    }
  },

  isAuthenticated(): boolean {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch (error) {
      console.error('Could not access localStorage:', error);
      return false;
    }
  },
};