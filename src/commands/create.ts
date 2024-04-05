import { defineCommand } from "citty";
import fs from 'node:fs'
import prompts from 'prompts';
import colors from 'picocolors';
import { startArgs as args } from "../args.js";
import { copyTemplate, formatTargetDir, getConfigPath, isEmpty, pkgFromUserAgent, resolveCommandOptions, shouldUsePnpm, shouldUseYarn } from "../utils.js";

export default defineCommand({
  meta: {
    name: "create template",
    description: "create a new project from a template with farm",
  },
  args,
  run({ args }) {

  },
});

interface IResultType {
  packageName?: string;
  projectName?: string;
  framework?: string;
  argFrameWork?: string;
  autoInstall?: boolean;
  packageManager?: string;
}


async function createFarm(args: any) {
  const cwd = process.cwd();
  const isYarnInstalled = shouldUseYarn();
  const isPnpmInstalled = shouldUsePnpm();
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const DEFAULT_TARGET_NAME = 'farm-project';
  const argProjectName = formatTargetDir(args._[0]);
  const argFramework = args.template || args.t;
  let targetDir = argProjectName || DEFAULT_TARGET_NAME;
  let result: IResultType = {};
  const skipInstall = args['skip-install'] ?? args.skipInstall ?? true;
  try {
    result = await prompts(
      [
        {
          type: argProjectName ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: DEFAULT_TARGET_NAME,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || DEFAULT_TARGET_NAME;
          }
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? '🚨 Current directory'
              : `🚨 Target directory "${targetDir}"`) +
            ` is not empty. Overwrite existing files and continue?`
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(colors.red('❌') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker'
        },
        {
          type: argFramework ? null : 'select',
          name: 'framework',
          message: 'Select a framework:',
          initial: 0,
          choices: [
            {
              title: colors.cyan('React'),
              value: 'react'
            },
            { title: colors.green('Vue'), value: 'vue' },
          ]
        },
        {
          type: pkgInfo || skipInstall ? null : 'select',
          name: 'packageManager',
          message: 'Which package manager do you want to use?',
          choices: [
            { title: 'npm', value: 'npm' },
            {
              title: isYarnInstalled ? 'Yarn' : 'Yarn (not installed)',
              value: 'yarn',
              disabled: !isYarnInstalled
            },
            {
              title: isPnpmInstalled ? 'Pnpm' : 'Pnpm (not installed)',
              value: 'pnpm',
              disabled: !isPnpmInstalled
            }
          ]
        }
      ],
      {
        onCancel: () => {
          throw new Error(colors.red('❌') + ' Operation cancelled');
        }
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }
  const { framework = argFramework, packageManager } = result;

  await copyTemplate(targetDir, {
    framework,
    projectName: targetDir,
    packageManager
  });
}