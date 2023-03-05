const Post = require('./models/Post.model');

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World';
    },
    getAllPosts: async () => {
      return await Post.find();
    },
    // if query parameter will not be used, can be -> (_parent, args, _context, _info)
    // args - can be destructured using only a specific property to be used
    getPost: async (parent, { id }, context, info) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return 'Ok, post deleted';
    },
    updatePost: async (parent, args, context, info) => {
      console.log(args);
      const { id } = args;
      const { title, description } = args.post;
      const updates = {};

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

module.exports = resolvers;
