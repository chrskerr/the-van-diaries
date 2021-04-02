<script context="module">
    export async function load({ page, fetch }) {
        const url = `/places/${page.params.slug}.json`;
        const res = await fetch(url);

        if (res.ok) {
            return {
                props: await res.json(),
            };
        }

        return {
            status: 301,
            redirect: "/places",
        };
    }
</script>

<script>
    export let place;
    import Map from "$components/Map.svelte";
    import _ from "lodash";

    import ratingsMap from "../../ratings";

    const { title, state, latLng, summary, image, html, rating } = place;

    $: ratingText = _.get(ratingsMap, rating);
</script>

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1 class="title">{title}, {state}</h1>
                <div class="ratings">
                    <span class={`${place.rating >= 1 ? "feather-star-full" : "feather-star-empty"}`} />
                    <span class={`${place.rating >= 2 ? "feather-star-full" : "feather-star-empty"}`} />
                    <span class={`${place.rating >= 3 ? "feather-star-full" : "feather-star-empty"}`} />
                </div>
                <p class="rating-text">{ratingText}</p>
                {#if latLng}
                    <div class="post-header-map">
                        <Map centre={latLng} zoom={12} size="small" markers={[place]} preventInteraction={true} />
                    </div>
                {/if}
                <p>{summary}</p>
            </header>
            {#if image}
                <div class="image right">
                    <img src={image} alt={title} />
                </div>
            {/if}
            <div class="blog-post-body">
                {@html html}
            </div>
        </div>
    </div>
</div>

<style>
    .major > p {
        font-size: 1.5rem;
    }
    .major > .post-header-map {
        margin: 0 0 2rem 0;
    }
    .inner {
        overflow: auto;
    }
    .image {
        max-height: 20rem;
        min-width: 20rem;
        max-width: 45%;
    }
    .image > img {
        height: 100%;
        max-height: 20rem;
        object-fit: cover;
        object-position: center center;
    }

    .title {
        margin-bottom: 0;
    }

    .author::after {
        content: unset;
    }

    @media screen and (max-width: 480px) {
        .image {
            min-width: 100%;
            max-width: 100%;
        }
    }

    .ratings {
        margin-top: 1.5rem;
    }
    .rating-text {
        margin-bottom: 1.5rem;
        font-style: italic;
    }
    .rating-text::after {
        content: unset;
    }
    .feather-star {
        font-size: 125%;
    }
</style>
