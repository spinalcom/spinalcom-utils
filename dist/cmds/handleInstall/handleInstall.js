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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInstall = void 0;
var promises_1 = require("fs/promises");
var constants_1 = require("../../constants");
var getJSONFilePath_1 = require("../../utils/getJSONFilePath");
var transformConfitToJSON_1 = require("./transformConfitToJSON");
var getMissingEditResolvedModuleName_1 = require("./getMissingEditResolvedModuleName");
var hasConflitNotResolved_1 = require("./hasConflitNotResolved");
var getResolvedConflit_1 = require("./getResolvedConflit");
var cloneAndPackAll_1 = require("./cloneAndPackAll");
var path_1 = require("path");
var execNpmInstall_1 = require("../../utils/execNpmInstall");
var readAndEditPackageJson_1 = require("../../utils/readAndEditPackageJson");
function handleInstall(packageToInstall, options) {
    return __awaiter(this, void 0, void 0, function () {
        var timeStart, cacheDirPath, mainPackageJsonPath, conflitFilePath, resolvedConfit, missing, _a, conflitMap, seen, tarOutputDir, dependancies, res, packages, packageJsonPath, pathPackageToInstall;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    timeStart = Date.now();
                    cacheDirPath = (0, path_1.resolve)(options.cache);
                    mainPackageJsonPath = options.path;
                    conflitFilePath = (0, getJSONFilePath_1.getJSONFilePath)(mainPackageJsonPath, constants_1.CONFLIT_FILE_NAME);
                    return [4 /*yield*/, (0, getResolvedConflit_1.getResolvedConflit)(conflitFilePath)];
                case 1:
                    resolvedConfit = _b.sent();
                    missing = (0, getMissingEditResolvedModuleName_1.getMissingEditResolvedModuleName)(resolvedConfit);
                    if (missing.length > 0) {
                        return [2 /*return*/, console.error("Parse Error set attribute 'forceCommit' for module ".concat(missing.join(','), " in ").concat(conflitFilePath))];
                    }
                    return [4 /*yield*/, (0, cloneAndPackAll_1.cloneAndPackAll)(packageToInstall, cacheDirPath, mainPackageJsonPath, resolvedConfit, options.dryRun, options.addPostInstall)];
                case 2:
                    _a = _b.sent(), conflitMap = _a.conflitMap, seen = _a.seen, tarOutputDir = _a.tarOutputDir, dependancies = _a.dependancies;
                    if (!conflitMap) return [3 /*break*/, 4];
                    res = (0, transformConfitToJSON_1.transformConfitToJSON)(resolvedConfit, conflitMap);
                    if (!(0, hasConflitNotResolved_1.hasConflitNotResolved)(res)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, promises_1.writeFile)(conflitFilePath, JSON.stringify(res, null, 2))];
                case 3:
                    _b.sent();
                    console.error('Some conflit found, edit file %s', conflitFilePath);
                    return [2 /*return*/];
                case 4:
                    packages = Array.from(seen);
                    console.log('%d Spinalcom package found :', packages.length);
                    packages.forEach(function (itm) { return console.log("  ".concat(itm.moduleName, "@").concat(itm.version)); });
                    if (!(options.dryRun === false)) return [3 /*break*/, 9];
                    packageJsonPath = (0, getJSONFilePath_1.getJSONFilePath)(mainPackageJsonPath, 'package.json', false);
                    if (!(options.onlySpinalcom === false)) return [3 /*break*/, 6];
                    console.log('Start installing main dependencies...');
                    return [4 /*yield*/, (0, execNpmInstall_1.execNpmInstall)(packageJsonPath)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    pathPackageToInstall = packages.map(function (itm) {
                        var regRes = /^v?(?<Major>0|(?:[1-9]\d*))(?:\.(?<Minor>0|(?:[1-9]\d*))(?:\.(?<Patch>0|(?:[1-9]\d*)))?(?:\-(?<PreRelease>[0-9A-Z\.-]+))?(?:\+(?<Meta>[0-9A-Z\.-]+))?)?/i.exec(itm.version);
                        var version = "".concat(regRes.groups.Major, ".").concat(regRes.groups.Minor, ".").concat(regRes.groups.Patch);
                        return (0, path_1.resolve)(tarOutputDir, "".concat(itm.moduleName, "-").concat(version, ".tgz"));
                    });
                    console.log('Start installing spinalcom dependencies...');
                    return [4 /*yield*/, (0, execNpmInstall_1.execNpmInstall)(packageJsonPath, pathPackageToInstall)];
                case 7:
                    _b.sent();
                    if (!options.save) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, readAndEditPackageJson_1.readAndEditPackageJson)(mainPackageJsonPath, options.addPostInstall, true, dependancies)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [4 /*yield*/, (0, promises_1.rm)((0, path_1.resolve)(tarOutputDir, '..'), {
                        force: true,
                        recursive: true,
                    })];
                case 10:
                    _b.sent();
                    console.log('Install done in %d ms', Date.now() - timeStart);
                    return [2 /*return*/];
            }
        });
    });
}
exports.handleInstall = handleInstall;
//# sourceMappingURL=handleInstall.js.map