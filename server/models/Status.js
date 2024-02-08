const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Status', statusSchema);