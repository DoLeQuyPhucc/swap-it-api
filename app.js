const { app, server } = require("./socketIO/server");
const cors = require("cors");
require("dotenv").config();

const express = require("express");
//app.use(cors());
app.use(cors({
  origin: '*', // Allow all origins. You can specify specific origins instead of '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
//const app = express();
const itemRouter = require("./api/Items/Items.router");
const authRouter = require("./api/Users/Users.router");
const messRouter = require("./api/Message/Messages.router");
const paymentRouter = require("./api/Payments/Payments.router");
const premiumRouter = require("./api/PremiumPackages/PremiumPackages.router");
const transactionRouter = require("./api/Transactions/Transactions.router");
const userPremiumPackages = require("./api/UserPremiumPackages/UserPremiumPackages.router");
const payOSrouter = require("./api/PayOS/PayOS.router");
const { swaggerUi, specs } = require("./config/swagger");
app.use(express.json());

app.use("/api/v1", itemRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", messRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", premiumRouter);
app.use("/api/v1", transactionRouter);
app.use("/api/v1", userPremiumPackages);
app.use("/api/v1", payOSrouter);
// http://localhost:3000/api-docs/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
server.listen(3001, () => {
  console.log("Server is running at PORT:", 3001);
});
