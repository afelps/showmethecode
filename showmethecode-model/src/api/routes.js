const { generateRoutes } = require("@herbsjs/herbs2rest");
const controllers = [
  {
    name: "chamada",
    getAll: { usecase: require("../domain/usecases/ObterCustoChamada") },
  },
  {
    name: "tarifa",
    getAll: { usecase: require("../domain/usecases/ObterTarifas") },
  },
  {
    name: "plano",
    getAll: { usecase: require("../domain/usecases/ObterPlanos") },
  },
];

module.exports = (routes) => {
  generateRoutes(controllers, routes, true);
};
