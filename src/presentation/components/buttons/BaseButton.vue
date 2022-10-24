<template>


    <el-button :class="btnTypeName" class="baseBtn" >
        <SvgIcon  
        v-if="icon"
        class="baseIcon"
        :class="iconStyle"
        :name="icon"
        width="20px"
        height="20px"
        >
    </SvgIcon>
    <div>
        <slot></slot>
    </div >
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
    icon:{
        type:String,
        default:"" 
    }

    
},
setup(props){
    // `btn-red-small`
    const btnTypeName = computed(()=>{
        const type = props.type ? 'Light' : ''
        const size = props.size ? `-${props.size}`: ''
        const disableBtn = props.disable ? '--disable' : ''
        return `btn-${props.color}${type}${size}${disableBtn}`
    })
    //`baseIcon-redLight`
    const iconStyle= computed(()=>{
        const type = props.type ? 'Light' : ''
        const disableBtn = props.disable ? '--disable' : ''
        return `baseIcon-${props.color}${type}${disableBtn}`

    })
   


    return{
        btnTypeName,
        iconStyle
    }

}

})

</script>

<style lang="scss" scoped>
@import "../../assets/styles/button";

.baseBtn{
    @apply flex justify-center items-center

}


.baseIcon {
    fill: currentColor;
    stroke: currentColor;
    @apply flex pr-2
}


</style>