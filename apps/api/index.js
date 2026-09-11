import "dotenv/config";

import express from "express";

import bookRoutes from "./Routes/books.routes.js";
import userRoutes from "./Routes/user.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// rota de teste para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({
    message: "Library API is running",
  });
});