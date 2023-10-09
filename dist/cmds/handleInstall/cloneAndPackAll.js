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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneAndPackAll = void 0;
var path_1 = require("path");
var mkdirp_1 = require("mkdirp");
var readAndEditPackageJson_1 = require("../../utils/readAndEditPackageJson");
var getRepositoryName_1 = require("../../utils/getRepositoryName");
var cliProgress = require("cli-progress");
var consumeBatch_1 = require("../../utils/consumeBatch");
var CloneEditAndStore_1 = require("./CloneEditAndStore");
var promises_1 = require("fs/promises");
var hasSeenRepo_1 = require("./hasSeenRepo");
var pushInConfitMap_1 = require("./pushInConfitMap");
var crypto_1 = require("crypto");
function cloneAndPackAll(packageToInstall, cacheDirPath, mainPackageJsonPath, resolvedConfit, isDryRun, addPostInstall) {
    return __awaiter(this, void 0, void 0, function () {
        var conflitMap, seen, tmpDir, tarOutputDir, packageJson, index, name_1, multibar, resPackageJsonDep, currentGen, nextGen, bars, toDo, currentGen_1, currentGen_1_1, currPackageJson, spinalDependencies, key, element, repo, s, promises, next, error_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    conflitMap = new Map();
                    seen = new Set();
                    return [4 /*yield*/, (0, mkdirp_1.mkdirp)(cacheDirPath)];
                case 1:
                    _b.sent();
                    tmpDir = (0, path_1.resolve)(cacheDirPath, (0, crypto_1.randomUUID)());
                    tarOutputDir = (0, path_1.resolve)(tmpDir, 'repositories');
                    if (!(packageToInstall.length <= 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, readAndEditPackageJson_1.readAndEditPackageJson)(mainPackageJsonPath, addPostInstall, !isDryRun)];
                case 2:
                    packageJson = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    packageJson = {
                        name: 'cli',
                        version: '',
                        spinalDependencies: {},
                    };
                    for (index = 0; index < packageToInstall.length; index++) {
                        name_1 = packageToInstall[index];
                        packageJson.spinalDependencies["undefined-".concat(index)] = name_1;
                    }
                    _b.label = 4;
                case 4: return [4 /*yield*/, (0, promises_1.rm)(tmpDir, {
                        force: true,
                        recursive: true,
                    })];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, (0, mkdirp_1.mkdirp)(tarOutputDir)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, (0, promises_1.rm)((0, path_1.resolve)(tmpDir, 'tmp'), {
                            force: true,
                            recursive: true,
                        })];
                case 7:
                    _b.sent();
                    multibar = new cliProgress.MultiBar({
                        clearOnComplete: true,
                        hideCursor: true,
                        format: ' {bar} | {modulename} | {percentage}%',
                    }, cliProgress.Presets.shades_grey);
                    resPackageJsonDep = {};
                    currentGen = [];
                    nextGen = [packageJson];
                    bars = [];
                    multibar.log('downloading...');
                    _b.label = 8;
                case 8:
                    if (!nextGen.length) return [3 /*break*/, 14];
                    currentGen = nextGen;
                    nextGen = [];
                    toDo = [];
                    try {
                        for (currentGen_1 = (e_1 = void 0, __values(currentGen)), currentGen_1_1 = currentGen_1.next(); !currentGen_1_1.done; currentGen_1_1 = currentGen_1.next()) {
                            currPackageJson = currentGen_1_1.value;
                            spinalDependencies = currPackageJson.spinalDependencies;
                            for (key in spinalDependencies) {
                                if (Object.prototype.hasOwnProperty.call(spinalDependencies, key)) {
                                    element = spinalDependencies[key];
                                    repo = (0, getRepositoryName_1.getRepositoryName)(key, element, currPackageJson.name, resolvedConfit);
                                    if (currPackageJson === packageJson) {
                                        resPackageJsonDep[repo.moduleName] =
                                            repo.gitname + (repo.commit ? "@".concat(repo.commit) : '');
                                    }
                                    s = (0, hasSeenRepo_1.hasSeenRepo)(seen, repo);
                                    if (s === hasSeenRepo_1.EHasSeenRepo.FOUND)
                                        continue;
                                    else if (s === hasSeenRepo_1.EHasSeenRepo.NOT_FOUND) {
                                        seen.add(repo);
                                        toDo.push(repo);
                                    }
                                    else {
                                        (0, pushInConfitMap_1.pushInConfitMap)(conflitMap, repo, s);
                                    }
                                }
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (currentGen_1_1 && !currentGen_1_1.done && (_a = currentGen_1.return)) _a.call(currentGen_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    promises = toDo.map(function (repo) {
                        return function () {
                            return (0, CloneEditAndStore_1.CloneEditAndStore)(tmpDir, repo, tarOutputDir, multibar, bars, addPostInstall);
                        };
                    });
                    _b.label = 9;
                case 9:
                    _b.trys.push([9, 11, , 13]);
                    return [4 /*yield*/, (0, consumeBatch_1.consumeBatch)(promises, 10, function () {
                            var e_2, _a;
                            try {
                                for (var bars_1 = (e_2 = void 0, __values(bars)), bars_1_1 = bars_1.next(); !bars_1_1.done; bars_1_1 = bars_1.next()) {
                                    var bar = bars_1_1.value;
                                    multibar.remove(bar);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (bars_1_1 && !bars_1_1.done && (_a = bars_1.return)) _a.call(bars_1);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            bars = [];
                        })];
                case 10:
                    next = _b.sent();
                    nextGen.push.apply(nextGen, __spreadArray([], __read(next), false));
                    return [3 /*break*/, 13];
                case 11:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [4 /*yield*/, (0, promises_1.rm)(tmpDir, {
                            force: true,
                            recursive: true,
                        })];
                case 12:
                    _b.sent();
                    process.exit(1);
                    return [3 /*break*/, 13];
                case 13: return [3 /*break*/, 8];
                case 14:
                    multibar.stop();
                    return [4 /*yield*/, (0, promises_1.rm)((0, path_1.resolve)(tmpDir, 'tmp'), {
                            force: true,
                            recursive: true,
                        })];
                case 15:
                    _b.sent();
                    return [2 /*return*/, { conflitMap: conflitMap, seen: seen, tarOutputDir: tarOutputDir, dependancies: resPackageJsonDep }];
            }
        });
    });
}
exports.cloneAndPackAll = cloneAndPackAll;
//# sourceMappingURL=cloneAndPackAll.js.map