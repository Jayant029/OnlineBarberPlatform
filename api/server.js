import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import bookRoute from "./routes/booking.route.js"; // Add the booking route
import serviceRoute from "./routes/service.route.js"; // Add the booking route
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/bookings",bookRoute); // Use the booking route
app.use("/api/services",serviceRoute); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({ error: errorMessage });
});

// If no route matches, return a 404 error
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
