import fs from 'node:fs'
import { defineCommand, runMain, showUsage } from 'citty'
import { start, build, preview, clean } from '@farmfe/core'

const packageJsonFile = fs.readFileSync('./package.json', 'utf8');
const { version, description } = packageJsonFile as any;
const main = defineCommand({
  meta: {
    name: 'next-personal-cli',
    version,
    description,
  },
  args: {
    config: {
      type: 'string',
      alias: 'c',
      description:
        'Use this config file (if argument is used but value is unspecified, defaults to farm.config.ts)',
    },
    mode: {
      type: 'string',
      alias: 'm',
      description: 'Set env mode',
      default: 'development',
    },
    base: {
      type: 'string',
      description: 'Public base path',
    },
    clearScreen: {
      type: 'boolean',
      description: 'Allow/disable clear screen when logging',
      default: true,
    },
    help: {
      type: 'boolean',
      alias: 'h',
      description: 'Show this help message',
    },
  },
  async run(ctx) {
    console.log(ctx.args);
    
    if (ctx.args.help) {
      await showUsage(ctx.cmd)
      return
    }

    // const { configPath } = parseArgs(ctx.args)

    // const config = await loadConfig(configPath)

    // if (!config) {
    //   consola.error(`No configuration found at ${configPath}`)
    //   process.exit(1)
    // }

    // await bundle(config)
  },
  setup() {
    console.log("Setup");
  },
  cleanup() {
    console.log("Cleanup");
  },
  subCommands: {
    start: () => import("./commands/start.js").then((r) => r.default),
    build: () => import("./commands/build.js").then((r) => r.default),
    watch: () => import("./commands/watch.js").then((r) => r.default),
    preview: () => import("./commands/preview.js").then((r) => r.default),
    clean: () => import("./commands/clean.js").then((r) => r.default),
  },
});

runMain(main);