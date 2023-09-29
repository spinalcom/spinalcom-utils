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

import { IGitRepo } from '../../interfaces/IGitRepo';
import { EDIT_ME_STRING } from '../../constants';
import type {
  IConflit,
  IConflitModule,
  IFoundItems,
} from '../../interfaces/IConflit';

export function transformConfitToJSON(
  resolvedConfit: IConflit,
  conflitMap: Map<string, IGitRepo[]>
): IConflit {
  const res: IConflit = resolvedConfit;
  for (const [key, arr] of conflitMap) {
    let module: IConflitModule = res[key];
    if (!module) {
      res[key] = module = { forceCommit: EDIT_ME_STRING, found: {} };
    }
    if (module.forceCommit !== EDIT_ME_STRING) continue;
    const foundItems: IFoundItems = module.found;
    for (const item of arr) {
      const itemCommit = item.commit ?? '';
      let foundItem = foundItems[itemCommit];
      if (!foundItem) {
        foundItem = foundItems[itemCommit] = [item.from];
      } else if (!foundItem.includes(item.from)) foundItem.push(item.from);
    }
  }
  return res;
}
