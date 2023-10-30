import { ENV } from "../utils";
const { API_ROUTES } = ENV;



export class Auth {
  // Registro
  async signUp(data){
    const response = await fetch(`${ENV.BASE_API_URL}${API_ROUTES.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      if (response.status === 201) {
        console.log("Usuario creado exitosamente");
        return response
      }
    } catch (error) {
      console.log(error);
    }
  };



  // Autenticación
  async login(data)  {
    
    const response = await fetch(`${ENV.BASE_API_URL}${API_ROUTES.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(data, "data");
    console.log(response.status, "status");
    
    try {
      if(response.status === 200){
        const result = await response.json();

        if (result && result.access) {
          this.setAccessToken(result.access);
        }
        console.log("Usuario logueado exitosamente");
        return response;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getAccessToken = () => {
    return localStorage.getItem("access");
  };

  setAccessToken = (accessToken) => {
    localStorage.setItem("access", accessToken);
  };

  async getAllUsers(){
    const response = await fetch(`${ENV.BASE_API_URL}${API_ROUTES.GET}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    try {
      if (response.status === 200) {
        console.log("Lista de usuarios");
        return response
      }
    } catch (error) {
      console.log(error);
    }
  };

  async deleteUser(data){
    const response = await fetch(`${ENV.BASE_API_URL}${API_ROUTES.GET}/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    try {
      if (response.status === 200) {
        console.log("Usuario eliminado exitosamente");
        return response
      }
    } catch (error) {
      console.log(error);
    }
  }

}
