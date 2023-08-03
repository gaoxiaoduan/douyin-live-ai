export * from "./logger";

export const getCurrentTime = (format = "yyyy-MM-dd hh:mm:ss"): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return format
        .replace("yyyy", String(year))
        .replace("MM", month)
        .replace("dd", day)
        .replace("hh", hours)
        .replace("mm", minutes)
        .replace("ss", seconds);
};


/**
 * 按照任务传递的顺序逐一执行每个任务
 * @param tasks
 */
export const execTasks = async (tasks: Array<() => Promise<any>>) => {
    for (const task of tasks) {
        await task();
    }
};

// 休眠函数
export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};