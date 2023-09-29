import type { IGitRepo } from '../../interfaces/IGitRepo';
export declare enum EHasSeenRepo {
    FOUND = 0,
    NOT_FOUND = 1
}
export declare function hasSeenRepo(seen: Set<IGitRepo>, repo: IGitRepo): IGitRepo | EHasSeenRepo;
