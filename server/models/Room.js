import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})
const Room = mongoose.model('Room', RoomSchema);

export default Room;