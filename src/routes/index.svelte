<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("/places/places.json");
        return { props: await res.json() };
    }
</script>

<script>
    export let places = [];

    import Map from "$components/Map.svelte";

    let width;
    import { onMount } from "svelte";
    onMount(() => {
        width = window.innerWidth;
    });
</script>

<div id="banner">
    <div class="wrapper style1 special">
        <div class="inner">
            <h1 class="heading alt">The Van Diaries</h1>
            <p>A guide to exploring Australia by van, and helping others share our adventure</p>
        </div>
    </div>
</div>
<div class="map-container-wrapper">
    <div class="map-container">
        <Map zoom={width && width < 980 ? 3 : 4} centre={[-27, 134]} size="large" markers={places} />
    </div>
</div>

<div id="one">
    <div class="wrapper special">
        <div class="inner">
            <header class="major">
                <h2>The Rocketship</h2>
            </header>
            <div class="image fit special">
                <img src="images/rocketship-small.jpg" alt="Chris and Kate to the van" />
            </div>
            <p class="special">We bought our Ford Transit early 2020 and took the year custom fitting it in preparation for a major adventure!</p>
            <p class="special">Built to feel more like a loungeroom than your typical van conversion, we wanted our van to feel like a tiny home on wheels without any comprises to comfort, and with an excessive amount of power to allow for our digital nomad lifestyle (yes, you absolutely can live & work successfully on the road!).</p>
            <p class="special">Officially hitting the road late January 2021, we've learnt A LOT about how to find the best spots to sleep and relax while on the road, working remotely from The Rocketship and staying fit along the way.</p>
        </div>
    </div>
</div>

<div id="two">
    <div class="wrapper style2">
        <div class="inner">
            <div class="spotlights">
                <div class="intro">
                    <header>
                        <h2 class="left">Who are we?</h2>
                        <p class="left">We're an Aussie couple who left our office jobs and easy lives in Manly, Sydney to pursue a life that allows us maximum freedom, adventure, Vitamin D and happiness every single day.</p>
                        <p class="left"><strong>Meet Kate</strong> - if she's not training for her next obstacle course race (think trail running with ninja warrior style moves along the way) or strumming & singing her fave tune on the ukelele, she's busy working as the marketing brains for a SMB and just generally being loud.</p>
                        <p class="left"><strong>Meet Chris</strong> - a lover of all things technology, Chris has a newfound love for mountain bike riding and tearing up the trails, a longstanding love for wine & chocolate, and keeps himself busy tip tapping away on computer programming work or amusing himself tickling Kate.</p>
                    </header>
                </div>
                <div class="spotlight">
                    <div class="image fit">
                        <img src="images/kate.jpg" alt="Kate Hobbs" />
                    </div>
                    <div class="content">Kate Hobbs</div>
                    <div class="image fit">
                        <img src="images/chris.jpg" alt="Chris Kerr" />
                    </div>
                    <div class="content">Chris Kerr</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="three">
    <div class="wrapper alt special">
        <header class="major pb-0">
            <h2>Our Writing</h2>
            <p>Our Van Diaries have been created to let you in on the best camping spots around Australia (please note we are stingy so this is essentially your ultimate guide to free camping), mountain bike parks and other generally useful van life info. Use the <strong>map function & filter</strong> to search for categorised info near you, or simply scroll through our blog for inspiration.></p>
        </header>
        <div class="wrapper style3 pt-0">
            <div class="inner">
                <div class="profiles">
                    <div class="profile">
                        <div class="image">
                            <img src="images/chris-weights-derby.jpg" alt="Chris sitting on the ground in front of van" />
                        </div>
                        <div class="content">
                            <h3>Free Camping</h3>
                            <p>Finding the best spots to set up camp and relax, while not needing to dip into your pockets can be hard. Especially if you're after facilities such as running water, toilets & showers and simply a nice place to be. Lucky for you, we've now done the work and want to share everything we know!</p>
                            <ul class="actions">
                                <li>
                                    <a svelte:preload href="/places?free-camping" class="button small">More</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="profile">
                        <div class="image">
                            <img src="images/kate-mtb-derby.jpg" alt="Kate holding her bike up on Derby trails" />
                        </div>
                        <div class="content">
                            <h3>Mountain Bike Riding</h3>
                            <p>Why is it so hard to find any useful information on MTB trails in Australia?! Sure, there's TrailForks for a basic map of trails, but how do you know if they're actually going to be any good when you get there? We're busy exploring the best of Australia's MTB trails and filling you in!</p>
                            <ul class="actions">
                                <li>
                                    <a svelte:preload href="/places?mountain-biking" class="button small">More</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="profile">
                        <div class="image">
                            <img src="images/van-life-hacks-castlemaine.jpg" alt="Chris and Kate working next to the van" />
                        </div>
                        <div class="content">
                            <h3>Van Life Hacks</h3>
                            <p>We feel like we are getting really good at living an unbelievably comfortable and relaxing life on the road, but it did nto happen overnight. Read our tips & tricks to ensure you are set up for the best van life experience over the long term.</p>
                            <ul class="actions">
                                <li>
                                    <a svlete:preload href="/writing" class="button small">More</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    #banner {
        background-color: var(--primary);
    }

    .map-container-wrapper {
        padding-bottom: 4rem;
        background-color: var(--primary);
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
    .spotlight {
        box-shadow: none;
    }
    .spotlight > .content {
        margin-bottom: 2rem;
    }
    .pt-0 {
        padding-top: 0;
    }
    .pb-0 {
        padding-bottom: 0;
    }
</style>
