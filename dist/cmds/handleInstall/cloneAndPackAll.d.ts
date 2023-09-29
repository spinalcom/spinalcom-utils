import type { IGitRepo } from '../../interfaces/IGitRepo';
import type { IDependencies } from '../../interfaces/IPackageJson';
import type { IConflit } from '../../interfaces/IConflit';
export declare function cloneAndPackAll(packageToInstall: string[], cacheDirPath: string, mainPackageJsonPath: string, resolvedConfit: IConflit, isDryRun: boolean): Promise<{
    conflitMap: Map<string, IGitRepo[]>;
    seen: Set<IGitRepo>;
    tarOutputDir: string;
    dependancies: IDependencies;
}>;
