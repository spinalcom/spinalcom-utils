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
import { rm } from 'fs/promises';
import { randomUUID } from 'crypto';
import { simpleGit, SimpleGit, SimpleGitProgressEvent } from 'simple-git';
import type { IGitRepo } from '../../interfaces/IGitRepo';
import type { IPackageJson } from '../../interfaces/IPackageJson';
import cliProgress = require('cli-progress');
import { execNpmPack } from '../../utils/execNpmPack';

export async function CloneEditAndStore(
  cacheDir: string,
  repo: IGitRepo,
  tarOutputDir: string,
  multibar: cliProgress.MultiBar,
  bars: cliProgress.Bar[],
  addPostInstall: boolean
): Promise<IPackageJson> {
  const repoPath = resolve(cacheDir, 'tmp', randomUUID());
  const bar = multibar.create(110, 0, { modulename: repo.moduleName });
  bars.push(bar);
  await mkdirp(repoPath);
  const progress = ({ progress }: SimpleGitProgressEvent) => {
    bar.update(progress, { modulename: repo.moduleName });
  };

  const git: SimpleGit = simpleGit({ progress });
  if (repo.commit) {
    await git.raw(
      'clone',
      `https://github.com/${repo.gitowner}/${repo.gitname}.git`,
      '--branch',
      repo.commit,
      '--single-branch',
      repoPath
    );
  } else {
    await git.raw(
      'clone',
      `https://github.com/${repo.gitowner}/${repo.gitname}.git`,
      '--single-branch',
      repoPath
    );
  }
  bar.update(100);
  const modulePackageJson = await readAndEditPackageJson(
    repoPath,
    addPostInstall,
    true
  );
  bar.update(101, {
    modulename: `${repo.moduleName}@${modulePackageJson.version}`,
  });
  repo.version = modulePackageJson.version;
  await execNpmPack(repoPath, tarOutputDir);
  await rm(repoPath, {
    force: true,
    recursive: true,
  });
  bar.update(110);
  return modulePackageJson;
}
