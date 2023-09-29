export interface IConflit {
    [moduleName: string]: IConflitModule;
}
export interface IFoundItems {
    [commit: string]: string[];
}
export interface IConflitModule {
    forceCommit?: string;
    found: IFoundItems;
}
