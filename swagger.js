const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API da Pizzaria',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'], // Altere o caminho se necessário
};

module.exports = swaggerOptions;