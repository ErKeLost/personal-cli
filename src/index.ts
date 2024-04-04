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
    name: "citty",
    version: "1.0.0",
    description: "Citty playground CLI",
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