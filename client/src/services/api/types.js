import axios from "axios";
export default {
  list(query = { sort: "name", order: "1" }) {
    return axios.get("/api/types", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/types/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/types", payload);
  },
  delete(id) {
    return axios.delete(`/api/types/${id}`);
  },
};
