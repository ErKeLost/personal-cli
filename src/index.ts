import process from 'node:process'
import nodePath from 'node:path'
import { defineCommand, runMain, showUsage } from 'citty'
import { start, build, preview, clean } from '@farmfe/core'

import {
  version,
  description,
} from '../package.json' assert { type: 'json' }

const main = defineCommand({
  meta: {
    name: 'rolldown',
    version,
    description,
  },
  args: {
    config: {
      type: 'string',
      alias: 'c',
      description:
        'Use this config file (if argument is used but value is unspecified, defaults to rolldown.config.js)',
    },
    help: {
      type: 'boolean',
      alias: 'h',
      description: 'Show this help message',
    },
  },
  async run(ctx) {
    if (ctx.args.help) {
      await showUsage(ctx.cmd)
      return
    }

    const { configPath } = parseArgs(ctx.args)

    const config = await loadConfig(configPath)

    if (!config) {
      consola.error(`No configuration found at ${configPath}`)
      process.exit(1)
    }

    await bundle(config)
  },
  setup() {
    console.log("Setup");
  },
  cleanup() {
    console.log("Cleanup");
  },
  subCommands: {
    start: () => import("./commands/start").then((r) => r.default),
    build: () => import("./commands/build").then((r) => r.default),
    preview: () => import("./commands/preview").then((r) => r.default),
    clean: () => import("./commands/clean").then((r) => r.default),
  },
});

runMain(main);