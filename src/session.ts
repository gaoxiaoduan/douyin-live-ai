import { ChatCompletionRequestMessage } from "openai";
import { presetMessages } from "@/config";
import { createBot } from "@/bot";
import logger from "@/utils/logger";

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
        // 没有回答
        if (!answer) return "我好像迷失在了无尽的宇宙中...";

        this.set(user, answer!, "assistant");

        // TODO:@用户并回复
        logger.warn(`[Bot answer ${user}]`, answer);
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