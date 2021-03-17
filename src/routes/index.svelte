<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("./posts/posts.json");
        return { props: await res.json() };
    }
</script>

<script>
    export let posts = [];

    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import Map from "$components/Map.svelte";
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
        <Map zoom={4} centre={[-27, 134]} size="large" markers={posts} />
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
    .map-container-wrapper {
        padding-bottom: 4rem;
        background-color: #20c5e7;
    }

    .map-container {
        width: 80%;
        margin: 0 auto;
    }

    @media screen and (max-width: 980px) {
        .map-container {
            width: 100%;
        }
    }
</style>
