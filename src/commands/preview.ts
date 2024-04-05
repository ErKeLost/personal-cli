import { defineCommand } from "citty";
import { preview } from "@farmfe/core";
import { previewArgs as args } from "../args";

export default defineCommand({
  meta: {
    name: "preview",
    description: "Compile the project in watch mode with preview server",
  },
  args,
  run({ args }) {
    console.log("Build");
    console.log("Parsed args:", args);
    preview({})
  },
});
