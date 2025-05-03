import dotenv from 'dotenv';
dotenv.config();
export const fetchClient = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
  
  
      return response.json();
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  };