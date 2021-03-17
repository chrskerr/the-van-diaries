<script>
    import { afterUpdate } from "svelte";
    import _ from "lodash";

    let pathname;
    afterUpdate(() => {
        pathname = window.location.pathname;
    });

    const _toggleNav = () => {
        document.body.classList.toggle("is-navPanel-visible");
        document.getElementById("navPanel").classList.add("toggleable");
    };

    let navOpen = false;
</script>

<header id="header" class="alt">
    <a class="logo" href="/">The Van Diaries <span>by Kate & Chris</span></a>
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
    <span class="nav-button feather-menu" on:click={_toggleNav} />
</header>

<style>
    .nav-button {
        display: none;
    }

    @media screen and (max-width: 480px) {
        #nav {
            display: none;
        }
        .nav-button {
            display: initial;
        }
    }
</style>
