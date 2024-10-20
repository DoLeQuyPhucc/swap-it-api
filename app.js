require('dotenv').config();

const express = require('express');
const app = express();
const itemRouter = require('./api/Items/Items.router');
const authRouter = require('./api/Users/Users.router');
const messRouter = require('./api/Message/Messages.router');
const paymentRouter = require('./api/Payments/Payments.router');
const premiumRouter = require('./api/PremiumPackages/PremiumPackages.router');
const transactionRouter = require('./api/Transactions/Transactions.router');
const userPremiumPackages   = require('./api/UserPremiumPackages/UserPremiumPackages.router');
const { swaggerUi, specs } = require('./config/swagger');
app.use(express.json());

app.use('/api/v1', itemRouter);
app.use('/api/v1', authRouter);
//app.use('/api/v1', messRouter);
app.use('/api/v1', paymentRouter);
app.use('/api/v1', premiumRouter);
app.use('/api/v1', transactionRouter);
app.use('/api/v1', userPremiumPackages);
// http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(3000, () => {
  console.log('Server is running at PORT:', 3000);
});