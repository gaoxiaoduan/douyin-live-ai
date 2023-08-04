import { ChatCompletionRequestMessage } from "openai";
import { presetMessages } from "@/config";
import { createBot } from "@/bot";

type role = "user" | "assistant" | "system";
const addMessage = (message: string, role: role): ChatCompletionRequestMessage => ({
    role,
    content: message
});

interface ISessionMap {
    [key: string]: ChatCompletionRequestMessage[];
}

class Session {
    map: ISessionMap = {};

    get(user: string) {
        return this.map[user];
    }

    // 根据用户设置消息
    set(user: string, message: string, role: role) {
        if (!this.map[user]) {
            this.map[user] = [...presetMessages];
        }
        this.map[user].push(addMessage(message, role));
        return this.map[user];
    }

    // 问
    async ask(user: string, message: string) {
        const messages = this.set(user, message, "user");
        const answer = await createBot(messages);
        this.set(user, answer, "assistant");
        return answer;
    }
}

let session: Session;
export const getSession = () => {
    if (!session) {
        session = new Session();
        return session;
    }
    return session;
};