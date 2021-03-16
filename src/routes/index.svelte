<script>
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";

    import "../../node_modules/leaflet/dist/leaflet.css";
    import "../../node_modules/leaflet-geosearch/dist/geosearch.css";

    import { onMount } from "svelte";
    onMount(() => {
        import("leaflet").then(L => {
            import("leaflet-providers").then(() => {
                import("leaflet-geosearch").then(GeoSearch => {
                    const map = L.map("map").setView([-27, 134], 4);

                    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    }).addTo(map);

                    map.addControl(
                        new GeoSearch.GeoSearchControl({
                            provider: new GeoSearch.OpenStreetMapProvider(),
                            style: "bar",
                        }),
                    );

                    const icon = L.divIcon({ html: "<span class='feather-location' />" });
                    L.marker([-41.14213260110557, 147.79722207630516], { icon }).addTo(map);

                    setTimeout(() => map.invalidateSize(), 50);
                });
            });
        });
    });
</script>

<Header />

<!-- Banner -->
<div id="banner">
    <div class="wrapper style1 special">
        <div class="inner">
            <h1 class="heading alt">The Van Diaries</h1>
            <p>Lorem feugiat consequat phasellus ultrices nulla quis nibh lorem ligula</p>
            <div class="image fit special">
                <div id="map" />
            </div>
        </div>
    </div>
</div>

<!-- One -->
<div id="one">
    <div class="wrapper special">
        <div class="inner">
            <header class="major">
                <h2>Amet magna adipiscing</h2>
            </header>
            <div class="image fit special">
                <img src="images/pic02.jpg" alt="" />
            </div>
            <p class="special">Sed egestas, ante et vulputate volutpat pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum lorem ipsum dolor sit amet consequat hendrerit tortor semper lorem at felis.</p>
            <ul class="actions">
                <li><a href="#" class="button">Details</a></li>
            </ul>
        </div>
    </div>
</div>

<!-- Two -->
<div id="two">
    <div class="wrapper style2">
        <div class="inner">
            <div class="spotlights">
                <div class="intro">
                    <header>
                        <h2 class="left">Eu ligula<br /> consequat</h2>
                        <p>Sed egestas, ante et vulputate volutpat pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing.</p>
                    </header>
                    <ul class="actions">
                        <li><a href="#" class="button">Details</a></li>
                    </ul>
                </div>
                <div class="spotlight">
                    <div class="image fit">
                        <img src="images/pic03.jpg" alt="" />
                    </div>
                    <div class="content">Magna sed tempus</div>
                </div>
                <div class="spotlight">
                    <div class="image fit">
                        <img src="images/pic04.jpg" alt="" />
                    </div>
                    <div class="content">Lorem ipsum dolor</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Three -->
<div id="three">
    <div class="wrapper alt special">
        <header class="major">
            <h2>Ante gravida elementum</h2>
            <p>Sed egestas, ante et vulputate volutpat pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum lorem ipsum dolor sit amet consequat hendrerit tortor semper lorem at felis.</p>
        </header>
        <div class="wrapper style3">
            <div class="inner">
                <div class="profiles">
                    <div class="profile">
                        <div class="image">
                            <img src="images/pic05.jpg" alt="" />
                        </div>
                        <div class="content">
                            <h3>Ipsum nullam</h3>
                            <p>Sed egestas, ante et vulputate volutpat pede semper est luctus metus eu augue. Morbi purus amet libero.</p>
                            <ul class="actions">
                                <li>
                                    <a href="#" class="button small">More</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="profile">
                        <div class="image">
                            <img src="images/pic06.jpg" alt="" />
                        </div>
                        <div class="content">
                            <h3>Metus gravida</h3>
                            <p>Sed egestas, ante et vulputate volutpat pede semper est luctus metus eu augue. Morbi purus amet libero.</p>
                            <ul class="actions">
                                <li>
                                    <a href="#" class="button small">More</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="profile">
                        <div class="image">
                            <img src="images/pic07.jpg" alt="" />
                        </div>
                        <div class="content">
                            <h3>Faucibus lorem</h3>
                            <p>Sed egestas, ante et vulputate volutpat pede semper est luctus metus eu augue. Morbi purus amet libero.</p>
                            <ul class="actions">
                                <li>
                                    <a href="#" class="button small">More</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <ul class="actions">
                <li><a href="#" class="button">Learn More</a></li>
            </ul>
        </footer>
    </div>
</div>

<Footer />

<style>
    #map {
        width: 100%;
        height: 32rem;
    }

    .fit {
        width: 80%;
    }

    @media screen and (max-width: 980px) {
        .fit {
            width: 100%;
        }
    }

    #banner {
        background-color: #000000;
        color: #ffffff;
    }

    #banner h1 {
        color: #ffffff;
    }

    #banner ::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.4) !important;
    }

    #banner :-moz-placeholder {
        color: rgba(255, 255, 255, 0.4) !important;
    }

    #banner ::-moz-placeholder {
        color: rgba(255, 255, 255, 0.4) !important;
    }

    #banner :-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.4) !important;
    }

    #banner .wrapper {
        padding-top: 4rem;
    }

    #banner .wrapper > .inner > :last-child {
        margin-bottom: 0;
    }

    #banner .wrapper > .inner > .image {
        -moz-transition: opacity 1s ease-in-out, -moz-transform 1s ease-in-out;
        -webkit-transition: opacity 1s ease-in-out, -webkit-transform 1s ease-in-out;
        -ms-transition: opacity 1s ease-in-out, -ms-transform 1s ease-in-out;
        transition: opacity 1s ease-in-out, transform 1s ease-in-out;
    }

    @media screen and (max-width: 1280px) {
        #banner .wrapper {
            padding-top: 2.5rem;
        }
    }

    body.is-preload #banner .wrapper > .inner > .image {
        -moz-transform: scale(0.9875);
        -webkit-transform: scale(0.9875);
        -ms-transform: scale(0.9875);
        transform: scale(0.9875);
        opacity: 0;
    }
</style>
