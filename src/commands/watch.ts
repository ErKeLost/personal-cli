import { defineCommand } from "citty";
import { watch } from '@farmfe/core'
import { watchArgs as args } from "../args";

export default defineCommand({
  meta: {
    name: "watch",
    description: "Watch file change and recompile",
  },
  args,
  run({ args }) {
    console.log("Build");
    console.log("Parsed args:", args);
    watch({})
  },
});
