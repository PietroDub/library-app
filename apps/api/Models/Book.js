import mongoose from '../Db/Conn.js';

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 150,
  },

  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },

  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  status: {
    type: String,
    enum: ['available', 'borrowed', 'reserved'],
    default: 'available',
  },

  publishedYear: {
    type: Number,
    min: 0,
  },
}, {
  timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;