import fs from 'node:fs'
import {  defineCommand, runMain, showUsage } from 'citty'
import { args } from './args'

const packageJsonFile = fs.readFileSync('./package.json', 'utf8');
const { version, description } = packageJsonFile as any;

const main = defineCommand({
  meta: {
    name: 'next-personal-cli',
    version,
    description,
  },
  args,
  async run(ctx) {
    if (ctx.args.help) {
      await showUsage(ctx.cmd)
      return
    }
  },
  subCommands: {
    start: () => import("./commands/start.js").then((r) => r.default),
    build: () => import("./commands/build.js").then((r) => r.default),
    watch: () => import("./commands/watch.js").then((r) => r.default),
    preview: () => import("./commands/preview.js").then((r) => r.default),
    clean: () => import("./commands/clean.js").then((r) => r.default),
    create: () => import("./commands/create.js").then((r) => r.default),
  },
});

runMain(main);

