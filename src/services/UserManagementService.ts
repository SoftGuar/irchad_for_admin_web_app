import { fetchClient } from "@/utils/fetchClient";
import { ApiResponse } from "./ApiResponse";
import { apiService } from "./apiService";
import { Device } from "@/types/device";


const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
};



export const getUsers = async (type: string) => {
    const token = getToken();
    const uri = type === 'admin' ? `/superAdmin/admins` : `/admin/account/${type}`;
    return fetchClient(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` 
      },
    });
  };


  export const getUserById = async (type: string, id: string) => {
    const token = getToken();
    const uri = type === 'admin' ? `/superAdmin/admin/${id}` : `/admin/account/${type}/${id}`;
    return fetchClient(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
       
      },
    });
  };

  export const addUser = async (type:string, data: Record<string, any>) => {
    const token = getToken();
    const uri = type === 'admin' ? `/superAdmin/admin` : `/admin/account/${type}`;
    return fetchClient(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };


  export const editUser = async (type:string, id: string, data: Record<string, any>) => {
    const token = getToken();
    const uri = type === 'admin' ? `/superAdmin/admin/${id}` : `/admin/account/${type}/${id}`;
    return fetchClient(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };


  export const deleteUser = async (type:string, id: string) => {
    const token = getToken();
    const uri = type === 'admin' ? `/superAdmin/admin/${id}` : `/admin/account/${type}/${id}`;
    return fetchClient(uri, {
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

 export const getHistory = async () => {
    const token = getToken();
    return fetchClient('/account/history', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` 
      },
    });
  };

   export const deviceApi = {
    getAll: async (): Promise<ApiResponse<Device[]>> => {
      return await apiService.get("/admin/dispositive/");
    }};
  
 