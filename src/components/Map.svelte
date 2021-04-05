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

    import ratingsMap from "../ratings";

    onMount(async () => {
        if (browser) {
            const L = await import("leaflet");
            const GeoSearch = await import("leaflet-geosearch");
            await import("leaflet.locatecontrol");
            await import("leaflet-control-custom");

            const map = L.map("map").setView(centre, zoom);
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                detectRetina: true,
            }).addTo(map);

            const latLngs = _.map(_.orderBy(markers, ["date"], ["asc"]), "latLng");

            setTimeout(() => map.invalidateSize(), 50);
            setTimeout(() => map.flyToBounds(latLngs, { padding: [50, 50] }), 1500);

            if (!preventInteraction) {
                const polyline = L.polyline(latLngs, { color: "#37cbe9", weight: 2, opacity: 0.75 });

                map.addControl(
                    new GeoSearch.GeoSearchControl({
                        provider: new GeoSearch.OpenStreetMapProvider(),
                        style: "bar",
                    }),
                );
                L.control
                    .custom({
                        position: "topleft",
                        content: "<span class='feather-trending-down'></span>",
                        classes: "",
                        id: "show-line-control",
                        events: {
                            click: () => {
                                const el = document.getElementById("show-line-control");
                                if (el.classList.contains("show-line-active")) {
                                    el.classList.remove("show-line-active");
                                    polyline.remove();
                                } else {
                                    el.classList.add("show-line-active");
                                    polyline.addTo(map);
                                }
                            },
                        },
                    })
                    .addTo(map);
            }

            L.control.locate({ flyTo: false, icon: "feather-navigation", iconLoading: "feather-loader icon-spin" }).addTo(map);

            const clicks = {};
            const icon = L.divIcon({ html: "<span class='feather-location' />", iconSize: [18, 18], iconAnchor: [9, 21] });
            _.forEach(markers, ({ title, latLng, slug, categories, rating, mapOnly }) => {
                const content = mapOnly
                    ? `<h5>${title}</h5>`
                    : `<h5>${title}</h5><div class="ratings">
                            <span class="${rating >= 1 ? "feather-star-full" : "feather-star-empty"}"></span>
                            <span class="${rating >= 2 ? "feather-star-full" : "feather-star-empty"}"></span>
                            <span class="${rating >= 3 ? "feather-star-full" : "feather-star-empty"}"></span>
                        </div><p class="rating-text">${_.get(ratingsMap, rating)}</p><ul>${_.join(
                          _.map(categories, cat => `<li>${_.startCase(cat)}</li>`),
                          "",
                      )}</ul>`;

                const popup = L.marker(latLng, { icon })
                    .addTo(map)
                    .bindPopup(L.popup({ closeButton: false }).setContent(content));

                if (!preventInteraction) {
                    clicks[slug] = 0;

                    if (!mapOnly) {
                        popup.on("click", () => {
                            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && clicks[slug] === 0) {
                                popup.openPopup();
                                prefetch(`/places/${slug}`);
                                clicks[slug]++;
                            } else {
                                goto(`/places/${slug}`);
                            }
                        });
                    }
                    popup.on("mouseover", () => {
                        popup.openPopup();
                        clicks[slug]++;
                        if (!mapOnly) prefetch(`/places/${slug}`);
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
