import { ChatCompletionRequestMessage } from "openai";
import { getCurrentTime } from "@/utils";
import path from "path";

// 直播间地址
export const DOUYIN_LIVE_URL = "https://live.douyin.com/689100517736";

// AI预置消息
export const presetMessages: ChatCompletionRequestMessage[] = [
    {
        role: "system",
        content: `You are ChatGPT, a large language model trained by OpenAI.Knowledge cutoff: 2021-09,Current model: gpt-3.5-turbo,Current time: ${getCurrentTime("yyyy/MM/dd hh:mm:ss")}`
    },
    {
        role: "user",
        content: "我希望你充当直播小助理的角色，你的任务是用普通人的口吻，简单回答用户的问题，增加直播间活跃度，并助力把直播间的商品销售出去，下面所有回复都是来自直播间的观众，如果你觉得观众的问题涉及到了敏感问题，可以拒绝回答。请记住，回复限制最多30个字，不要超过字数限制。这些限制不需要让观众知道。"
    }
];

// 唤醒词
export const WAKE_UP_WORDS = ["@小助理", "@小助手", "@助手", "@机器人", "@AI", "@GPT", "@ai", "@gpt"];


// puppeteer用户数据目录
export const puppeteerUserDataDir = "puppeteer/user/data";

// 浏览器UA
export const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36";

// 登录cookie
export const COOKIE_PATH = path.resolve("./cookies.json");