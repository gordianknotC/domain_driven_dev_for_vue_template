

const isNotDev = ()=>process.env.NODE_ENV != "default" || process.env.NODE_ENV != "develop";

export function assert(guard: ()=>boolean, reason: string = ""){
  if (isNotDev()){
    return;
  }
  if (!guard()){
    throw new AssertException(reason);
  }
}

function shouldBePtn(name: string, val: string){
  return `param "${name}" should be ${val}`;
}
function shouldNotBePtn(name: string, val: string){
  return `param "${name}" should be ${val}`;
}


export
class AssertMessages{
  static notUndefined(name: string){
    return shouldNotBePtn(name, "undefined");
  }
  static true(name: string){
    return shouldBePtn(name, "true");
  }
  static false(name: string){
    return shouldBePtn(name, "false");
  }
}

class AssertException extends Error {
  constructor(reason: string) {
    super(`[AssertException] ${reason}`);
  }
}
