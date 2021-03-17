<script context="module">
    export async function load({ page, fetch }) {
        const url = `/posts/${page.params.slug}.json`;
        const res = await fetch(url);

        if (res.ok) {
            return {
                props: await res.json(),
            };
        }

        return {
            status: 301,
            redirect: "/posts",
        };
    }
</script>

<script>
    export let post;

    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import Map from "$components/Map.svelte";
</script>

<Header />

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1>{post.title}</h1>
                <div class="post-header-map">
                    <Map centre={post.latLng} zoom={12} size="small" markers={[post]} preventInteraction={true} />
                </div>
                <p>{post.summary}</p>
            </header>
            {#if post.image}
                <div class="image right">
                    <img src={post.image} alt="" />
                </div>
            {/if}
            {@html post.html}
        </div>
    </div>
</div>

<Footer />

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
    }
    .image > img {
        height: 100%;
        max-height: 20rem;
        object-fit: cover;
        object-position: center center;
    }
</style>
