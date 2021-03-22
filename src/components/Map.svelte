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

            const map = L.map("map").setView(centre, zoom);
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
                let clicks = 0;

                if (!preventInteraction) {
                    marker.on("click", () => {
                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && clicks === 0) {
                            marker.toggleTooltip();
                            prefetch(`/places/${slug}`);
                            clicks++;
                        } else {
                            goto(`/places/${slug}`);
                        }
                    });
                    marker.on("mouseover", () => {
                        prefetch(`/places/${slug}`);
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
