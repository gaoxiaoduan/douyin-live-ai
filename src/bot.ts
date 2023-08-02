import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import logger from "@/utils/logger";

let openAI: OpenAIApi;
export const initBot = () => {
    if (!openAI) {
        const config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        openAI = new OpenAIApi(config);
        return openAI;
    }
    return openAI;
};


export const createBot = async (messages: ChatCompletionRequestMessage[]) => {
    const openai = initBot();
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            presence_penalty: 0.3, // 话题新鲜度
            temperature: 0.5, // 随机性
            top_p: 0.9, // 核采样
            messages
        });
        const answer = completion.data.choices[0].message;

        return answer?.content;
    } catch (e: any) {
        logger.error("openAI Error:", e);
        if (e.toString().includes("Request failed with status code 429")) {
            return "请求过于频繁，请稍后再试";
        }
        return e?.toString();
    }
};