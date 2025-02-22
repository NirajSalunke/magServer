import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import assistantRouter from './routes/assistantRoutes.js';
import inventoryRouter from './routes/inventoryManagerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/assistant",assistantRouter)
app.use("/api/inventory",inventoryRouter)

// Connect to MDB
connectDB();

app.get('/', (req, res) => {
  res.send("Heyy!");
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
