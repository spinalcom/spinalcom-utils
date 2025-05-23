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
exports.CloneEditAndStore = void 0;
var path_1 = require("path");
var mkdirp_1 = require("mkdirp");
var readAndEditPackageJson_1 = require("../../utils/readAndEditPackageJson");
var promises_1 = require("fs/promises");
var crypto_1 = require("crypto");
var simple_git_1 = require("simple-git");
var execNpmPack_1 = require("../../utils/execNpmPack");
function CloneEditAndStore(cacheDir, repo, tarOutputDir, multibar, bar, addPostInstall) {
    return __awaiter(this, void 0, void 0, function () {
        var repoPath, progress, git, modulePackageJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repoPath = (0, path_1.resolve)(cacheDir, 'tmp', (0, crypto_1.randomUUID)());
                    return [4 /*yield*/, (0, mkdirp_1.mkdirp)(repoPath)];
                case 1:
                    _a.sent();
                    progress = function (_a) {
                        var progress = _a.progress;
                        bar.update(progress, { modulename: repo.moduleName });
                    };
                    git = (0, simple_git_1.simpleGit)({ progress: progress });
                    if (!repo.commit) return [3 /*break*/, 3];
                    return [4 /*yield*/, git.raw('clone', "https://github.com/".concat(repo.gitowner, "/").concat(repo.gitname, ".git"), '--branch', repo.commit, '--single-branch', repoPath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, git.raw('clone', "https://github.com/".concat(repo.gitowner, "/").concat(repo.gitname, ".git"), '--single-branch', repoPath)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    bar.update(100);
                    return [4 /*yield*/, (0, readAndEditPackageJson_1.readAndEditPackageJson)(repoPath, addPostInstall, true)];
                case 6:
                    modulePackageJson = _a.sent();
                    bar.update(101, {
                        modulename: "".concat(repo.moduleName, "@").concat(modulePackageJson.version),
                    });
                    repo.version = modulePackageJson.version;
                    return [4 /*yield*/, (0, execNpmPack_1.execNpmPack)(repoPath, tarOutputDir)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, promises_1.rm)(repoPath, {
                            force: true,
                            recursive: true,
                        })];
                case 8:
                    _a.sent();
                    bar.update(110);
                    return [2 /*return*/, modulePackageJson];
            }
        });
    });
}
exports.CloneEditAndStore = CloneEditAndStore;
//# sourceMappingURL=CloneEditAndStore.js.map