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

export const DEFAULT_CACHE_DIR = '/tmp/spinal-utils';
export const PARSE_REG_REPOSITORY =
  /(((https|ssh):\/\/github\.com\/)|(git@github\.com:)|(github:))(?<owner>[\w\d]+)\/(?<gitname>[\w\-_\d]+)(.git)?(#(?<commit>.+))?/i;
export const CONFLIT_FILE_NAME = 'spinalconflit.json';
export const EDIT_ME_STRING = 'EDIT_ME';
export const DEFAULT_GITOWNER = 'spinalcom';
export const EXCEPTION_MODULES: { [moduleName: string]: string } = {
  'spinal-env-viewer-graph-service': 'Spinal-Graph-Service',
  'spinal-spatial-referential': 'spinal-spatial-referential-service',
};
