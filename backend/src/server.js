import express from "express";

// Rotas
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
