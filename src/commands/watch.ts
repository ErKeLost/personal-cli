import { defineCommand } from "citty";
import { watch } from '@farmfe/core'
import { watchArgs as args } from "../args.js";
import { getConfigPath } from "../utils.js";

export default defineCommand({
  meta: {
    name: "watch",
    description: "Watch file change and recompile",
  },
  args,
  run({ args }) {
    const configPath = getConfigPath(args.config);
    const defaultOptions = {
      compilation: {
        output: {
          path: args?.outDir,
          targetEnv: args?.target,
          format: args?.format
        },
        input: {
          index: args?.input
        },
        sourcemap: args.sourcemap,
        minify: args.minify,
        treeShaking: args.treeShaking
      },
      mode: args.mode,
      configPath
    };
    watch(defaultOptions)
  },
});
