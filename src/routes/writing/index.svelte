<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("/writing/writing.json");
        return { props: await res.json() };
    }
</script>

<script>
    export let writing = [];

    import { format, parseISO } from "date-fns";
    import { flip } from "svelte/animate";
    import { backOut } from "svelte/easing";
    import _ from "lodash";
    import { blur } from "svelte/transition";

    const sortedWriting = _.orderBy(writing, ["date"], ["desc"]);
</script>

<div id="main">
    <div class="wrapper">
        <div class="inner">
            <header class="major">
                <h1>Writing</h1>
                <p>Anything we'd like to write about</p>
            </header>
            <div class={`writing-container ${_.size(sortedWriting) === 2 ? "only-two" : ""}`}>
                {#each sortedWriting as { slug, title, date, summary, author }, i (slug)}
                    <div
                        animate:flip={{ duration: 800, easing: backOut }}
                        class={`
							piece 
							${_.size(writing) === 1 ? "only-one" : ""}
							${_.size(writing) === 2 && i === 1 ? "only-two" : ""}
							${(i + 1) % 3 === 0 ? "iplus1mod3" : ""} 
							${(i + 1) % 2 === 0 ? "iplus1mod2" : ""} 
							${i === 0 || i === 1 || i === 2 ? "first-three" : ""}
							${i === 0 || i === 1 ? "first-two" : ""}
							${i === 0 ? "first" : ""}
							`}
                    >
                        <h3 in:blur={{ duration: 600 }}><a sveltekit:prefetch href={`/writing/${slug}`}>{title}</a></h3>
                        <h6 in:blur={{ duration: 600 }}>{format(parseISO(date), "do MMMM yyyy")}</h6>
                        <p in:blur={{ duration: 600 }}>{summary}</p>
                        <h6 in:blur={{ duration: 600 }}>by {_.startCase(author)}</h6>
                        <a in:blur={{ duration: 600 }} sveltekit:prefetch href={`/writing/${slug}`} class="button small">Read More</a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .writing-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .writing-container.only-two {
        justify-content: center;
    }

    .writing-container > .piece {
        width: calc(100% / 3);
        padding: 2.5rem;
        border-top: dotted 1px rgba(187, 187, 187, 0.3);
        border-right: dotted 1px rgba(187, 187, 187, 0.3);
        will-change: border-color;
        transition: border-color 1s;
    }

    .writing-container > .piece > h3,
    .writing-container > .piece > h6 {
        margin-bottom: 0.75rem;
    }
    .writing-container > .piece > p {
        margin-bottom: 1rem;
    }
    .writing-container > .piece > p {
        line-height: 1.6rem;
    }
    .writing-container > .piece > a {
        margin-top: 1rem;
    }

    @media screen and (min-width: 980px) {
        .writing-container > .piece.first-three {
            border-top-color: rgba(187, 187, 187, 0);
        }
        .writing-container > .piece.iplus1mod3 {
            border-right-color: rgba(187, 187, 187, 0);
        }
        .writing-container > .piece.only-one {
            border-color: rgba(187, 187, 187, 0);
        }
        .writing-container > .piece.only-two {
            border-right-color: rgba(187, 187, 187, 0);
        }
    }

    @media screen and (max-width: 980px) and (min-width: 736px) {
        .writing-container > .piece {
            width: 50%;
        }
        .writing-container > .piece.first-two {
            border-top-color: rgba(187, 187, 187, 0);
        }
        .writing-container > .piece.iplus1mod2 {
            border-right-color: rgba(187, 187, 187, 0);
        }
    }
    @media screen and (max-width: 736px) {
        .writing-container > .piece {
            width: 100%;
            padding: 2.5rem;
            border-right-color: rgba(187, 187, 187, 0);
        }
        .writing-container > .piece.first {
            border-top-color: rgba(187, 187, 187, 0);
        }
    }
</style>
