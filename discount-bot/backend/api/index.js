const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const haggleRoutes = require('./routes/haggleRoutes');
const sendResponse = require('./utils/sendResponse');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/health', (req, res) => sendResponse(res, 200, { status: 'ok' }));
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/haggles', haggleRoutes);

app.use((req, res) => sendResponse(res, 404, { error: 'Route not found.' }));

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error(error);
  return sendResponse(res, 500, { error: 'Internal server error.' });
});

mongoose.connect(process.env.MONGODBURI)
  .then(() => {
    app.listen(port, () => console.log(`API running at http://localhost:${port}`));
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB.', error);
    process.exit(1);
  });
