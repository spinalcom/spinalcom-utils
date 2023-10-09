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

import { rm, writeFile } from 'fs/promises';
import { CONFLIT_FILE_NAME } from '../../constants';
import type { IConflit } from '../../interfaces/IConflit';
import { getJSONFilePath } from '../../utils/getJSONFilePath';
import { transformConfitToJSON } from './transformConfitToJSON';
import { getMissingEditResolvedModuleName } from './getMissingEditResolvedModuleName';
import { hasConflitNotResolved } from './hasConflitNotResolved';
import { getResolvedConflit } from './getResolvedConflit';
import { cloneAndPackAll } from './cloneAndPackAll';
import { resolve } from 'path';
import { execNpmInstall } from '../../utils/execNpmInstall';
import { readAndEditPackageJson } from '../../utils/readAndEditPackageJson';
export interface IInstallOpt {
  cache: string;
  path: string;
  dryRun: boolean;
  onlySpinalcom: boolean;
  save: boolean;
  addPostInstall: boolean;
}

export async function handleInstall(
  packageToInstall: string[],
  options: IInstallOpt
) {
  const timeStart = Date.now();
  const cacheDirPath: string = resolve(options.cache);
  const mainPackageJsonPath: string = options.path;
  const conflitFilePath = getJSONFilePath(
    mainPackageJsonPath,
    CONFLIT_FILE_NAME
  );
  const resolvedConfit = await getResolvedConflit(conflitFilePath);
  const missing: string[] = getMissingEditResolvedModuleName(resolvedConfit);
  if (missing.length > 0) {
    return console.error(
      `Parse Error set attribute 'forceCommit' for module ${missing.join(
        ','
      )} in ${conflitFilePath}`
    );
  }
  const { conflitMap, seen, tarOutputDir, dependancies } =
    await cloneAndPackAll(
      packageToInstall,
      cacheDirPath,
      mainPackageJsonPath,
      resolvedConfit,
      options.dryRun,
      options.addPostInstall
    );
  if (conflitMap) {
    const res: IConflit = transformConfitToJSON(resolvedConfit, conflitMap);
    if (hasConflitNotResolved(res)) {
      await writeFile(conflitFilePath, JSON.stringify(res, null, 2));
      console.error('Some conflit found, edit file %s', conflitFilePath);
      return;
    }
  }
  const packages = Array.from(seen);
  console.log('%d Spinalcom package found :', packages.length);
  packages.forEach((itm) => console.log(`  ${itm.moduleName}@${itm.version}`));
  if (options.dryRun === false) {
    const packageJsonPath = getJSONFilePath(
      mainPackageJsonPath,
      'package.json',
      false
    );
    if (options.onlySpinalcom === false) {
      console.log('Start installing main dependencies...');
      await execNpmInstall(packageJsonPath);
    }
    const pathPackageToInstall = packages.map((itm) => {
      const regRes =
        /^v?(?<Major>0|(?:[1-9]\d*))(?:\.(?<Minor>0|(?:[1-9]\d*))(?:\.(?<Patch>0|(?:[1-9]\d*)))?(?:\-(?<PreRelease>[0-9A-Z\.-]+))?(?:\+(?<Meta>[0-9A-Z\.-]+))?)?/i.exec(
          itm.version
        );
      const version = `${regRes.groups.Major}.${regRes.groups.Minor}.${regRes.groups.Patch}`;
      return resolve(tarOutputDir, `${itm.moduleName}-${version}.tgz`);
    });
    console.log('Start installing spinalcom dependencies...');
    await execNpmInstall(packageJsonPath, pathPackageToInstall);
    if (options.save) {
      await readAndEditPackageJson(
        mainPackageJsonPath,
        options.addPostInstall,
        true,
        dependancies
      );
    }
  }
  await rm(resolve(tarOutputDir, '..'), {
    force: true,
    recursive: true,
  });
  console.log('Install done in %d ms', Date.now() - timeStart);
}
