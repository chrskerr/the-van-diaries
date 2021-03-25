<script>
    import { afterUpdate } from "svelte";
    import { blur } from "svelte/transition";
    import _ from "lodash";
    import { browser } from "$app/env";

    let pathname = browser ? window.location.pathname : null;
    afterUpdate(() => {
        pathname = window.location.pathname;
    });

    let navOpenCounter = 0;
</script>

<header id="header" class="alt">
    <a class="logo" href="/">The Van Diaries <span>by Kate & Chris</span></a>
    <nav id="nav">
        <ul>
            <li class={pathname === "/" ? "current" : ""}>
                <a href="/">Map</a>
            </li>
            <li class={_.startsWith(pathname, "/places") ? "current" : ""}>
                <a href="/places">Places</a>
            </li>
        </ul>
    </nav>
    <span class="nav-button feather-menu" on:click={() => navOpenCounter++} />
    <div id="navPanel" class={`${navOpenCounter > 0 ? "toggleable" : ""} ${navOpenCounter % 2 === 0 ? "" : "is-navPanel-visible"}`}>
        <span class="close feather-x" on:click={() => navOpenCounter++} />
        <nav>
            <a class="link depth-0" href="/" on:click={() => navOpenCounter++}>Map</a>
            <a class="link depth-0" href="/places" on:click={() => navOpenCounter++}>Places</a>
        </nav>
    </div>
    <div class={`navPanel-overlay ${navOpenCounter % 2 === 0 ? "" : "is-navPanel-visible"}`} on:click={() => navOpenCounter++} />
</header>

{#key pathname}
    <div in:blur>
        <slot />
    </div>
{/key}

<div id="footer">
    <div class="wrapper style2">
        <div class="copyright">&copy; Kate & Chris. All rights reserved and other similar stuff.</div>
    </div>
</div>

<style>
    .nav-button {
        display: none;
    }

    .navPanel-overlay {
        position: absolute;
        display: none;
        top: 0;
        bottom: -100vh;
        left: 0;
        right: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, 0.35);
    }
    .navPanel-overlay.is-navPanel-visible {
        display: initial;
    }

    @media screen and (max-width: 480px) {
        #nav {
            display: none;
        }
        .nav-button {
            display: initial;
        }
    }

    #footer > .wrapper {
        padding-top: 2.5rem;
    }

    #footer > .wrapper > .copyright {
        margin-top: 0;
        padding: 2rem 2rem;
    }
</style>
