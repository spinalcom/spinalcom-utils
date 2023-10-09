export interface IInstallOpt {
    cache: string;
    path: string;
    dryRun: boolean;
    onlySpinalcom: boolean;
    save: boolean;
    addPostInstall: boolean;
}
export declare function handleInstall(packageToInstall: string[], options: IInstallOpt): Promise<void>;
