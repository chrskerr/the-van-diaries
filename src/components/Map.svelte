<script>
    export let size;
    export let zoom;
    export let centre;

    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import _ from "lodash";
    import "../../node_modules/leaflet/dist/leaflet.css";
    import "../../node_modules/leaflet-geosearch/dist/geosearch.css";

    const markers = [{ name: "Derby", latLng: [-41.14213260110557, 147.79722207630516] }];

    onMount(async () => {
        if (browser) {
            const L = await import("leaflet");
            const GeoSearch = await import("leaflet-geosearch");
            await import("leaflet-providers");

            const map = L.map("map").setView(centre, zoom);
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }).addTo(map);
            setTimeout(() => map.invalidateSize(), 50);

            map.addControl(
                new GeoSearch.GeoSearchControl({
                    provider: new GeoSearch.OpenStreetMapProvider(),
                    style: "bar",
                }),
            );

            const icon = L.divIcon({ html: "<span class='feather-location' />" });
            _.forEach(markers, ({ name, latLng }) => {
                const marker = L.marker(latLng, { icon }).addTo(map).bindTooltip(name, { direction: "top" });

                marker.on("click", e => {
                    console.log(e);
                });
            });
        }
    });
</script>

<div id="map" class={`${size}`} />

<style>
    #map {
        width: 100%;
        opacity: 0;
        background: transparent;
        transition: opacity 400ms;
        will-change: opacity;
    }
    .large {
        height: 32rem;
    }
    .small {
        height: 16rem;
    }
</style>
