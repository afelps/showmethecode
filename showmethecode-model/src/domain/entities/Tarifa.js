const { entity, field } = require("@herbsjs/herbs");

const Tarifa = entity("Tarifa", {
  origem: field(String, {
    validation: { presence: true },
  }),
  destino: field(String, {
    validation: { presence: true },
  }),
  valor: field(Number, {
    validation: {
      presence: true,
      numericality: {
        greaterThan: 0,
      },
    },
  }),
});

module.exports = Tarifa;
