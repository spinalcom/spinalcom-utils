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
exports.extractSpinalDependencies = void 0;
function extractSpinalDependencies(dependencies, spinalModules) {
    for (var key in dependencies) {
        if (Object.prototype.hasOwnProperty.call(dependencies, key)) {
            if (key.toLowerCase().startsWith('spinal-')) {
                spinalModules.set(key, dependencies[key]);
                delete dependencies[key];
            }
        }
    }
}
exports.extractSpinalDependencies = extractSpinalDependencies;
//# sourceMappingURL=extractSpinalDependencies.js.map