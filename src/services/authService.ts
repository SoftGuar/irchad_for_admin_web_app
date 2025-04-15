import { fetchClient } from "@/utils/fetchClient";

export const login = async (email: string, password: string, role: string) => {
  return fetchClient("/login/", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
  });
};