import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const friendSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    friendId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model('Friend', friendSchema);
export default Friend;
