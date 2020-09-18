import axios from "axios";
export default {
  list(query) {
    if (query) {
      query.sort = "date";
      query.order = -1;
    }
    return axios.get("/api/sales-services", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/sales-services/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/sales-services", payload);
  },
  delete(id) {
    return axios.delete(`/api/sales-services/${id}`);
  },
};
