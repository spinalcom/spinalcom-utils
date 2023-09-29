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

import {
  DEFAULT_GITOWNER,
  EXCEPTION_MODULES,
  PARSE_REG_REPOSITORY,
} from '../constants';
import type { IConflit } from '../interfaces/IConflit';
import type { IGitRepo } from '../interfaces/IGitRepo';

export function getRepositoryName(
  moduleName: string,
  repositoryURI: string,
  from: string,
  resolvedConfit: IConflit
): IGitRepo {
  const res = PARSE_REG_REPOSITORY.exec(repositoryURI);
  if (res?.groups?.gitname) {
    let commit = resolvedConfit[moduleName]?.forceCommit || res.groups.commit;
    return {
      moduleName,
      gitname: res.groups.gitname,
      gitowner: res.groups.owner,
      commit,
      from,
    };
  }
  let [module, _commit] = repositoryURI.split(/@|#/);
  if (module.endsWith('.git')) module = module.replace(/\.git$/, '');
  let gitName = module;
  for (const ExecpMname in EXCEPTION_MODULES) {
    if (Object.prototype.hasOwnProperty.call(EXCEPTION_MODULES, ExecpMname)) {
      if (ExecpMname === module) gitName = EXCEPTION_MODULES[ExecpMname];
    }
  }

  return {
    moduleName: !moduleName.startsWith('undefined-') ? moduleName : module,
    gitname: gitName,
    gitowner: DEFAULT_GITOWNER,
    commit: _commit,
    from,
  };
}
