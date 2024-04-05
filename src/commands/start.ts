import { defineCommand } from "citty";
import { start } from '@farmfe/core'
import { startArgs as args } from "../args";

export default defineCommand({
  meta: {
    name: "start",
    description: "Compile the project in dev mode and serve it with dev server",
  },
  args,
  run(options) {
    console.log(options);
    start({})
  },
});
