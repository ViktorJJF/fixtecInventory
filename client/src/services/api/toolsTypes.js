import axios from "axios";
export default {
  list(query = { sort: "name", order: "1" }) {
    return axios.get("/api/tools-types", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/tools-types/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/tools-types", payload);
  },
  delete(id) {
    return axios.delete(`/api/tools-types/${id}`);
  },
};
