import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },
    // firstName: {
    //   type: String,
    //   required: true,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    // userPicturePath: String,
    likes:
    {
      type: Array,
      default: []
    },
    // {
    //   types: Map,
    //   of: Boolean,
    // },
    comments:
      [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
          // default: []
        }
      ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;