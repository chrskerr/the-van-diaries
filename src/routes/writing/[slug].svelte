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
    export let piece;
    import _ from "lodash";

    const { author, title, summary, image, html } = piece;
</script>

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1 class="title">{title}</h1>
                {#if author}<p class="author">by {_.startCase(author)}</p>{/if}
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
