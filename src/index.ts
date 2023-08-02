import "dotenv/config";
import { getSession } from "@/session";

const main = async () => {
    const session = getSession();
    await session.ask("xiaoduan", "你好，请问你们都有什么东西呀？");
    await session.ask("小明", "你好，请问今天是几号？");
    await session.ask("xiaoduan", "请问我的上一个问题是什么？");
    await session.ask("小明", "请问我的上一个问题是什么？");
    await session.ask("小明", "你叫什么名字？");
};

main();