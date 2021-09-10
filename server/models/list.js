const mongoose = require("mongoose");
//schema for database
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "input must be provided"],
    trim: true,
  },
});

module.exports = mongoose.model("list", listSchema);
