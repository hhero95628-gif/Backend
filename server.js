const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());
const serviceRoutes = require("./routes/serviceRoutes");



app.use("/api", serviceRoutes);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});