import mongoose from "mongoose";
import User from './model.js';

export function setUpConnection() {
    mongoose.connect(`mongodb://${process.env.DB_CONNECTION_STRING}`);
}

export function userList() {
    return User.find();
}

export function creatUser(data) {
    const user = new User(data);

    return user.save();
}

export function updateUser(id, data) {
    const hero = User.findById(id);

    return hero.update(data);
}

export function deleteUser(id) {
    return User.deleteOne({
        _id: id
    });
}