import mongoose, { SchemaTypes } from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  id: Number,
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  admin: Boolean,
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (isAuthenticated) {
      return user;
    } else {
      throw Error('Incorrect password');
    }
  } else {
    throw Error('Incorrect email');
  }
};

const User = mongoose.model('User', UserSchema);
export default User;