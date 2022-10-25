import { computed, ComputedRef, ref, UnwrapNestedRefs } from "vue";

export abstract class ISimpleStore<T> { 
    abstract state: UnwrapNestedRefs<T & {initialFetched: boolean}>;
    abstract getters: Record<string, ComputedRef>;
    constructor(public defaultState: () => T) { };
    /** 初始化 remote update */
    abstract initialFetchUpdate(): Promise<void>;
}

