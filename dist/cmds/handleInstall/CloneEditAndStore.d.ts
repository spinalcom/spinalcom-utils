import type { IGitRepo } from '../../interfaces/IGitRepo';
import type { IPackageJson } from '../../interfaces/IPackageJson';
import cliProgress = require('cli-progress');
export declare function CloneEditAndStore(cacheDir: string, repo: IGitRepo, tarOutputDir: string, multibar: cliProgress.MultiBar, bars: cliProgress.Bar[]): Promise<IPackageJson>;
