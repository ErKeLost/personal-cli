import path from "node:path";
import { execSync } from 'child_process';
import { fileURLToPath } from "node:url";
import fs from 'node:fs'

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

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  };
}

export function shouldUsePnpm(): boolean {
  try {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent && userAgent.startsWith('pnpm')) {
      return true;
    }
    execSync('pnpm --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

export function shouldUseYarn(): boolean {
  try {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent && userAgent.startsWith('yarn')) {
      return true;
    }
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}


export async function copyTemplate(targetDir: string, options: any) {
  const dest = path.join(process.cwd(), targetDir);
  const templatePath = path.join(
    fileURLToPath(import.meta.url),
    `../templates/${options.framework}`
  );
  copy(templatePath, dest);

  writePackageJson(dest, options);
}

function writePackageJson(dest: string, options: any) {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(dest, `package.json`), 'utf-8')
  );

  pkg.name = options.projectName;

  const currentPkgManager = getCurrentPkgManager(options);
  if (currentPkgManager === 'yarn') {
    pkg.scripts = pkg.scripts ?? {};
    pkg.scripts.postinstall = 'npx --yes peer-gear --install';
  }

  const packageJsonPath = path.join(dest, 'package.json');
  const { name, ...rest } = pkg;
  const sortedPackageJson = { name, ...rest };
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(sortedPackageJson, null, 2) + '\n'
  );
}

function getCurrentPkgManager(options: any) {
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  const currentPkgManager =
    (pkgInfo ? pkgManager : options.packageManager) ?? 'npm';
  return currentPkgManager;
}


function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    if (file === 'gitignore') {
      copy(srcFile, destFile);
      fs.renameSync(destFile, path.resolve(destDir, '.gitignore'));
    } else {
      copy(srcFile, destFile);
    }
  }
}

export function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}
