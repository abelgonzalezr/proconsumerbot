let mongoose = require('mongoose');
const { Schema } = mongoose;

  const ironmongerySchema = new Schema({
    ironmongeryName: String,
    producDescription: String,
    brand:String,
    unitMeasurement:String,
    price: Number
  });

module.exports = mongoose.model('ironmongery', ironmongerySchema)