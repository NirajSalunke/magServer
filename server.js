import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MDB
connectDB();

app.get('/', (req, res) => {
  res.send("Heyy!");
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
