import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import externals from "rollup-plugin-node-externals";
import { readFileSync } from "fs";
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
import { dirname } from "path";

export default defineConfig({
    input: "src/index.ts",
    output: {
        dir: dirname(pkg.module),
        format: "esm",
        preserveModules: true
    },
    plugins: [
        nodeResolve(),
        externals({
            devDeps: false
        }),
        typescript()
    ]
});
