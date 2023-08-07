import { Page } from "puppeteer";
import { WAKE_UP_WORDS } from "@/config";
import { getSession } from "@/session";
import logger from "@/utils/logger";
import { answerUser } from "@/pptr/answerUser";

interface ICommentData {
    user: string;
    content: string;
}

// 获取直播间评论信息
export const getLiveComment = async (page: Page) => {
    const commentList = await page.waitForSelector(".webcast-chatroom___items > div:nth-child(1)");
    if (!commentList) return;

    const session = getSession();

    // 注入函数
    // 监听直播间评论回调
    await page.exposeFunction("comment", async (commentData: ICommentData) => {
        const {user, content} = commentData;
        logger.info(user, content);
        let isWakeUp = false;
        let ask = "";

        if (WAKE_UP_WORDS.length) {
            // 识别唤醒词
            for (const word of WAKE_UP_WORDS) {
                if (content.startsWith(word)) {
                    logger.info("唤醒词：", word, user);
                    isWakeUp = true;
                    ask = content.replace(word, "");
                    break;
                }
            }
        } else if (WAKE_UP_WORDS.length === 0) {
            logger.info("无唤醒词，直接回复");
            ask = content;
            isWakeUp = true;
        }

        if (!isWakeUp) return;

        // AI接口调用
        const answer = await session.ask(user, ask);
        let answerStr = `@${user} ${answer}`.slice(0, 50);
        logger.info("[Bot]", answerStr);
        await answerUser(page, answerStr);
    });

    // 监听直播间评论
    await page.evaluate((el) => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutationRecord of mutationsList) {
                if (mutationRecord.type === "childList") {
                    for (const node of mutationRecord.addedNodes) {
                        if (node.childNodes.length === 0) continue;

                        const parent = node.childNodes[0];
                        if (parent.childNodes.length < 3) continue;

                        const user = parent.childNodes[1].textContent;
                        if (!user) continue;

                        const content = parent.childNodes[2].childNodes[0].textContent;
                        if (!content) continue;

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