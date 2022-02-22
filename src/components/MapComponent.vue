<template>
  <div class="w-full h-full bg-stone-800">
    <l-map
        ref="map"
        class="h-full"
        :min-zoom="minZoom"
        :crs="crs"
        style="background-color: #111827;"
        :center.sync="center"
        :options="{ tap: false, zoomControl: false }"
        @click="logClick"
    >
      <l-image-overlay
          :url="url"
          :bounds="bounds"
      />
      <!--      <l-marker-->
      <!--          v-for="star in stars"-->
      <!--          :key="star.name"-->
      <!--          :lat-lng="star"-->
      <!--          @click="handleMarkerClick(star, $event)"-->
      <!--      >-->
      <!--        <l-popup :content="star.name"/>-->
      <!--      </l-marker>-->

      <!--      <l-polyline :lat-lngs="travel"/>-->

      <l-marker
          v-for="star in markers.filter(m => !m.disabled)"
          :key="star.name"
          :lat-lng="star"
          @click="handleMarkerClick(star, $event)"
          :icon="getMarker(star)"
      />

<!--      <l-polygon :lat-lngs="[100, 100]" fill-color="white" :fill="true"></l-polygon>-->
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import {LImageOverlay, LMap, LMarker, LPolyline, LPopup, LPolygon} from "@vue-leaflet/vue-leaflet";
import {CRS, icon} from "leaflet";

export default {
  name: 'MapComponent',
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LPolyline,
    LPolygon
  },
  props: {
    markers: {
      type: Array,
      required: false,
      default: []
    }
  },
  data() {
    return {
      url: "/kingdom_rush.jpeg",
      bounds: [[0, 0], [576, 1024]],
      minZoom: -2,
      crs: CRS.Simple
    }
  },
  computed: {
    center: {
      get: function () {
        return [576 / 2, 500]
      },
      set: function (c) {
        console.log(c);
      }
    },
    defaultMarker() {
      return {
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }
    }
  },
  methods: {
    handleMarkerClick(marker, $evt) {
      this.$emit('markerClick', marker, $evt)
    },
    logClick($event) {
      if (!$event.type || $event.type !== 'click' || !$event.originalEvent) {
        return;
      }

      console.log($event);

      // if ($event.latlng) {
      //   const lat = $event.latlng.lat;
      //   const lng = $event.latlng.lng;
      //   console.log(`{name: "XXX", lng: ${lng}, lat: ${lat}},`)
      // }
    },
    getMarker(t) {
      const color = t.type ?? 'green';
      const url = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`;

      return icon({
        iconUrl: url,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        ...this.defaultMarker
      });
    }
  }
}
</script>
