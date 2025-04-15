import mongoose from 'mongoose';

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
    select: false,
    minlength: [6, 'Пароль должен быть не короче 6 символов'],
  },
});

export default mongoose.model('User', UserSchema);
