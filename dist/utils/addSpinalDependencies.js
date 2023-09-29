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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
exports.addSpinalDependencies = void 0;
function addSpinalDependencies(dependencies, spinalModules) {
    var e_1, _a;
    var tmp = {};
    try {
        for (var spinalModules_1 = __values(spinalModules), spinalModules_1_1 = spinalModules_1.next(); !spinalModules_1_1.done; spinalModules_1_1 = spinalModules_1.next()) {
            var _b = __read(spinalModules_1_1.value, 2), key = _b[0], val = _b[1];
            tmp[key] = val;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (spinalModules_1_1 && !spinalModules_1_1.done && (_a = spinalModules_1.return)) _a.call(spinalModules_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    Object.assign(dependencies, tmp);
}
exports.addSpinalDependencies = addSpinalDependencies;
//# sourceMappingURL=addSpinalDependencies.js.map