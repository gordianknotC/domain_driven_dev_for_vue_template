<template>
  
<el-button 
:class="btnTypeName" 
>
    <slot></slot>


</el-button>


</template>

<script lang="ts">

import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
name:"BaseButton",
props:{
    type:{
        type:String as PropType<"purple"|"purpleLight"|"grey"|"red"|"green"|"blue">,
        default:"purple"
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
        const disable = props.disable
        const size = props.size ? `-${props.size}`: ''
        if(disable==false){
            return `btn-${props.type}${size}`
        }
        else{
            return `btn-${props.type}${size}--disable`
        }
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