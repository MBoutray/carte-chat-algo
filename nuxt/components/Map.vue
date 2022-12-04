<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="16" :center="userPosition" @click="addRdv">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker :lat-lng="userPosition" :icon="iconPerson"></l-marker>
        <l-marker v-if="rdv" :lat-lng="rdv" :icon="iconRdv"></l-marker>
        <l-polyline v-if="polyline" :lat-lngs="polyline"></l-polyline>
        <l-marker v-for="(resto, index) in restaurants" :key="index" :lat-lng="resto.loc" :icon="iconResto"
          @click="passByResto"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { icon } from 'leaflet'
import RestaurantList from './RestaurantList.vue'
import socket from '@/services/socket-client.js'

export default {
  components: { RestaurantList },
  data() {
    return {
      userPosition: [47.89324, 3.22692],
      iconPerson: icon({
        iconUrl: '/images/pink-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      iconRdv: icon({
        iconUrl: '/images/red-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      iconResto: icon({
        iconUrl: '/images/blue-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      rdv: null,
      polyline: [],
      distance: 0,
      temps: 0,
      restoSelected: null,
      currentRoom: null
    }
  },
  props: {
    restaurants: [],
    restoToMap: null,
    user: null,
    rooms: null
  },
  mounted() {
    this.getUserLocation()
  },
  watch: {
    restoToMap: function (restoToMap) {
      this.passByResto(restoToMap)
    },
    userPosition() {
      this.onDataChange()
    },
    rdv() {
      this.onDataChange()
    },
    restoSelected() {
      this.onDataChange()
    },
    rooms(newValue, oldValue) {
      this.currentRoom = newValue?.find(room => room.id === this.currentRoom?.id)
    }
  },
  methods: {
    onDataChange() {
      // send new map data when it changes
      socket.emit('user-map-data', {
        user: this.user,
        userPosition: this.userPosition,
        rdv: this.rdv,
        restoSelected: this.restoSelected
      })
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = [position.coords.latitude, position.coords.longitude]
      })
    },
    addRdv(event) {
      this.rdv = [event.latlng.lat, event.latlng.lng]
      this.polyline = []
      this.polyline.push(this.userPosition)
      this.polyline.push(this.rdv)
      this.getDistance(this.polyline[0], this.polyline[1])
    },
    passByResto(event) {
      if (this.rdv) {
        let t1 = 0
        let t2 = 0
        this.restoSelected = this.restoToMap
        console.log(this.restoSelected)
        if (event.latlng) {
          console.log('if')
          this.polyline = []
          this.polyline.push(this.userPosition)
          this.polyline.push(this.rdv)
          this.polyline.splice(1, 0, [event.latlng.lat, event.latlng.lng])
        } else {
          console.log('else')
          this.polyline = []
          this.polyline.push(this.userPosition)
          this.polyline.push(this.rdv)
          this.polyline.splice(1, 0, [this.restoSelected.loc[0], this.restoSelected.loc[1]])
        }
        this.getDistance(this.polyline[0], this.polyline[1])
        t1 = this.temps
        this.getDistance(this.polyline[1], this.polyline[2])
        t2 = this.temps
        this.temps = t1 + t2
      }
    },
    getDistance(marker1, marker2) {
      let vitesse = 5
      let lat1 = marker1[0] * (Math.PI / 180)
      let lat2 = marker2[0] * (Math.PI / 180)
      let long1 = marker1[1] * (Math.PI / 180)
      let long2 = marker2[1] * (Math.PI / 180)
      // ACOS(SIN(RADIANS(A2))*SIN(RADIANS(A3))+COS(RADIANS(A2))*COS(RADIANS(A3))*COS(RADIANS(B2-B3)))*6371
      this.distance =
        Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)) * 6371
      this.temps = Math.trunc((this.distance / vitesse) * 60) + 1
    }
  }
}
</script>
