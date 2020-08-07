import axios from "axios";
export default {
  list(query = { sort: "name", order: "1" }) {
    return axios.get("/api/services", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/services/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/services", payload);
  },
  delete(id) {
    return axios.delete(`/api/services/${id}`);
  },
};
