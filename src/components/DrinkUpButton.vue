<template>
  <component :is="to ? 'router-link' : 'div'" :to="to"
             class="flex flex-row items-center justify-center py-2 px-4 rounded shadow ring ring-transparent border transition-all duration-200"
             :class="{'cursor-pointer': !disabled, 'opacity-50': disabled, 'hover:ring-amber-500/20 hover:bg-amber-200/10': !disabled, 'border-amber-500 text-amber-300': type === 'translucent' }"
  >
    <slot>
      ...
    </slot>
  </component>
</template>

<script>
export default {
  name: 'DrinkUpButton',
  props: {
    to: {
      type: String,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: 'translucent'
    }
  }
}
</script>
