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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSeenRepo = exports.EHasSeenRepo = void 0;
var EHasSeenRepo;
(function (EHasSeenRepo) {
    EHasSeenRepo[EHasSeenRepo["FOUND"] = 0] = "FOUND";
    EHasSeenRepo[EHasSeenRepo["NOT_FOUND"] = 1] = "NOT_FOUND";
})(EHasSeenRepo || (exports.EHasSeenRepo = EHasSeenRepo = {}));
function hasSeenRepo(seen, repo) {
    var e_1, _a;
    try {
        for (var seen_1 = __values(seen), seen_1_1 = seen_1.next(); !seen_1_1.done; seen_1_1 = seen_1.next()) {
            var item = seen_1_1.value;
            if (item.moduleName === repo.moduleName) {
                if (item.commit === repo.commit)
                    return EHasSeenRepo.FOUND;
                return item;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (seen_1_1 && !seen_1_1.done && (_a = seen_1.return)) _a.call(seen_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return EHasSeenRepo.NOT_FOUND;
}
exports.hasSeenRepo = hasSeenRepo;
//# sourceMappingURL=hasSeenRepo.js.map