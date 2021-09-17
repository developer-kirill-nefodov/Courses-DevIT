import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const modelSchema = new Schema({
    address: {type: String, required: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
});

const User = mongoose.model("User", modelSchema);

export default User;