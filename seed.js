require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./src/models/Book');
const User = require('./src/models/User');
const Borrow = require('./src/models/Borrow');
const Return = require('./src/models/Return');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing users to avoid duplicate keys
    await User.deleteMany({});

    // Create sample books
    const books = [
      { name: 'Book 1', author: 'Author 1', genre: 'Fiction', type: 'Hardcover' },
      { name: 'Book 2', author: 'Author 2', genre: 'Non-fiction', type: 'Paperback' },
      { name: 'Book 3', author: 'Author 3', genre: 'Sci-fi', type: 'Ebook' },
      { name: 'Book 4', author: 'Author 4', genre: 'Fantasy', type: 'Hardcover' },
      { name: 'Book 5', author: 'Author 5', genre: 'Mystery', type: 'Paperback' }
    ];

    // Insert books into DB and get the inserted books
    const insertedBooks = await Book.insertMany(books);
    console.log('Books added to the database.');

    // Create sample users
    const users = [
      { name: 'User 1', username: 'user1', password: 'password1', email: 'user1@example.com', mobile: 1234567890, admin: false },
      { name: 'User 2', username: 'user2', password: 'password2', email: 'user2@example.com', mobile: 1234567891, admin: false },
      { name: 'User 3', username: 'user3', password: 'password3', email: 'user3@example.com', mobile: 1234567892, admin: true }
    ];

    // Insert users into DB
    await User.insertMany(users);
    console.log('Users added to the database.');

    // Borrow sample data (use the actual book IDs from the inserted books)
    const borrowRecords = [
      { username: 'user1', bookid: insertedBooks[0]._id }, // Book 1
      { username: 'user2', bookid: insertedBooks[1]._id }, // Book 2
      { username: 'user3', bookid: insertedBooks[2]._id }  // Book 3
    ];

    // Insert borrow records into DB
    await Borrow.insertMany(borrowRecords);
    console.log('Borrow records added to the database.');

    // Create return records with fines (use the actual book IDs from the inserted books)
    const returnRecords = [
      { username: 'user1', bookid: insertedBooks[0]._id, fine: 5 }, // Book 1
      { username: 'user2', bookid: insertedBooks[1]._id, fine: 10 } // Book 2
    ];

    // Insert return records into DB
    await Return.insertMany(returnRecords);
    console.log('Return records added to the database.');

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

  