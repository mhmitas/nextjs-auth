import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            type: String,
            default: '/default-avatar.jpg'
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type: String
        },
    },
    { timestamps: true }
);

// Compile the model from the schema
export const User = mongoose.models.User || mongoose.model('User', userSchema);
