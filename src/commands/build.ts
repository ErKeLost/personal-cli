import { defineCommand } from "citty";
import { build } from '@farmfe/core'
import { buildArgs as args } from "../args.js";
import { getConfigPath } from "../utils.js";
export default defineCommand({
  meta: {
    name: "build",
    description: "Compile the project in production mode",
  },
  args,
  run({ args }) {
    const configPath = getConfigPath(args.config);
    
    const defaultOptions = {
      compilation: {
        watch: args.watch,
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
    build(defaultOptions)
  },
});
