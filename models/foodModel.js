let mongoose = require('mongoose');
const { Schema } = mongoose;

  const foodSchema = new Schema({
    superMarkerName: String, // String is shorthand for {type: String}
    producDescription: String,
    availablePresentation:String,
    price: Number
  });

module.exports = mongoose.model('food', foodSchema)