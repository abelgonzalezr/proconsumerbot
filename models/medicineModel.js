let mongoose = require('mongoose');
const { Schema } = mongoose;

  const medicineSchema = new Schema({
    drugsstoreName:  String, // String is shorthand for {type: String}
    drugsstoreNumber: String,
    medicineName: String,
    concentration:String,
    maker:   String,
    availablePresentation:String,
    price:   String
  });

module.exports = mongoose.model('medicine', medicineSchema)