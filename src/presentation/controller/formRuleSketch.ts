


// /***
//  * 
//  *    驗證規則可能寫法
//  * 
//  */
// abstract class CallableClass extends Function{
//   _bound: CallableClass;
//   constructor(...args: any[]){
//     super('...args', 'return this._bound._call(...args)')
//     this._bound = this.bind(this)
//     return this._bound
//   }
//   abstract _call(...args: any[]): any;
// };

// class Rule extends CallableClass{
//   constructor(...args: any[]){
//     super();
//   }
//   _call(...args: any[]) {
//     console.log(this, args)
//     return this;
//   }
//   bindTarget(...args: Field[]):Rule {return this}
// };

// class Field{
//   constructor(arg: any){}
//   bindTarget(...args: ){};
// };

// /**  假定 email form 長這樣*/
// const user  = {email: "", password:"", confirm_password: ""}

// /** 表單規則設定 */
// const emailRule = new Rule({
// 	placeHolder: "placeholder",
//   	errorText: (args: string[])=>`errorText args[0]`,
//     validate: (val: string, target: Field, bindTarget: Field[]):boolean =>{
//       return true;
// 	},
// });

// const lengthRule = new Rule({});
// const allowChars = new Rule({});
// const requiredChars = new Rule({});                            
// const equalRule = new Rule({
// 	...,
//   	validate: (val: string, target: Field, bindTarget: Field[]):boolean =>{
//       if (bindTarget.length){
//         const pass = bindTarget.every((_)=>_.value == val);
//         if (pass) 
//             return true;
//         bindTarget.forEach((_)=> _.notifyExternalError(""));
//         return true;
//       }else{
//         throw new Error("expect bind target here...");
//       }
//     },
// })

// /***
//  *      建立可複用的 input field 驗證 模型
//  * 
//  */
// const emailField = new Field({
//   rules: [
//   	emailRule,
//   	lengthRule(20),
// ]});

// const passwordField = new Field({
//   rules: [
//     lengthRule(30),
//     allowChars("[a-zA-Z-_#@1-9]+"),
//     requiredChars("[a-zA-Z1-9]"),
//   ]
// });

// const confirmPwdField = new Field({
//   extends: passwordField,
// }).bindTarget({
// 	field: passwordField,
//   rules: [
//     equalRule,
//   ]
// });


// /** 
//  * 
//  *    於 vue 腳本使用 
//  *    餵給 element plus
//  * 
//  * */
// const formFields = {
//   uiFriendlyField: emailField.createField(toRef(user, "email")),
//   uiFriendlyField: passwordField.createField(toRef(user, "password")),
//   uiFriendlyField: confirmPwdField.createField(toRef(user, "confirm_password")),
// }


// const template = `
// <template>
//   <el-input></el-input>
// </template>
// `






