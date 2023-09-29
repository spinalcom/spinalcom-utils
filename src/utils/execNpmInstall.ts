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

import { spawn } from 'child_process';
import { resolve as path_resolve } from 'path';

export async function execNpmInstall(
  packageJsonPath: string,
  pathToModulesToInstall?: string[]
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const dir = path_resolve(packageJsonPath, '..');
    const params = ['i'];
    if (pathToModulesToInstall) {
      params.push(
        '--save=false',
        '--package-lock=false',
        ...pathToModulesToInstall
      );
    }
    const childProcess = spawn('npm', params, { cwd: dir });
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('exit', function (code) {
      if (code === 0) return resolve();
      return reject();
    });
  });
}
