import { Schema, model } from "mongoose";
const userSchema = new Schema({
    fullname: { type: String, required: true, trim: true, minlength: 2 },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phoneNumber: { type: String, unique: true, sparse: true },
    password: { type: String, required: true, select: false },
    dateOfBirth: { type: Date, required: true },
    gender: { type: Number, enum: [0, 1, 2], default: 2 },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
// Indexing for performance
// userSchema.index({ userId: 1 });
export const UserModel = model("User", userSchema);
//# sourceMappingURL=user.model.js.map