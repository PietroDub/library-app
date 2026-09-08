import "dotenv/config";

import express from "express";

import bookRoutes from "./Routes/books.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});