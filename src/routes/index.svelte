<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("/places/places.json");
        return { props: await res.json() };
    }
</script>

<script>
    export let places = [];

    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import Map from "$components/Map.svelte";

    let width;
    import { onMount } from "svelte";
    onMount(() => {
        width = window.innerWidth;
    });
</script>

<Header />

<!-- Banner -->
<div id="banner">
    <div class="wrapper style1 special">
        <div class="inner">
            <h1 class="heading alt">The Van Diaries</h1>
            <p>Remembering where we've been, and helping others share our adventure</p>
        </div>
    </div>
</div>
<div class="map-container-wrapper">
    <div class="map-container">
        <Map zoom={width && width < 980 ? 3 : 4} centre={[-27, 134]} size="large" markers={places} />
    </div>
</div>

<!-- One -->
<div id="one">
    <div class="wrapper special">
        <div class="inner">
            <header class="major">
                <h2>The Rocketship</h2>
            </header>
            <div class="image fit special">
                <img src="images/rocketship-small.jpg" alt="" />
            </div>
            <p class="special">We bought our Ford Transit early 2020 and took the year custom fitting it in preparation for a major adventure!</p>
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
                        <h2 class="left">Us</h2>
                        <p class="left">Sed egestas, ante et vulputate volutpat pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing.</p>
                    </header>
                </div>
                <div class="spotlight">
                    <div class="image fit">
                        <img src="images/kate.jpg" alt="Kate Hobbs" />
                    </div>
                    <div class="content">Kate Hobbs</div>
                </div>
                <div class="spotlight">
                    <div class="image fit">
                        <img src="images/chris.jpg" alt="Chris Kerr" />
                    </div>
                    <div class="content">Chris Kerr</div>
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
    </div>
</div>

<Footer />

<style>
    * {
        animation: fadein 250ms;
    }

    #banner {
        background-color: #20c5e7;
    }

    .map-container-wrapper {
        padding-bottom: 4rem;
        background-color: #20c5e7;
    }

    .map-container {
        width: 80%;
        max-width: 85vw;
        margin: 0 auto;
    }

    @media screen and (max-width: 980px) {
        .map-container {
            width: 100%;
        }
    }

    .image img {
        max-height: 14rem;
        object-fit: cover;
        object-position: center center;
    }
</style>
