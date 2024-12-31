const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./models/user');
const { MongoClient, ObjectID } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017';
const PORT = 3004;

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/seagro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  phone: String,
});


const User = mongoose.model('User', userSchema);
const contentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);


//const Content = mongoose.model('Content', contentSchema);

// Signup Route
app.post('/signup', (req, res) => {
  UserModel.create(req.body)
    .then((user) => {
      console.log("User created:", user);
      res.status(201).json(user); // Return created user
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Failed to create user" });
    });
});

// Login Route
app.post('/login', (req, res) => {
  const { userName, userPassword } = req.body;
  UserModel.findOne({ userName: userName })
    .then(user => {
      if (user) {
        if (user.userPassword === userPassword) {
          res.json({ message: "Success", id: user._id }); // Return MongoDB's _id field
        } else {
          res.json("Password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
    });
});


// Fetch user data
app.get('/fetchUserData/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user data
app.put('/updateUserData', async (req, res) => {
  const { _id, userName, email, phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { userName, email, phone },
      { new: true, runValidators: true } // Return updated document
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/contents', async (req, res) => {
  try {
    const newContent = new Content({
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      image: req.body.image
    });
    await newContent.save();
    res.status(201).json({ success: true, content: newContent });
  } catch (error) {
    console.error('Error sharing content:', error);
    res.status(500).json({ success: false, message: 'Failed to share content', error: error.message });
  }
});

app.get('/api/contents', async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
    res.status(500).json({ message: 'Failed to fetch contents' });
  }
});

// Get user contents route
app.get('/api/contents/user/:userId', async (req, res) => {
  try {
    const contents = await Content.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    console.error('Error fetching user contents:', error);
    res.status(500).json({ message: 'Failed to fetch user contents' });
  }
});

// Edit content route
app.put('/api/contents/:id', async (req, res) => {
  try {
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: new Date() // Explicitly set updatedAt
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json({ content: updatedContent });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Delete content route
app.delete('/api/contents/:id', async (req, res) => {
  try {
    const contentId = req.params.id;
    const result = await Content.findByIdAndDelete(contentId);
    
    if (!result) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
