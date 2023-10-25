const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { universityId, password } = req.body;

  try {
    const user = await User.findOne({ universityId });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid login credentials.' });
    }

    const token = jwt.sign({ universityId: user.universityId }, 'my-secret', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.register = async (req, res) => {
    const { universityId, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ universityId });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this university ID already exists.' });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      const newUser = new User({
        universityId,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      const token = jwt.sign({ universityId: newUser.universityId }, 'my-secret', {
        expiresIn: '1h',
      });
  
      res.status(201).json({ message: 'User registered successfully.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };