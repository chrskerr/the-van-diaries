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
</script>

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1 class="title">{place.title}, {place.state}</h1>
                <p class="author">by {_.startCase(place.author)}</p>
                {#if place.latLng}
                    <div class="post-header-map">
                        <Map centre={place.latLng} zoom={12} size="small" markers={[place]} preventInteraction={true} />
                    </div>
                {/if}
                <p>{place.summary}</p>
            </header>
            {#if place.image}
                <div class="image right">
                    <img src={place.image} alt="" />
                </div>
            {/if}
            <div class="blog-post-body">
                {@html place.html}
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
</style>
