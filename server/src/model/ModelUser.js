const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelUser = new Schema({
  email: { type: String, require },
  username: { type: String, require },
  password: { type: String, require },
  fullname: { type: String, require },
  avatar: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false },
  phone: { type: Number, default: 0 },
});

module.exports = mongoose.model('user', ModelUser);
