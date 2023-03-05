import mongoose from "mongoose";
// const PostSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     require: true,
//   },
//   description: {
//     type: String,
//   },
// });

// const Post = mongoose.model('post', PostSchema);
// module.exports = Post;


export interface IPost extends mongoose.Document {
  title: string;
  description: string;
};

export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;