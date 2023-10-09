import type { IDependencies, IPackageJson } from '../interfaces/IPackageJson';
export declare function readAndEditPackageJson(packageJsonPath: string, addPostInstall: boolean, doWriteFile?: boolean, overwriteDependancies?: IDependencies): Promise<IPackageJson>;
