import { defineCommand } from "citty";
import { start } from '@farmfe/core'
import { startArgs as args } from "../args.js";
import { getConfigPath, resolveCommandOptions } from "../utils.js";

export default defineCommand({
  meta: {
    name: "start",
    description: "Compile the project in dev mode and serve it with dev server",
  },
  args,
  run({args}) {
    const resolveOptions = resolveCommandOptions(args);
    const configPath = getConfigPath(args.config as string);

    const defaultOptions: any = {
      compilation: {
        lazyCompilation: args.lazy
      },
      server: resolveOptions,
      clearScreen: args.clearScreen,
      configPath,
      mode: args.mode
    };
    
    start(defaultOptions as any)
  },
});
