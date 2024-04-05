import { defineCommand } from "citty";
import { build } from '@farmfe/core'
import { buildArgs as args } from "../args";
export default defineCommand({
  meta: {
    name: "build",
    description: "Compile the project in production mode",
  },
  args,
  run({ args }) {
    console.log("Parsed args:", args);
    build({})
  },
});
