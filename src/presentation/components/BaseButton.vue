<template>

<el-button :class="btnTypeName" >
    <SvgIcon></SvgIcon>
    <slot></slot>

</el-button>


</template>

<script lang="ts">

import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
name:"BaseButton",
props:{
    color:{
        type:String as PropType<"purple"|"grey"|"red"|"green"|"blue">,
        default:"purple"
    },
    type:{
        type:String as PropType<""|"light">,
        default:""
    },
    size:{
        type:String as PropType<"normal"|"small">,
        default:"normal"
    },
    disable:{
        type:Boolean,
        default:false
    },
  

    
},
setup(props){
    // `btn-red-small`
    const btnTypeName = computed(()=>{
        const type = props.type ? 'Light' : ''
        const disable = props.disable
        const size = props.size ? `-${props.size}`: ''
        const disableBtn = disable ? '--disable' : ''
        return `btn-${props.color}${type}${size}${disableBtn}`
    })
    return{
        btnTypeName
    }

}

})

</script>

<style lang="scss" scoped>
@import "../assets/styles/button";



</style>