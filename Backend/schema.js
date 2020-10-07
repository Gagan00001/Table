var mongoose = require("mongoose");
var tableSchema = mongoose.Schema(
  {
    Email: { type: String },
    Name: { type: String },
    Age: { type: Number },
    Zipcode: { type: Number },
    contactInfo: {
      Mob: {
        type: Number,
      },
      Address: {
        type: String,
      },
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("tabledata", tableSchema);
