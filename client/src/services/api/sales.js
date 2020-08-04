import axios from "axios";
export default {
  list(query) {
    return axios.get("/api/sales", { params: query });
  },
  listWithProducts(query) {
    if (query) query.sort = "date";
    query.order = -1;
    return axios.get("/api/sales/with-products", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/sales/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/sales", payload);
  },
  delete(id) {
    return axios.delete(`/api/sales/${id}`);
  },
};
