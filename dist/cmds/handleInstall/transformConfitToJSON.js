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
exports.transformConfitToJSON = void 0;
var constants_1 = require("../../constants");
function transformConfitToJSON(resolvedConfit, conflitMap) {
    var e_1, _a, e_2, _b;
    var _c;
    var res = resolvedConfit;
    try {
        for (var conflitMap_1 = __values(conflitMap), conflitMap_1_1 = conflitMap_1.next(); !conflitMap_1_1.done; conflitMap_1_1 = conflitMap_1.next()) {
            var _d = __read(conflitMap_1_1.value, 2), key = _d[0], arr = _d[1];
            var module_1 = res[key];
            if (!module_1) {
                res[key] = module_1 = { forceCommit: constants_1.EDIT_ME_STRING, found: {} };
            }
            if (module_1.forceCommit !== constants_1.EDIT_ME_STRING)
                continue;
            var foundItems = module_1.found;
            try {
                for (var arr_1 = (e_2 = void 0, __values(arr)), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                    var item = arr_1_1.value;
                    var itemCommit = (_c = item.commit) !== null && _c !== void 0 ? _c : '';
                    var foundItem = foundItems[itemCommit];
                    if (!foundItem) {
                        foundItem = foundItems[itemCommit] = [item.from];
                    }
                    else if (!foundItem.includes(item.from))
                        foundItem.push(item.from);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (arr_1_1 && !arr_1_1.done && (_b = arr_1.return)) _b.call(arr_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (conflitMap_1_1 && !conflitMap_1_1.done && (_a = conflitMap_1.return)) _a.call(conflitMap_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return res;
}
exports.transformConfitToJSON = transformConfitToJSON;
//# sourceMappingURL=transformConfitToJSON.js.map