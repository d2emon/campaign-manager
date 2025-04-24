import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { generateAccessToken, generateRefreshToken } from '../helpers/token.js';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Имя пользователя обязательно'],
    unique: true,
    trim: true,
    minlength: [6, 'Имя пользователя должно быть не короче 6 символов'],
    maxlength: [32, 'Имя пользователя должно быть не длиннее 32 символов'],
  },
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Некорректный email'],
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'Пароль слишком простой'],
    select: false,
    minlength: [6, 'Пароль должен быть не короче 6 символов'],
  },
  role: {
    type: String,
    enum: ['player', 'gm', 'admin'],
    default: 'player'
  },

  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  refreshTokens: [{
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  }],
  refreshTokens: [{
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  }],

  avatar: {
    type: String,
    default: 'https://i.imgur.com/3ZqjY7Q.png',
  },
  lastLogin: Date,
}, {
  timestamps: true,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.checkPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.addRefreshToken = async function (token) {
  this.refreshTokens.push({
    token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return this.save();
};

UserSchema.methods.generateTokens = async function (updateLastLogin=false) {
  const accessToken = generateAccessToken(this.id, this.role);
  const refreshToken = generateRefreshToken(this.id, this.role);
  if (updateLastLogin) {
    this.lastLogin = new Date();
  }
  await this.addRefreshToken(refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

UserSchema.statics.login = async function (username, password) {
  const user = await this
    .findOne({ username })
    .select('+password');
  if (!user) {
    return null;
  }

  const isCorrectPassword = await user.checkPassword(password);
  if (!isCorrectPassword) {
    return null;
  }

  this.lastLogin = Date.now();
  await this.save();

  return user;
};

export default mongoose.model('User', UserSchema);
