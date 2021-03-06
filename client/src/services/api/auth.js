import axios from "axios";
export default {
  login(email, password) {
    return axios.post("/api/login", { email, password });
  },
  editUser(id, payload) {
    return axios.put(`/api/members/${id}`, payload);
  },
  updatePassword(id, newPassword) {
    return axios.put(`/api/members/${id}/update-password`, { newPassword });
  },
  refreshToken() {
    return axios.get("/api/token");
  },
};
