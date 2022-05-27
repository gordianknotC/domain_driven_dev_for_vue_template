import {WritableComputedRef}    from "@vue/reactivity";
import {computed} from "vue";
type TEmitFn<E> = (event: E, ...args: any[])=>void;

/**
*   onSet    : 當前 vmodel 於組件中被設值，或以參照方式傳至其他地方被設值
*   onChange : onSet 發生 or props[propName] 由上一層傳來值發生變動
* */
type TAsVModelParam<T> = {
  props: Readonly<T>,
  propName: keyof T,
  emit: TEmitFn<any>,
  onSet?: (v: any)=>void,
  onChange?: (v: any)=>void
}

export class CommonMixin {
  vModelEvents: Set<string>;
  constructor() {
    this.vModelEvents=new Set();
  }

  asVModel<R, T extends object=any>(param: TAsVModelParam<T>): WritableComputedRef<R>{
    const {props, propName, emit, onSet, onChange} = param;
    const event = `update:${propName}`;
    this.vModelEvents.add(event as any);
    let initialValue:any;
    return computed({
      get(){
        if (initialValue != props[propName]){
          onChange?.(props[propName]);
        }
        return initialValue = props[propName];
      },
      set(v: any){
        onSet?.(v);
        onChange?.(v);
        emit(event, v);
      }
    })
  }

  /**
   *  隱藏 browser/chrome autofill background
   *  原理為 auto start start css animation
   *  所以需要定義一個 animationstart 的 css animation
   * */
  hideAutoFillBackground(inputElt: HTMLInputElement, onChange?: ()=>void){
    onChange ??= ()=> inputElt.value = inputElt.value ?? "";
    inputElt.addEventListener("animationstart", (e: any) => {
      const animName = e.animationName.toLowerCase();
      // console.log("start animation:", e);
      onChange!();
    })
  }
}


