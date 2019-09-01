const swaggerUi = require('swagger-ui-express');
const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');

const app = express();
const port = 3002;

const swaggerDocument = yaml.safeLoad(
  fs.readFileSync('./swaggerDocs.yml', 'utf8')
);
app.use('/', swaggerUi.serve);
app.get(
  '/',
  swaggerUi.setup({
    ...swaggerDocument,
    host: process.env.BASE_URL || "localhost:3000"
  })
);

app.listen(port, () =>
  console.log(`API documentation available on port ${port}`)
);
