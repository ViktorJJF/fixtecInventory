import axios from "axios";
export default {
  list(query = { sort: "name", order: "1" }) {
    return axios.get("/api/tools", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/tools/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/tools", payload);
  },
  delete(id) {
    return axios.delete(`/api/tools/${id}`);
  },
};
