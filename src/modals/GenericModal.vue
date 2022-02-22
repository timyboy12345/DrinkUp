<template>
  <div style="z-index: 10001"
       class="animate-fade-in fixed flex justify-center items-stretch top-0 left-0 w-screen h-screen">
    <div @click="handleModalClose" class="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-black"></div>

    <div class="animate-spin-slow flex flex-row flex-grow text-black">
      <div class="z-10 flex-grow m-4 md:m-6 lg:m-12 xl:m-22 bg-white rounded">
        <slot name="header">
          <div class="py-2 px-4 border-b border-stone-200 text-lg font-bold flex flex-row justify-between items-center">
            <div>{{ header }}</div>

            <div :class="{'opacity-20': !canClose}" class="cursor-pointer rounded border border-gray-200 hover:bg-gray-100 transition duration-100" @click="handleModalClose">
              <XIcon class="w-4 h-4 m-2"/>
            </div>
          </div>
        </slot>

        <slot name="message">
          <div class="p-4">
            {{ message }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import {XIcon} from "@heroicons/vue/outline"

export default {
  name: 'GenericModal',
  components: {XIcon},
  data() {
    return {
      escapeListener: null
    }
  },
  props: {
    header: {
      type: String,
      required: false,
      default: null
    },
    message: {
      type: String,
      required: false,
      default: null
    },
    canClose: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    handleModalClose() {
      if (!this.canClose) {
        return;
      }

      this.$emit('close');
    }
  },
  created() {
    this.escapeListener = window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.handleModalClose();
      }
    })
  },
  destroyed() {
    window.removeEventListener(this.escapeListener);
  }
}
</script>
