import { ITasks, runPuppeteer } from "@/pptr/run";
import { login } from "@/pptr/login";
import { getLiveComment } from "@/pptr/getLiveComment";


// 监听直播
export const listenLive = async (url: string) => {

    const task: ITasks[] = [
        {
            taskName: "开始登录",
            taskFn: login
        },
        {
            taskName: "获取直播间评论信息",
            url,
            taskFn: getLiveComment
        }
    ];

    await runPuppeteer(task, false);
};