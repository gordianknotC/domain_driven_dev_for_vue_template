import { computed, ComputedRef, ref, UnwrapNestedRefs } from "vue";

export abstract class ISimpleStore<T> { 
    abstract state: UnwrapNestedRefs<T>;
    abstract getters: Record<string, ComputedRef>;
    constructor(public defaultState: () => T) { };
}

