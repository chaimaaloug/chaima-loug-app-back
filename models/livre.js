
//1-recuperer mongoose 
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var formatDate = function () {
  return DateTime.fromJSDate(this.releaseDate).toISODate();
};

var livreSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  bookTitle: { type: String, required: true },
  bookPublisher: { type: String, required: true },
  bookType: { type: String, required: true, enum: ["Manga", "Biography", "Science Fiction", "Personal Development", "Self Help"] },
  releaseDate: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
});

livreSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// 
livreSchema.virtual("id").get(function () {
  return this._id;
});


module.exports = mongoose.model("livres", livreSchema); 