import { ITasks, runPuppeteer } from "@/pptr/run";
import { Page } from "puppeteer";

interface ICommentData {
    user: string;
    content: string;
}

// 监听直播
export const listenLive = async (url: string) => {

    const getLiveComment = async (page: Page) => {
        const commentList = await page.waitForSelector(".webcast-chatroom___items > div:nth-child(1)");
        if (!commentList) return;

        // 注入函数
        // 监听直播间评论回调
        await page.exposeFunction("comment", (commentData: ICommentData) => {
            // TODO:识别唤醒词，进行AI接口调用
            console.log(commentData.user, commentData.content);
        });

        // 监听直播间评论
        await page.evaluate((el) => {
            const observer = new MutationObserver((mutationsList) => {
                for (const mutationRecord of mutationsList) {
                    if (mutationRecord.type === "childList") {
                        for (const node of mutationRecord.addedNodes) {
                            // console.log("node:", node);
                            if (node.childNodes.length === 0) continue;

                            const parent = node.childNodes[0];
                            if (parent.childNodes.length < 3) continue;

                            const user = parent.childNodes[1].textContent;
                            if (!user) continue;

                            const content = parent.childNodes[2].childNodes[0].textContent;
                            if (!content) continue;
                            // console.log(`[${user}]${content}`);
                            const commentData: ICommentData = {
                                user,
                                content,
                            };
                            // @ts-ignore
                            window.comment(commentData);
                        }
                    }
                }
            });

            observer.observe(el!, {
                childList: true
            });
        }, commentList);

    };

    const task: ITasks[] = [{
        taskName: "获取直播间评论信息",
        url,
        taskFn: getLiveComment
    }];

    await runPuppeteer(task, false);
};