const express = require('express');
const { handleUnexpectedError } = require('./src/middlewares/handleUnexpectedError');
require('dotenv').config();
const app = express();
const port = 3000;

require('./src/config/dbConnection');

app.use(express.json());

app.use('/api', require('./src/routes/auth/register'));
app.use('/api', require('./src/routes/auth/login'));
app.use('/api', require('./src/routes/categories/category'));
app.use('/api', require('./src/routes/products/product'));
app.use('/api', require('./src/routes/carts/cart'));
app.use('/api', require('./src/routes/orders/order'));
app.use('/api', require('./src/routes/orders/salesReport'));

app.use(handleUnexpectedError);

app.listen(port, () => {
    console.log(`E-comm running on http://localhost:${port}/`);
});


