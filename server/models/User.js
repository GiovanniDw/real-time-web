import mongoose, { SchemaTypes } from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';


const UserSchema = new Schema({
  id: Number,
  name: String,
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: String,
  admin: Boolean,
  currentClass: String,
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
export default User;