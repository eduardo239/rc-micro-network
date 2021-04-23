import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const privateMessageSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    friendId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PM = mongoose.model('PM', privateMessageSchema);
export default PM;
