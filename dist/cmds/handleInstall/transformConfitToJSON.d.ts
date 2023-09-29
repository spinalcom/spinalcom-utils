import { IGitRepo } from '../../interfaces/IGitRepo';
import type { IConflit } from '../../interfaces/IConflit';
export declare function transformConfitToJSON(resolvedConfit: IConflit, conflitMap: Map<string, IGitRepo[]>): IConflit;
