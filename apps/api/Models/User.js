import mongoose from "../Db/Conn.js";

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}
);

const User = mongoose.model("User", userSchema);
export default User;