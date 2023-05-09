import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  user_id: {
      type: String,
      required: true
  },
  text: {
      type: String,
      required: true
  },
  room_id: {
      type: String,
      required: true
  },
  alert: Boolean
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema);
export default Message;