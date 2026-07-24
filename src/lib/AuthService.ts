export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login gagal');
    }

    return result.data;
  } catch (error: any) {
    console.error('Error in loginUser:', error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
  document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
