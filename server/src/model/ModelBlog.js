const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelBlog = new Schema({
  id: { type: Schema.Types.ObjectId, auto: true },
  img: { type: String, default: '' },
  title: { type: String, default: '', required: true },
  des: { type: String, default: 'This is the default' },
});

module.exports = mongoose.model('blog', ModelBlog);
