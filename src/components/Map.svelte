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

    let totalDistanceInMetres;
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

            setTimeout(() => map.invalidateSize(), 50);

            if (!preventInteraction) {
                const latLngs = _.map(_.orderBy(markers, ["date"], ["asc"]), "latLng");

                totalDistanceInMetres = _.reduce(
                    latLngs,
                    (total, curr, i) => {
                        const next = _.nth(latLngs, i + 1);

                        return next ? total + L.latLng(curr).distanceTo(next) : total;
                    },
                    0,
                );

                setTimeout(() => map.flyToBounds(latLngs, { paddingTopLeft: [40, 40], paddingBottomRight: [10, 10] }), 500);
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
                if (mapOnly) return;
                const content = `<h5>${title}</h5><div class="ratings">
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
                    popup.on("click", () => {
                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && clicks[slug] === 0) {
                            popup.openPopup();
                            prefetch(`/places/${slug}`);
                            clicks[slug]++;
                        } else {
                            goto(`/places/${slug}`);
                        }
                    });
                    popup.on("mouseover", () => {
                        popup.openPopup();
                        clicks[slug]++;
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
{#if totalDistanceInMetres}
    <div class="distance-travelled">
        <p>Total distance travelled: {_.round(totalDistanceInMetres / 1000).toLocaleString()}km</p>
    </div>
{/if}

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

    .distance-travelled {
        text-align: center;
        padding-top: 1rem;
    }

    .distance-travelled > p {
        color: white;
        font-size: 125%;
    }
</style>
