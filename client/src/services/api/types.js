import axios from "axios";
export default {
  list(query) {
    return axios.get("/api/types",{params:query});
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