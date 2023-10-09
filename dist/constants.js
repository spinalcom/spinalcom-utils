"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCEPTION_MODULES = exports.DEFAULT_GITOWNER = exports.EDIT_ME_STRING = exports.CONFLIT_FILE_NAME = exports.PARSE_REG_REPOSITORY = exports.DEFAULT_CACHE_DIR = void 0;
exports.DEFAULT_CACHE_DIR = '/tmp/spinal-utils';
exports.PARSE_REG_REPOSITORY = /(((https|ssh):\/\/github\.com\/)|(git@github\.com(:|\/))|(github:))(?<owner>[\w\d]+)\/(?<gitname>[\w\-_\d]+)(.git)?(#(?<commit>.+))?/i;
exports.CONFLIT_FILE_NAME = 'spinalconflit.json';
exports.EDIT_ME_STRING = 'EDIT_ME';
exports.DEFAULT_GITOWNER = 'spinalcom';
exports.EXCEPTION_MODULES = {
    'spinal-env-viewer-graph-service': 'Spinal-Graph-Service',
    'spinal-spatial-referential': 'spinal-spatial-referential-service',
};
//# sourceMappingURL=constants.js.map