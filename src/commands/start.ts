import { defineCommand } from "citty";
export default defineCommand({
  meta: {
    name: "start",
    description: "Compile the project in dev mode and serve it with dev server",
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
    },
    workDir: {
      type: "string",
      description: "working directory",
    },
    entry: {
      type: "positional",
      description: "path to entrypoint",
    },
    dst: {
      type: "positional",
      description: "path to output directory",
      default: ".output",
    },
  },
  run({ args }) {
    console.log("Build");
    console.log("Parsed args:", args);
  },
});
