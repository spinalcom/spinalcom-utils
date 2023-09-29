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

import { resolve } from 'path';
import { mkdirp } from 'mkdirp';
import { readAndEditPackageJson } from '../../utils/readAndEditPackageJson';
import { getRepositoryName } from '../../utils/getRepositoryName';
import type { IGitRepo } from '../../interfaces/IGitRepo';
import type {
  IDependencies,
  IPackageJson,
} from '../../interfaces/IPackageJson';
import cliProgress = require('cli-progress');
import { consumeBatch } from '../../utils/consumeBatch';
import { CloneEditAndStore } from './CloneEditAndStore';
import { rm } from 'fs/promises';
import type { IConflit } from '../../interfaces/IConflit';
import { hasSeenRepo, EHasSeenRepo } from './hasSeenRepo';
import { pushInConfitMap } from './pushInConfitMap';
import { randomUUID } from 'crypto';

export async function cloneAndPackAll(
  packageToInstall: string[],
  cacheDirPath: string,
  mainPackageJsonPath: string,
  resolvedConfit: IConflit,
  isDryRun: boolean
) {
  const conflitMap = new Map<string, IGitRepo[]>();
  const seen = new Set<IGitRepo>();
  await mkdirp(cacheDirPath);
  const tmpDir = resolve(cacheDirPath, randomUUID());
  const tarOutputDir = resolve(tmpDir, 'repositories');
  let packageJson: IPackageJson;
  if (packageToInstall.length <= 0) {
    packageJson = await readAndEditPackageJson(mainPackageJsonPath, !isDryRun);
  } else {
    packageJson = {
      name: 'cli',
      version: '',
      spinalDependencies: {},
    };
    for (let index = 0; index < packageToInstall.length; index++) {
      const name = packageToInstall[index];
      packageJson.spinalDependencies[`undefined-${index}`] = name;
    }
  }
  await rm(tmpDir, {
    force: true,
    recursive: true,
  });
  await mkdirp(tarOutputDir);
  await rm(resolve(tmpDir, 'tmp'), {
    force: true,
    recursive: true,
  });

  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: true,
      hideCursor: true,
      format: ' {bar} | {modulename} | {percentage}%',
    },
    cliProgress.Presets.shades_grey
  );
  let resPackageJsonDep: IDependencies = {};
  let currentGen: IPackageJson[] = [];
  let nextGen: IPackageJson[] = [packageJson];
  let bars: cliProgress.Bar[] = [];
  multibar.log('downloading...');
  while (nextGen.length) {
    currentGen = nextGen;
    nextGen = [];
    let toDo: IGitRepo[] = [];
    for (const currPackageJson of currentGen) {
      const spinalDependencies = currPackageJson.spinalDependencies;
      for (const key in spinalDependencies) {
        if (Object.prototype.hasOwnProperty.call(spinalDependencies, key)) {
          const element = spinalDependencies[key];
          const repo = getRepositoryName(
            key,
            element,
            currPackageJson.name,
            resolvedConfit
          );
          if (currPackageJson === packageJson) {
            resPackageJsonDep[repo.moduleName] =
              repo.gitname + (repo.commit ? `@${repo.commit}` : '');
          }
          const s = hasSeenRepo(seen, repo);
          if (s === EHasSeenRepo.FOUND) continue;
          else if (s === EHasSeenRepo.NOT_FOUND) {
            seen.add(repo);
            toDo.push(repo);
          } else {
            pushInConfitMap(conflitMap, repo, s);
          }
        }
      }
    }
    const promises = toDo.map((repo) => {
      return () =>
        CloneEditAndStore(tmpDir, repo, tarOutputDir, multibar, bars);
    });
    try {
      const next = await consumeBatch(promises, 10, () => {
        for (const bar of bars) {
          multibar.remove(bar);
        }
        bars = [];
      });
      nextGen.push(...next);
    } catch (error) {
      console.error(error);
      await rm(tmpDir, {
        force: true,
        recursive: true,
      });
      process.exit(1);
    }
  }
  multibar.stop();
  await rm(resolve(tmpDir, 'tmp'), {
    force: true,
    recursive: true,
  });
  return { conflitMap, seen, tarOutputDir, dependancies: resPackageJsonDep };
}
