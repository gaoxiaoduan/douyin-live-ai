# 抖音直播AI助手

> 自动回复直播间信息，保持直播间活跃度

## 开发计划

- [x] 调用OpenAI接口
- [x] 抓取直播间评论
- [x] 自动回复评论

## 使用方法

1. 安装依赖

```bash
pnpm install
```

2. 修改配置

设置OpenAI KEY， 创建`.env`文件，添加如下内容

```dotenv
OPENAI_API_KEY=(OpenAI KEY,如:sk-xxxx)
```

设置直播间地址

配置文件路径`src/config/index.ts`

```ts
export const DOUYIN_LIVE_URL = "https://live.douyin.com/xxxx";
```

3. 编译并运行

```bash
pnpm run build
pnpm run dev
```

## 注意事项

- 登录时的验证码会很大，可能需要全屏才能用手机扫描到
- 可能会存在扫码后跳二次验证的可能，目前需要手动验证