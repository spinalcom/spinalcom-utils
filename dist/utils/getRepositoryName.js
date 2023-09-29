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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepositoryName = void 0;
var constants_1 = require("../constants");
function getRepositoryName(moduleName, repositoryURI, from, resolvedConfit) {
    var _a, _b;
    var res = constants_1.PARSE_REG_REPOSITORY.exec(repositoryURI);
    if ((_a = res === null || res === void 0 ? void 0 : res.groups) === null || _a === void 0 ? void 0 : _a.gitname) {
        var commit = ((_b = resolvedConfit[moduleName]) === null || _b === void 0 ? void 0 : _b.forceCommit) || res.groups.commit;
        return {
            moduleName: moduleName,
            gitname: res.groups.gitname,
            gitowner: res.groups.owner,
            commit: commit,
            from: from,
        };
    }
    var _c = __read(repositoryURI.split(/@|#/), 2), module = _c[0], _commit = _c[1];
    if (module.endsWith('.git'))
        module = module.replace(/\.git$/, '');
    var gitName = module;
    for (var ExecpMname in constants_1.EXCEPTION_MODULES) {
        if (Object.prototype.hasOwnProperty.call(constants_1.EXCEPTION_MODULES, ExecpMname)) {
            if (ExecpMname === module)
                gitName = constants_1.EXCEPTION_MODULES[ExecpMname];
        }
    }
    return {
        moduleName: !moduleName.startsWith('undefined-') ? moduleName : module,
        gitname: gitName,
        gitowner: constants_1.DEFAULT_GITOWNER,
        commit: _commit,
        from: from,
    };
}
exports.getRepositoryName = getRepositoryName;
//# sourceMappingURL=getRepositoryName.js.map