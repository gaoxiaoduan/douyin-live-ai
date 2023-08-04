import "dotenv/config";
import { listenLive } from "@/pptr/listenLive";
import { DOUYIN_LIVE_URL } from "@/config";

listenLive(DOUYIN_LIVE_URL);