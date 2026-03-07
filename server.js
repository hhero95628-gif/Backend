const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use("/api", serviceRoutes);
app.use("/api", adminRoutes);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
