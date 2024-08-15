const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3001; // You can choose any port

app.use(bodyParser.json());

app.use(cors({
  origin: "*",
  methods: ['GET','POST']
}))

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
