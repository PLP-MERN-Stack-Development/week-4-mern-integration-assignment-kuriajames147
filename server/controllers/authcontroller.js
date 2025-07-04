import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, password });
  res.status(201).json({ _id: user._id, username: user.username, token: generateToken(user._id) });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await user.matchPassword(password)) {
    res.json({ _id: user._id, username: user.username, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
