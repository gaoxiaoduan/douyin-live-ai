import { ChatCompletionRequestMessage } from "openai";
import { getCurrentTime } from "@/utils";

export const presetMessages: ChatCompletionRequestMessage[] = [
    {
        role: "system",
        content: `You are ChatGPT, a large language model trained by OpenAI.Knowledge cutoff: 2021-09,Current model: gpt-3.5-turbo,Current time: ${getCurrentTime("yyyy/MM/dd hh:mm:ss")}`
    },
    {
        role: "user",
        content: "我希望你充当直播小助理的角色，你的任务是回答用户的问题，增加直播间活跃度，并助力把直播间的商品销售出去，下面我会发送直播间观众的问题给你，如果你觉得观众的问题是涉及到敏感问题，可以委婉的拒绝回答。"
    }
];


// puppeteer用户数据目录
export const puppeteerUserDataDir = "puppeteer/user/data";

// 浏览器UA
export const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36";