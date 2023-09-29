export type Consumedfunction<T> = () => Promise<T>;
export declare function consumeBatch<T>(promises: Consumedfunction<T>[], batchSize?: number, cbEndRound?: () => void): Promise<T[]>;
