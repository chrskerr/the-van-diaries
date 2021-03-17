<script context="module">
    export async function load({ page, fetch }) {
        const url = `/writing/${page.params.slug}.json`;
        const res = await fetch(url);

        if (res.ok) {
            return {
                props: await res.json(),
            };
        }

        return {
            status: 301,
            redirect: "/writing",
        };
    }
</script>

<script>
    export let place;

    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import Map from "$components/Map.svelte";
</script>

<Header />

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1>{place.title}</h1>
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
            {@html place.html}
        </div>
    </div>
</div>

<Footer />

<style>
    * {
        animation: fadein 250ms;
    }

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
    }
    .image > img {
        height: 100%;
        max-height: 20rem;
        object-fit: cover;
        object-position: center center;
    }
</style>
