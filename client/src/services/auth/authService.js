import api from "../../api/axios";

const authService = {
  register: async (formData) => {
    const response = await api.post("/users/register", formData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/users/logout");
    return response.data;
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get("/users/current-user");
      return response.data;
    } catch (error) {
      throw new Error("no current user");
    }
  },
  refreshToken: async () => {
    const response = await api.post("/users/refresh-token");
    return response.data;
  },
  changePassword: async (password) => {
    const response = await api.post("/users/change-password", password);
    return response.data;
  },
  updateAccount: async (accountData) => {
    const response = await api.patch("/users/update-account", accountData);
    return response.data;
  },
};
export default authService;
