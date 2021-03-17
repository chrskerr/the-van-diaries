<script>
    export let size;
    export let zoom;
    export let centre;
    export let markers;
    export let preventInteraction = false;

    import { goto, prefetch } from "$app/navigation";
    import { browser } from "$app/env";
    import { onMount } from "svelte";

    onMount(async () => {
        if (browser) {
            const L = await import("leaflet");
            const GeoSearch = await import("leaflet-geosearch");

            const map = L.map("map", { zoomControl: !preventInteraction }).setView(centre, zoom);
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                detectRetina: true,
            }).addTo(map);
            setTimeout(() => map.invalidateSize(), 50);

            if (!preventInteraction)
                map.addControl(
                    new GeoSearch.GeoSearchControl({
                        provider: new GeoSearch.OpenStreetMapProvider(),
                        style: "bar",
                    }),
                );

            const icon = L.divIcon({ html: "<span class='feather-location' />" });
            markers.forEach(({ title, latLng, slug }) => {
                const marker = L.marker(latLng, { icon }).addTo(map).bindTooltip(title, { direction: "top" });

                if (!preventInteraction) {
                    marker.on("click", () => {
                        goto(`/posts/${slug}`);
                    });
                    marker.on("mouseover", () => {
                        prefetch(`/posts/${slug}`);
                    });
                }
            });
        }
    });
</script>

<div id="map" class={`${size}`} />

<style>
    @import "$lib/leaflet/dist/leaflet.css";
    @import "$lib/leaflet-geosearch/dist/geosearch.css";

    #map {
        width: 100%;
    }
    .large {
        height: 32rem;
    }
    .small {
        height: 16rem;
    }
</style>
