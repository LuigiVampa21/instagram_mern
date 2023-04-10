import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        content: {
            type: String,
            required: [true, "Missing content"],
            minLength: 2,
            maxLength: 200,
        }
    },
    { timestamps: true }
)

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;


