import axios from "axios";
export default {
  list(query) {
    return axios.get("/api/colors",{params:query});
  },
  update(id, payload) {
    return axios.put(`/api/colors/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/colors", payload);
  },
  delete(id) {
    return axios.delete(`/api/colors/${id}`);
  },
};