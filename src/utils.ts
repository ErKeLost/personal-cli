import path from "node:path";

export function getConfigPath(configPath: string) {
  return path.join(process.cwd(), configPath ?? '');
}

export function resolveCommandOptions(
  options: any
) {
  const resolveOptions = { ...options };
  filterDuplicateOptions(resolveOptions);
  return cleanOptions(resolveOptions);
}

export function filterDuplicateOptions<T>(options: T) {
  for (const [key, value] of Object.entries(options)) {
    if (Array.isArray(value)) {
      options[key as keyof T] = value[value.length - 1];
    }
  }
}

export function cleanOptions(options: any) {
  const resolveOptions = { ...options };

  delete resolveOptions['_'];
  delete resolveOptions.m;
  delete resolveOptions.c;
  delete resolveOptions.w;
  delete resolveOptions.l;
  delete resolveOptions.lazy;
  delete resolveOptions.mode;
  delete resolveOptions.base;
  delete resolveOptions.config;
  delete resolveOptions.clearScreen;

  return resolveOptions;
}