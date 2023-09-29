/*
 * Copyright 2023 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import { program } from 'commander';
import { DEFAULT_CACHE_DIR } from './constants';
import { handleInstall } from './cmds/handleInstall/handleInstall';
import { rm } from 'fs/promises';

function main() {
  program
    .name('spinalcom-utils')
    .description('CLI for some Spinalcom utilities')
    .version('1.0.0');

  program
    .command('clear')
    .description('clear the cache folder')
    .action(() => {
      rm(DEFAULT_CACHE_DIR, {
        force: true,
        recursive: true,
      });
    });

  program
    .command('install [module_names...]')
    .description('install spinalcom dependencies')
    .option('--dry-run', 'Will do everything but stop at install', false)
    .option('--only-spinalcom', 'Install only spinalcom dependencies', false)
    .option('-s, --save', 'Save to package.json', true)
    .option(
      '-p, --path <path>',
      'Path to folder containing package.json or the file itself',
      '.'
    )
    .option('-c, --cache <path>', 'path to cache directory', DEFAULT_CACHE_DIR)
    .action(handleInstall);

  program.parse();
}

main();
