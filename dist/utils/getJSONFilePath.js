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
exports.getJSONFilePath = void 0;
var path_1 = require("path");
function getJSONFilePath(packageJsonPath, jsonFileName, isStrictName) {
    if (isStrictName === void 0) { isStrictName = true; }
    if (!packageJsonPath.endsWith('.json'))
        return (0, path_1.resolve)(packageJsonPath, jsonFileName);
    else if (!isStrictName)
        return (0, path_1.resolve)(packageJsonPath);
    else
        return (0, path_1.resolve)(packageJsonPath, '..', jsonFileName);
}
exports.getJSONFilePath = getJSONFilePath;
//# sourceMappingURL=getJSONFilePath.js.map