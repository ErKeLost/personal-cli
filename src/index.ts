import process from 'node:process'
import nodePath from 'node:path'
import { defineCommand, runMain, showUsage } from 'citty'
import { start, build, preview, clean } from '@farmfe/core'

import {
  version,
  description,
} from '../package.json' assert { type: 'json' }