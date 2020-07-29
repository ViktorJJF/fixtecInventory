import axios from "axios";
export default {
  list(query) {
    return axios.get("/api/qualities",{params:query});
  },
  update(id, payload) {
    return axios.put(`/api/qualities/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/qualities", payload);
  },
  delete(id) {
    return axios.delete(`/api/qualities/${id}`);
  },
};