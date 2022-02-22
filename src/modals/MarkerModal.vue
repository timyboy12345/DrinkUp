<template>
  <GenericModal @close="handleModalClose" :can-close="starData !== null" :header="marker.name">
    <template #message>
      <div class="p-4" v-if="starData">
        {{ starData }}
      </div>

      <div class="p-4 flex flex-row items-center" v-else>
        <div class="mr-2 animate-spin w-4 h-4 border-l-2 border-t-2 border-black rounded-full"></div>

        Loading
      </div>
    </template>
  </GenericModal>
</template>

<script>
import GenericModal from "./GenericModal.vue";
import {StarService} from "../services";

export default {
  name: 'MarkerModal',
  components: {GenericModal},
  props: {
    marker: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      starData: null
    }
  },
  methods: {
    handleModalClose() {
      this.starData = null;
      this.$emit('close');
    }
  },
  created() {
    StarService.getData(this.marker.id).then((data) => {
      this.starData = data;
    })
  }
}
</script>
