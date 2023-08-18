const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model('Token', TokenSchema);