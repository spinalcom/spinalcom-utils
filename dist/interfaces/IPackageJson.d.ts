export interface IPackageJson {
    name: string;
    version: string;
    description?: string;
    keywords?: any[];
    author?: string;
    license?: string;
    devDependencies?: IDependencies;
    dependencies?: IDependencies;
    spinalDependencies?: IDependencies;
    [key: string]: any;
}
export interface IDependencies {
    [module: string]: string;
}
