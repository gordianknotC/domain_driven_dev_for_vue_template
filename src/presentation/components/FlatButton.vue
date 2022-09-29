<template lang="pug">
button.flat-button(
  :class="[{active, block, shadow, disabled, prefix, suffix, loading }, `flat-button--${color}`, `flat-button--${type}`, `flat-button--${size}`]"
  :disabled="disabled"
  :type="nativeType"
)
  slot(name="loading")
    svg-icon.loading-icon.animate-spin(name="loading" v-if="loading" width="16px" height="16px")
  slot(name="prefix")
    svg-icon.prefix-icon(:name="prefix" v-if="prefix" :width="iconSize + 'px'" :height="iconSize + 'px'")
  slot
  slot(name="suffix")
    svg-icon.suffix-icon(:name="suffix" v-if="suffix" :width="iconSize + 'px'" :height="iconSize + 'px'")
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "FlatButton",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String as PropType<"primary" | "secondary" | "light" | "dark">,
      default: "primary",
      validator: (value: string) => {
        return ["primary", "secondary", "light", "dark"].indexOf(value) !== -1;
      }
    },
    block: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<"text" | "normal">,
      default: "normal",
      validator: (value: string) => {
        return ["text", "normal"].indexOf(value) !== -1;
      }
    },
    shadow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<"medium" | "large" | "small">,
      default: "medium",
      validator: (value: string) => {
        return ["medium", "large", "small"].indexOf(value) !== -1;
      }
    },
    prefix: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String as PropType<"button" | "reset" | "submit">,
      default: ""
    },
    iconSize: {
      type: Number,
      default: 18
    }
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.flat-button {
  @apply rounded-lg font-medium transition-all duration-300 ease-linear capitalize whitespace-nowrap;
  &--small {
    @apply px-2 py-1 text-xs;
  }
  &--medium {
    @apply px-4 py-2 text-sm;
  }
  &--large {
    @apply px-8 py-3.5 text-base;
  }
  &.block {
    @apply w-full;
  }
  &.prefix,
  &.suffix,
  &.loading {
    @apply flex items-center justify-center;
  }
  .prefix-icon,
  .loading-icon {
    @apply mr-1;
  }
  .suffix-icon {
    @apply ml-1;
  }
  &.shadow {
    // box-shadow: -3.3px 0px 3px 1.8px rgba(255, 255, 255, 0.25), 2px 3.3px 7px -1.8px rgba(14, 14, 44, 0.2), inset 0.6px 0.6px 0.6px rgba(255, 255, 255, 0.5);
    @apply button-shadow;
  }
  &.disabled {
    @apply pointer-events-none opacity-50;
  }
  &--primary {
    @apply bg-primary text-primary-text;
    &:hover {
      @apply bg-primary-deep;
    }
    &.active {
      @apply button-primary-active-shadow;
    }
  }
  &--secondary {
    @apply bg-secondary text-secondary-text;
    &:hover {
      @apply bg-secondary-deep;
    }
    &.active {
      @apply button-secondary-active-shadow;
    }
  }
  &--light {
    @apply bg-bg-light;
  }
  &--dark {
    @apply bg-bg-med-dark;
  }
  &--text {
    @apply bg-transparent;
  }
}

.flat-button--primary {
  &.flat-button--text {
    @apply text-primary shadow-none;
    &.active,
    &:hover {
      @apply bg-transparent filter brightness-75;
    }
    &.active {
      @apply border border-primary-border;
    }
  }
}

.flat-button--secondary {
  &.flat-button--text {
    @apply text-secondary shadow-none;
    &.active,
    &:hover {
      @apply bg-transparent filter brightness-75;
    }
    &.active {
      @apply border border-secondary-border;
    }
  }
}

.svg-icon {
  @apply text-current fill-current stroke-current;
}
</style>
