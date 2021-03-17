<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("/posts/posts.json");
        return { props: await res.json() };
    }
</script>

<script>
    export let posts = [];

    import { format, parseISO } from "date-fns";
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import _ from "lodash";

    const sortedPosts = _.orderBy(posts, ["date"], ["desc"]);
</script>

<Header />

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1>Posts</h1>
                <p>The places we've been, especially those we've loved</p>
            </header>
            <div class="posts-container">
                {#each sortedPosts as post, i}
                    <div class={`post ${i % 2 === 0 ? "left" : ""} ${(posts.length % 2 === 0 ? i === posts.length - 1 || i === posts.length - 2 : i === posts.length - 1) ? "last-row" : ""}`}>
                        <h3>{post.title}</h3>
                        <h6>{format(parseISO(post.date), "do MMMM yyyy")}</h6>
                        <p>{post.summary}</p>
                        <a sveltekit:prefetch href={`/posts/${post.slug}`} class="button small">Read More</a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<Footer />

<style>
    .posts-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .posts-container > .post {
        width: 50%;
        padding: 2.5rem;
        border-bottom: dotted lightgrey 1px;
    }

    .posts-container > .post.last-row {
        border-bottom: none;
    }
    .posts-container > .post.left {
        border-right: dotted lightgrey 1px;
    }

    .posts-container > .post > h4 {
        margin-bottom: 0.75rem;
    }
    .posts-container > .post > h6,
    .posts-container > .post > p {
        margin-bottom: 1rem;
    }
</style>
