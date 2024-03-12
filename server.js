const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const technologiesRouter = require('./routes/technologies')
const chefRouter = require('./routes/chef');
const recetteRouter = require('./routes/recette');
const restaurantRouter = require('./routes/restaurant');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL_MONGOOSE, { });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
app.use('/technologies', technologiesRouter);
app.use('/chefs', chefRouter);
app.use('/recettes', recetteRouter);
app.use('/restaurants', restaurantRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
