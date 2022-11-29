<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="17" :center="center" @click="addMarker">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker :lat-lng="center" :icon="icon"></l-marker>
        <l-marker v-for="marker, index in markers" :key="index" :lat-lng="marker" @click="removeMarker(index)"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { latLng, icon } from "leaflet";
export default {
  data() {
    return {
      center: [47.89324, 3.22692],
      icon: icon({
        iconUrl: "/images/logo.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      markers: [
        ],
        // ACOS(SIN(RADIANS(A2))*SIN(RADIANS(A3))+COS(RADIANS(A2))*COS(RA DIANS(A3))*COS(RADIANS(B2-B3)))*6371
    };
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = [position.coords.latitude, position.coords.longitude];
      });
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
    },
    addMarker(event) {
      this.markers.push(event.latlng);
    },
    getDistance(marker1, marker2) {
        //
    }
  },
};
</script>
