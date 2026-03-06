const express = require("express");
const app = express();

const serviceRoutes = require("./routes/serviceRoutes");

app.use(express.json());

app.use("/api", serviceRoutes);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});