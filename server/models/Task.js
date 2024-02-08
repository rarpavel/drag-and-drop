const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: false,
  },
  status: {type: mongoose.Types.ObjectId, ref: "Status"},
  _id: {
    type: mongoose.Types.ObjectId,
  }
});

module.exports = mongoose.model('Task', taskSchema);