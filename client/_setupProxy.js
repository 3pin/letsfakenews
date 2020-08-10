const cors = require('cors');

const url = 'http://localhost:3000';
// const url = 'https://letsfakenews.herokuapp.com';

const corsOptions = {
  origin: url,
  optionsSuccessStatus: 200,
};

module.exports = (app) => {
  app.use(cors(corsOptions));
};
