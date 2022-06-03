
import {computed, defineComponent, PropType, reactive, ref, toRefs, onMounted, watch} from "vue";
import {TUnWrapVueRef} from "common_js_builtin";


const KEY = "__USER_DATA_TEMPLATEKEY___";

export
type TRouteName = "Entry" | "UPI" | "Wallet";
type TStore ={
  route: TRouteName;
  lastRoute: TRouteName | null;
}

class MainStore{
  state: TUnWrapVueRef<TStore> = reactive({
    route: "Entry",
    lastRoute: null,
  })

  constructor() {
    watch(()=>this.state, ()=>{
      this._set(this.state);
    });
    const preState = this._get() ?? {};
    Object.keys(preState).forEach((key)=>{
      //@ts-ignore
      this.state[key] = preState[key];
    });
  }

  private _set(obj: TStore){
    window.localStorage.setItem(KEY, JSON.stringify(obj));
  }

  private _get(): TStore | null{
    const val = window.localStorage.getItem(KEY) ?? "{}";
    return JSON.parse(val);
  }

  routeBack(){
    if (this.state.lastRoute){
      this.state.route = this.state.lastRoute;
    }
    this.state.lastRoute = null;
  }
  routeTo(page: TRouteName){
    this.state.lastRoute = this.state.route;
    this.state.route = page;
  }
}

const mainStore = new MainStore();
export default mainStore;

