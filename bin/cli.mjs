#!/usr/bin/env node
import '../dist/index.js'

preventExperimentalWarning();

function preventExperimentalWarning() {
  const defaultEmit = process.emit;
  process.emit = function (...args) {
    if (args[1].name === 'ExperimentalWarning') {
      return undefined;
    }
    return defaultEmit.call(this, ...args);
  };
}
