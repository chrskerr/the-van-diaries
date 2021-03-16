<script>
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";

    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<Header />

<!-- One -->
<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1>Campsites</h1>
                <p>Elit massa nisl elementum lorem ipsum dolor sit consequat</p>
            </header>
            <div class="image main">
                <img src="images/pic01.jpg" alt="" />
            </div>
            <div class="posts-container">
                {#each posts as post, i}
                    <div class={`post ${i % 2 === 0 ? "left" : ""} ${(posts.length % 2 === 0 ? i === posts.length - 1 || i === posts.length - 2 : i === posts.length - 1) ? "last-row" : ""}`}>
                        <h4>Post {post}</h4>
                        <h6>Date...</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed at molestiae odio, consectetur iste reiciendis delectus aut aperiam quae omnis dolore asperiores eveniet mollitia iusto quia ad quas, non modi?</p>
                        <a href={`/posts/${post}`} class="button small">Read More</a>
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
