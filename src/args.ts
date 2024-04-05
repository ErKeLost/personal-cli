import { ArgsDef } from "citty"

export const args: ArgsDef = {
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
}

export const startArgs: ArgsDef = {
  lazy: {
    type: "boolean",
    description: "lazyCompilation",
    alias: "l",
  },
  host: {
    type: "string",
    description: "specify host",
  },
  port: {
    type: "string",
    description: "specify port",
  },
  open: {
    type: "boolean",
    description: "open browser after server started",
  },
  hmr: {
    type: "boolean",
    description: "enable hot module replacement",
  },
  cors: {
    type: "boolean",
    description: "enable cors",
  },
  strictPort: {
    type: "boolean",
    description: "specified port is already in use, exit with error",
  }
}

export const watchArgs: ArgsDef = {
  outDir: {
    type: 'string',
    alias: 'o',
    description: 'Output directory',
  },
  input: {
    type: 'string',
    alias: 'i',
    description: 'Input file',
  },
  target: {
    type: 'string',
    alias: 't',
    description: 'transpile targetEnv node, browser',
  },
  format: {
    type: 'string',
    alias: 'f',
    description: 'Output format esm, cjs',
  },
  minify: {
    type: 'boolean',
    description: 'code compression at build time',
  },
  sourcemap: {
    type: 'boolean',
    description: 'output source maps for build'
  },
  treeShaking: {
    type: 'boolean',
    description: 'Eliminate useless code without side effects',
  },
}

export const buildArgs: ArgsDef = {
  ...watchArgs,
  watch: {
    type: 'boolean',
    alias: 'w',
    description: 'Watch mode',
  },
}

export const previewArgs: ArgsDef = {
  port: {
    type: 'string',
    description: 'specify port',
  },
  open: {
    type: 'boolean',
    description: 'open browser after server preview started',
  },
}


export const cleanArgs: ArgsDef = {
  recursive: {
    type: 'boolean',
    alias: 'r',
    description: 'Recursively search for node_modules directories and clean them',
  }
}

export const createArgs: ArgsDef = {}