import formatISO from "date-fns/formatISO";

export default () => ({
  name: "",
  toolsTypeId: null,
  stock: 0,
  purchasePrice: 0,
  description: "",
  date: formatISO(new Date(), { representation: "date" }),
});
