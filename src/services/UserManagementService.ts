import { fetchClient } from "@/utils/fetchClient";


const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
};


export const getUsers = async (type: string) => {
    const token = getToken();
    return fetchClient(`/admin/account/${type}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` 
      },
    });
  };


  export const getUserById = async (type: string, id: string) => {
    const token = getToken();
    return fetchClient(`/admin/account/${type}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
       
      },
    });
  };

  export const addUser = async (type:string, data: Record<string, any>) => {
    const token = getToken();
    return fetchClient(`/admin/account/${type}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };


  export const editUser = async (type:string, id: string, data: Record<string, any>) => {
    const token = getToken();
    return fetchClient(`/admin/account/${type}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };


  export const deleteUser = async (type:string, id: string) => {
    const token = getToken();
    return fetchClient(`/admin/account/${type}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({id:id})
    });
  };


  export const getProfile = async () => {
    const token = getToken();
    return fetchClient('/account/', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` 
      },
    });
  };


  export const editProfile = async (data: Record<string, any>) => {
    const token = getToken();
    return fetchClient('/account/', {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };