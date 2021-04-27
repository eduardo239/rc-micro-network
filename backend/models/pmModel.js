import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const privateMessageSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    friendId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PM = mongoose.model('PM', privateMessageSchema);
export default PM;
