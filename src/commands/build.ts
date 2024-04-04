import { defineCommand } from "citty";
export default defineCommand({
  meta: {
    name: "build",
    description: "Build the project from current directory",
  },
  args: {
    prod: {
      type: "boolean",
      description: "production mode",
      alias: "p",
    },
    bundler: {
      type: "string",
      default: "rollup",
      description: "bundler name",
    },
    hmr: {
      type: "boolean",
      description: "disable hot module replacement",
      default: true,
    },
    workDir: {
      type: "string",
      description: "working directory",
      required: true,
    },
    entry: {
      type: "positional",
      description: "path to entrypoint",
    },
    dst: {
      type: "positional",
      required: false,
      description: "path to output directory",
      default: ".output",
    },
  },
  run({ args }) {
    console.log("Build");
    console.log("Parsed args:", args);
  },
});
