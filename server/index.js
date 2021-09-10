//server/index.js

// const express = require("express");
// const PORT = process.env.PORT || 3001;

// const app = express();

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from Server" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/MernListProject";
const PORT = process.env.PORT || 3001;
const app = express();
const list = require("./routes/lists");
const notFound = require("./middleware/not-found");
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Connected to the MongoDB");
});

//middleware
app.use(express.json());

//routes
app.use("/api/v1/list", list);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
