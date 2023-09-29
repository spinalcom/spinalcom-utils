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

import { readFile, writeFile } from 'fs/promises';
import type { IDependencies, IPackageJson } from '../interfaces/IPackageJson';
import { extractSpinalDependencies } from './extractSpinalDependencies';
import { addSpinalDependencies } from './addSpinalDependencies';
import { getJSONFilePath } from './getJSONFilePath';

export async function readAndEditPackageJson(
  packageJsonPath: string,
  doWriteFile: boolean = false,
  overwriteDependancies?: IDependencies
): Promise<IPackageJson> {
  packageJsonPath = getJSONFilePath(packageJsonPath, 'package.json', false);
  const file = await readFile(packageJsonPath, { encoding: 'utf-8' });
  const packageJson: IPackageJson = JSON.parse(file);
  const spinalModules = new Map<string, string>();
  extractSpinalDependencies(packageJson.dependencies, spinalModules);
  extractSpinalDependencies(packageJson.devDependencies, spinalModules);
  if (!packageJson.spinalDependencies) packageJson.spinalDependencies = {};
  addSpinalDependencies(packageJson.spinalDependencies, spinalModules);
  if (overwriteDependancies) {
    for (const key in overwriteDependancies) {
      if (Object.prototype.hasOwnProperty.call(overwriteDependancies, key)) {
        packageJson.spinalDependencies[key] = overwriteDependancies[key];
      }
    }
  }
  if (doWriteFile)
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  return {
    name: packageJson.name,
    version: packageJson.version,
    spinalDependencies: packageJson.spinalDependencies,
  };
}
