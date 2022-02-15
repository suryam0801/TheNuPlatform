import { auth, db } from "../firebase";
import { child, push, ref, set, get } from "firebase/database";
import { ChatMessage } from "../Models/ChatMessage";
import { User } from "../Models/User";
import { CommentsClassifier, QuestionsClassifier } from "../ClassifierCalls/Classifiers";

export async function writeChat(chat: ChatMessage) {

    const questionClassifier = await QuestionsClassifier(chat.Message);

    if (questionClassifier === "Non-Question") {
        const commentClassifier = await CommentsClassifier(chat.Message);

        chat.Category = commentClassifier;
    } else {
        chat.Category = questionClassifier;
    }

    const newPostKey = push(child(ref(db), 'messages')).key;
    chat._id = newPostKey ?? ""
    set(ref(db, 'messages/' + chat._id), chat);
}