<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("/places/places.json");
        return { props: await res.json() };
    }
</script>

<script>
    export let places = [];

    import { format, parseISO } from "date-fns";
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import _ from "lodash";

    const sortedPlaces = _.orderBy(places, ["date"], ["desc"]);
</script>

<Header />

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1>Places</h1>
                <p>The places we've been, especially those we've loved</p>
            </header>
            <div class="places-container">
                {#each sortedPlaces as place, i}
                    <div class={`place ${i % 2 === 0 ? "left" : ""} ${(places.length % 2 === 0 ? i === places.length - 1 || i === places.length - 2 : i === places.length - 1) ? "last-row" : ""}`}>
                        <h3><a sveltekit:prefetch href={`/places/${place.slug}`}>{place.title}</a></h3>
                        <h6>{format(parseISO(place.date), "do MMMM yyyy")}</h6>
                        {#if place.categories}
                            <h5>
                                {_.join(
                                    _.map(place.categories, cat => _.startCase(cat)),
                                    ", ",
                                )}
                            </h5>
                        {/if}
                        <p>{place.summary}</p>
                        <a sveltekit:prefetch href={`/places/${place.slug}`} class="button small">Read More</a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<Footer />

<style>
    * {
        animation: fadein 250ms;
    }

    .places-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .places-container > .place {
        width: 50%;
        padding: 2.5rem;
        border-bottom: dotted lightgrey 1px;
    }

    .places-container > .place.last-row {
        border-bottom: none;
    }
    .places-container > .place.left {
        border-right: dotted lightgrey 1px;
    }

    .places-container > .place > h3,
    .places-container > .place > h6 {
        margin-bottom: 0.75rem;
    }
    .places-container > .place > h5,
    .places-container > .place > p {
        margin-bottom: 1rem;
    }

    @media screen and (max-width: 980px) {
        .places-container > .place {
            width: 100%;
            padding: 2.5rem;
            border-right: none !important;
            border-bottom: dotted lightgrey 1px;
        }
        .places-container > .place:last-child {
            border-bottom: none;
        }
    }
</style>
