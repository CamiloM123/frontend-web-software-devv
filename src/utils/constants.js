const SERVER_IP = "http://localhost:3500/";

const API_PATH = "api/v1/";

export const ENV = {

  BASE_API_URL: SERVER_IP + API_PATH,
  // Encabezado rutas para almacenamiento, edición y eliminación de archivos

  API_ROUTES: {
    GET: "users",
    // http://localhost:3500/api/v1/signup
    REGISTER: "users/signup",
    // http://localhost:3500/api/v1/login
    LOGIN: "users/login",
    // http://localhost:3500/api/v1/get-me
    // LOGIN: "get-me",
    

    // http://localhost:3500/api/v1/users/new-user
    CREATE_USER: "users/new-user",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
