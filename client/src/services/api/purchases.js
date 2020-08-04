import axios from "axios";
export default {
  list(query) {
    return axios.get("/api/purchases", { params: query });
  },
  listWithProducts(query) {
    if (query) query.sort = "date";
    query.order = -1;
    return axios.get("/api/purchases/with-products", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/purchases/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/purchases", payload);
  },
  delete(id) {
    return axios.delete(`/api/purchases/${id}`);
  },
};
