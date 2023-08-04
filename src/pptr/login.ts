import fs from "fs";
import { Page } from "puppeteer";
import qrcode from "qrcode-terminal";
import logger from "@/utils/logger";
import { COOKIE_PATH } from "@/config";

// 登录
export const login = async (page: Page) => {
    if (fs.existsSync(COOKIE_PATH)) {
        const lastCookieString = fs.readFileSync(COOKIE_PATH);
        if (lastCookieString.length !== 0) {
            const cookies = JSON.parse(lastCookieString.toString());
            await page.setCookie(...cookies);
            logger.info("登录成功");
            return;
        }
    } else {
        fs.writeFileSync(COOKIE_PATH, "");
    }

    page.on("response", async (response) => {
        const url = response.url();
        if (url.includes("https://sso.douyin.com/get_qrcode") && response.request().method() === "GET") {
            const body = await response.json();
            const qrcodeUrl = body.data.qrcode_index_url;
            qrcode.generate(qrcodeUrl, {small: true}, function (qrcode) {
                console.log("请扫码登录(二维码过期时间为1分钟)");
                console.log(qrcode);
            });
        }
    });

    await page.goto("https://www.douyin.com/");

    // 登录二维码
    try {
        const loginCloseBtn = await page.waitForSelector(".dy-account-close", {
            timeout: 1000 * 3
        });
        if (loginCloseBtn) {
            await loginCloseBtn.click();
        }
    } catch (e) {
        logger.info("打开首页，没有发现登录弹窗,点击登录按钮");
    }
    const loginBtn = await page.$("#_7hLtYmO");
    await loginBtn?.click();


    // 等待页面刷新，登录成功
    // TODO:可能会跳 二次验证（滑块）
    await page.waitForNavigation({
        waitUntil: "load"
    });
    const isLogin = await page.$("#_7hLtYmO");
    if (!isLogin) {
        logger.info("登录成功");
    }

    try {
        const cookies = await page.cookies();
        const cookiesString = JSON.stringify(cookies);
        fs.writeFileSync(COOKIE_PATH, cookiesString);
    } catch (e) {
        logger.error("cookie写入失败:", e);
    }
};