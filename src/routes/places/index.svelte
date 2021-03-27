<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("/places/places.json");
        return { props: await res.json() };
    }
</script>

<script>
    export let places = [];

    import { format, parseISO } from "date-fns";
    import { flip } from "svelte/animate";
    import { backOut } from "svelte/easing";
    import _ from "lodash";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { blur } from "svelte/transition";

    let filter = "all";
    const categories = _.uniq(_.flatMap(places, "categories")).sort();

    const sortedPlaces = _.orderBy(places, ["date"], ["desc"]);
    $: filteredPlaces = _.filter(sortedPlaces, ({ categories }) => filter === "all" || _.includes(categories, filter));

    onMount(() => {
        const query = _.last(_.split(window.location, "?"));
        if (query && _.includes(categories, query)) filter = query;
        else filter = "all";
    });
</script>

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1>Places</h1>
                <p>The places we've been, especially those we've loved</p>
            </header>
            <div class="filters">
                <span
                    class={`clickable ${filter === "all" ? "selected" : ""}`}
                    on:click={() => {
                        filter = "all";
                        goto("/places", { noscroll: true });
                    }}>All</span
                >
                {#each categories as category}
                    <span>-</span>
                    <span
                        class={`clickable ${filter === category ? "selected" : ""}`}
                        on:click={() => {
                            filter = category;
                            goto(`/places?${category}`, { noscroll: true });
                        }}>{_.startCase(category)}</span
                    >
                {/each}
            </div>
            <div class={`places-container ${_.size(filteredPlaces) === 2 ? "only-two" : ""}`}>
                {#each filteredPlaces as place, i (place.slug)}
                    <div
                        animate:flip={{ duration: 800, easing: backOut }}
                        class={`
							place 
							${_.size(filteredPlaces) === 1 ? "only-one" : ""}
							${_.size(filteredPlaces) === 2 && i === 1 ? "only-two" : ""}
							${(i + 1) % 3 === 0 ? "iplus1mod3" : ""} 
							${(i + 1) % 2 === 0 ? "iplus1mod2" : ""} 
							${i === 0 || i === 1 || i === 2 ? "first-three" : ""}
							${i === 0 || i === 1 ? "first-two" : ""}
							${i === 0 ? "first" : ""}
							`}
                    >
                        <h3 in:blur={{ duration: 600 }}><a sveltekit:prefetch href={`/places/${place.slug}`}>{place.title}, {place.state}</a></h3>
                        <h6 in:blur={{ duration: 600 }}>{format(parseISO(place.date), "do MMMM yyyy")}</h6>
                        {#if _.isArray(place.categories)}
                            <h5 in:blur={{ duration: 600 }}>
                                {_.join(
                                    _.map(place.categories, cat => _.startCase(cat)),
                                    ", ",
                                )}
                            </h5>
                        {/if}
                        <p in:blur={{ duration: 600 }}>{place.summary}</p>
                        <h6 in:blur={{ duration: 600 }}>by {_.startCase(place.author)}</h6>
                        <a in:blur={{ duration: 600 }} sveltekit:prefetch href={`/places/${place.slug}`} class="button small">Read More</a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .places-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .places-container.only-two {
        justify-content: center;
    }

    .places-container > .place {
        width: calc(100% / 3);
        padding: 2.5rem;
        border-top: dotted 1px rgba(187, 187, 187, 0.3);
        border-right: dotted 1px rgba(187, 187, 187, 0.3);
        will-change: border-color;
        transition: border-color 1s;
    }

    .places-container > .place > h3,
    .places-container > .place > h6 {
        margin-bottom: 0.75rem;
    }
    .places-container > .place > h5,
    .places-container > .place > p {
        margin-bottom: 1rem;
    }
    .places-container > .place > p {
        line-height: 1.6rem;
    }
    .places-container > .place > a {
        margin-top: 1rem;
    }

    @media screen and (min-width: 980px) {
        .places-container > .place.first-three {
            border-top-color: rgba(187, 187, 187, 0);
        }
        .places-container > .place.iplus1mod3 {
            border-right-color: rgba(187, 187, 187, 0);
        }
        .places-container > .place.only-one {
            border-color: rgba(187, 187, 187, 0);
        }
        .places-container > .place.only-two {
            border-right-color: rgba(187, 187, 187, 0);
        }
    }

    @media screen and (max-width: 980px) and (min-width: 736px) {
        .places-container > .place {
            width: 50%;
        }
        .places-container > .place.first-two {
            border-top-color: rgba(187, 187, 187, 0);
        }
        .places-container > .place.iplus1mod2 {
            border-right-color: rgba(187, 187, 187, 0);
        }
    }
    @media screen and (max-width: 736px) {
        .places-container > .place {
            width: 100%;
            padding: 2.5rem;
            border-right-color: rgba(187, 187, 187, 0);
        }
        .places-container > .place.first {
            border-top-color: rgba(187, 187, 187, 0);
        }
    }

    .filters {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 2rem;
        margin-top: -2rem;
    }
    .filters > span {
        margin: 0;
        padding: 0 0.5rem;
        color: var(--primary);
    }
    .filters > span.clickable {
        cursor: pointer;
    }
    .filters > span.selected {
        font-weight: 600;
    }
</style>
