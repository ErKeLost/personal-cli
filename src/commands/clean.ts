import { defineCommand } from "citty";
import { clean } from "@farmfe/core";
import { cleanArgs as args } from "../args";

export default defineCommand({
  meta: {
    name: "clean",
    description: "Clean up the cache built incrementally",
  },
  args,
  run({ args }) {
    console.log("Build");
    console.log("Parsed args:", args);
    clean("", false)
  },
});
