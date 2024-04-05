import { defineCommand } from "citty";
import { clean } from "@farmfe/core";
import { cleanArgs as args } from "../args.js";

export default defineCommand({
  meta: {
    name: "clean",
    description: "Clean up the cache built incrementally",
  },
  args,
  run({ args }) {
    clean(process.cwd(), args?.recursive)
  },
});
