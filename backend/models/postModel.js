import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import mongoosastic from 'mongoosastic';

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      es_indexed: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(mongoosastic);

const Post = mongoose.model('Post', postSchema);
export default Post;
