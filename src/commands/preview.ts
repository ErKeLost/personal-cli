import { defineCommand } from "citty";
import { preview } from "@farmfe/core";
import { previewArgs as args } from "../args.js";
import { getConfigPath, resolveCommandOptions } from "../utils.js";

export default defineCommand({
  meta: {
    name: "preview",
    description: "Compile the project in watch mode with preview server",
  },
  args,
  run({ args }) {
    const configPath = getConfigPath(args.config);
    const resolveOptions = resolveCommandOptions(args);
    const defaultOptions = {
      mode: args.mode,
      server: resolveOptions,
      configPath,
      port: args.port
    };

    preview(defaultOptions)
  },
});
