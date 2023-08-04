import { Page } from "puppeteer";

export const answerUser = async (page: Page, answer: string) => {
    const textarea = await page.waitForSelector(".webcast-chatroom___textarea");
    if (!textarea) return;

    await textarea.type(answer);
    await textarea.press("Enter");
};
