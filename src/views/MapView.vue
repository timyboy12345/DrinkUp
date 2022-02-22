<template>
  <div class="w-screen h-screen">
    <MapComponent
        :markers="markers"
        @markerClick="handleMarkerClick"
    />

    <div style="z-index: 1000" class="absolute left-4 bottom-4 xl:left-8 xl:bottom-8">
      <DrinkUpButton to="/">Teruggaan</DrinkUpButton>
    </div>

    <MarkerModal @close="handleModalClose" v-if="selectedMarker" :marker="selectedMarker"></MarkerModal>
  </div>
</template>

<script>
import MapComponent from "../components/MapComponent.vue";
import MarkerModal from "../modals/MarkerModal.vue";
import { StarService } from '../services'
import DrinkUpButton from "../components/DrinkUpButton.vue";

export default {
  components: {DrinkUpButton, MarkerModal, MapComponent},
  data() {
    return {
      markers: [],
      selectedMarker: null
    }
  },
  methods: {
    handleMarkerClick($marker, $event) {
      this.selectedMarker = $marker;
    },
    handleModalClose() {
      this.selectedMarker = null;
    }
  },
  created() {
    StarService.getAll().then((stars) => {
      this.markers = stars;
    })
  }
}
</script>
