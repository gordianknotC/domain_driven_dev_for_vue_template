import { computed, ComputedRef, ref } from "vue";

export abstract class ISimpleStore<T> { 
    abstract state: T;
    abstract getters: Record<string, ComputedRef>;
    constructor(public defaultState: () => T) { };
}

