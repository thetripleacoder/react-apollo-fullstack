// const Post = require('./models/Post.model');
import Post from './models/Post.model'

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World';
    },
    getAllPosts: async () => {
      return await Post.find();
    },
    // if query parameter will not be used, can be -> (_parent: any, args: any, _context: any, _info: any)
    // args - can be destructured using only a specific property to be used
    getPost: async (parent: any, { id }: { id: string }, context: any, info: any) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent: any, args: any, context: any, info: any) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent: any, args: any, context: any, info: any) => {
      const { id }: { id: string } = args;
      await Post.findByIdAndDelete(id);
      return 'Ok, post deleted';
    },
    updatePost: async (parent: any, args: any, context: any, info: any) => {
      console.log(args);
      const { id }: { id: string } = args;
      const { title, description } = args.post;
      const updates: any = {};

      // IF conditions may be omitted as graphql operations can now handle any updatePost properties without defining undefined properties as null
      if (title !== undefined) {
        updates.title = title;
      }
      if (description !== undefined) {
        updates.description = description;
      }
      const post = await Post.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        {
          new: true,
        }
      );
      return post;
    },
  },
};

export default resolvers;
