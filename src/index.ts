import "dotenv/config";
import { getSession } from "@/session";
import { listenLive } from "@/pptr/listenLive";

const main = async () => {
    // gpt问答
    const session = getSession();
    await session.ask("xiaoduan", "你好，请问你们都有什么东西呀？");
    await session.ask("小明", "你好，请问今天是几号？");
    await session.ask("xiaoduan", "请问我的上一个问题是什么？");
    await session.ask("小明", "请问我的上一个问题是什么？");
    await session.ask("小明", "你叫什么名字？");
};

// main();


listenLive("https://live.douyin.com/440444506574");