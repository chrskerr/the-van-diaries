<script>
    import { afterUpdate } from "svelte";

    let pathname;
    afterUpdate(() => {
        pathname = window.location.pathname;
    });
</script>

<header id="header" class="alt">
    <a class="logo" href="/">The Van Diaries <span>by Kate & Chris</span></a>
    <nav id="nav">
        <ul>
            <li class={pathname === "/" ? "current" : ""}>
                <a href="/">Map</a>
            </li>
            <li class={pathname === "/places" ? "current" : ""}>
                <a href="/places">Places</a>
            </li>
        </ul>
    </nav>
</header>
