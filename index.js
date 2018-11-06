require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const issueRoutes = require('./routes/issues');
const { ensureCorrectUser } = require('./middleware/ensureCorrectUser');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes go here.
app.use('/api/issues', ensureCorrectUser, issueRoutes);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(process.env.PORT, function() {
  console.log(`Server is starting on port ${process.env.PORT}`);
});
