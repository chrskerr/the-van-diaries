<script>
    export let size;
    export let zoom;
    export let centre;
    export let markers;
    export let preventInteraction = false;

    import { goto, prefetch } from "$app/navigation";
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import _ from "lodash";

    onMount(async () => {
        if (browser) {
            const L = await import("leaflet");
            const GeoSearch = await import("leaflet-geosearch");
            await import("leaflet.locatecontrol");

            const map = L.map("map").setView(centre, zoom);
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                detectRetina: true,
            }).addTo(map);
            setTimeout(() => map.invalidateSize(), 50);

            if (!preventInteraction) {
                map.addControl(
                    new GeoSearch.GeoSearchControl({
                        provider: new GeoSearch.OpenStreetMapProvider(),
                        style: "bar",
                    }),
                );
                L.control.locate({ flyTo: false, icon: "feather-location", iconLoading: "feather-loader icon-spin" }).addTo(map);
            }

            const icon = L.divIcon({ html: "<span class='feather-location' />" });
            markers.forEach(({ title, latLng, slug, categories }) => {
                const popup = L.marker(latLng, { icon })
                    .addTo(map)
                    .bindPopup(
                        L.popup({ closeButton: false }).setContent(
                            `<h5>${title}</h5><ul>${_.join(
                                _.map(categories, cat => `<li>${_.startCase(cat)}</li>`),
                                "",
                            )}</ul>`,
                        ),
                    );

                let clicks = 0;

                if (!preventInteraction) {
                    popup.on("click", () => {
                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && clicks === 0) {
                            popup.openPopup();
                            prefetch(`/places/${slug}`);
                            clicks++;
                        } else {
                            goto(`/places/${slug}`);
                        }
                    });
                    popup.on("mouseover", () => {
                        popup.openPopup();
                        clicks++;
                        prefetch(`/places/${slug}`);
                    });
                    popup.on("mouseout", () => {
                        popup.closePopup();
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
    @import "$lib/leaflet.locatecontrol/dist/L.Control.Locate.min.css";

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
