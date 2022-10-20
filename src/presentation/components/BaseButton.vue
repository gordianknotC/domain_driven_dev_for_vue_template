<template>
    

<el-button  class="btn-primary" :class="`btn-${color}-${size}`">
    <slot name="default"></slot>
</el-button>
</template>

<script lang="ts">
import { type } from "os";
import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
export default defineComponent({
name:"BaseButton",
props:{
    color:{
        type:String as PropType<"primary"|"grey"|"red"|"green"|"blue">,
        default:"primary"
    },
    size:{
        type:String as PropType<"  "|"small">,
        default:""

    }

}


})

</script>

<style lang="scss" scoped>
@import "../assets/styles/button";



</style>