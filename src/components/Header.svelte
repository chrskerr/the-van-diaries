<script>
    import { afterUpdate, onMount } from "svelte";
    import _ from "lodash";

    let pathname;
    afterUpdate(() => {
        pathname = window.location.pathname;
    });

    let width;
    onMount(() => {
        width = window.innerWidth;
        window.addEventListener("resize", () => (width = window.innerWidth));
    });

    let navOpen = false;
</script>

<header id="header" class="alt">
    <a class="logo" href="/">The Van Diaries <span>by Kate & Chris</span></a>
    {#if !width || width > 980}
        <nav id="nav">
            <ul>
                <li class={pathname === "/" ? "current" : ""}>
                    <a href="/">Map</a>
                </li>
                <li class={_.startsWith(pathname, "places") ? "current" : ""}>
                    <a href="/places">Places</a>
                </li>
            </ul>
        </nav>
    {:else}
        <span class="nav-button feather-menu" on:click={() => (navOpen = !navOpen)}>
            <div id="navPanel" class={navOpen ? "open" : ""}>
                <span class="nav-close feather-x" />
                <nav>
                    <a class="link depth-0" href="/">Map</a>
                    <a class="link depth-0" href="/places">Places</a>
                </nav>
            </div>
        </span>
        {#if navOpen}
            <div class="nav-overlay" on:click={() => (navOpen = !navOpen)} />
        {/if}
    {/if}
</header>

<style>
    #navPanel {
        text-align: left;
    }

    .nav-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: white;
    }

    #navPanel.open {
        transform: translateX(0%);
        visibility: initial;
    }

    .nav-overlay {
        position: absolute;
        top: 0;
        bottom: -100vh;
        left: 0;
        right: 0;
        z-index: 100;
    }
</style>
