import { db } from "../firebase";
import { child, push, ref, set } from "firebase/database";
import { ChatMessage } from "../Models/ChatMessage";
import { User } from "../Models/User";

export function writeChat(chat: ChatMessage) {
    const newPostKey = push(child(ref(db), 'messages')).key;
    chat._id = newPostKey ?? ""
    set(ref(db, 'messages/' + chat._id), chat);
}

export function writeNewUser(user: User) {
    set(ref(db, 'users/' + user.UserId), user);
}