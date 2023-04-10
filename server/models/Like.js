import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema(
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
        }
    },
    { timestamps: true }
)

const Like = mongoose.model("Like", LikeSchema);

export default Like;


