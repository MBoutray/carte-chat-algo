<template>
    <div id="map-wrap" style="height: 100vh">
        <client-only>
            <l-map :zoom=17 :center="[48.89324, 2.22692]">
                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                <l-marker :lat-lng="[48.89324, 2.22692]"></l-marker>
            </l-map>
        </client-only>
    </div>
</template>

<script>
export default {
    name: 'Map',
    methods: {
        getUserLocation() {
            navigator.geolocation.getCurrentPosition((position) => {
                return [position.coords.latitude, position.coords.longitude];
        });
    }
    }
}
</script>