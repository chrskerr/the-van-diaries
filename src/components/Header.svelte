<script>
    import { afterUpdate } from "svelte";
    let pathname;
    afterUpdate(() => {
        if (window && "location" in window && window.location && "pathname" in window.location) pathname = window.location.pathname;
    });
</script>

<header id="header" class="alt">
    <a class="logo" href="/">The Van Diaries <span>by Kate & Chris</span></a>
    <nav id="nav">
        <ul>
            <li class={pathname === "/" ? "current" : ""}>
                <a href="/">Map</a>
            </li>
            <li class={pathname === "/campsites" ? "current" : ""}>
                <a href="/campsites">Campsites</a>
            </li>
            <li>
                <a href="#" class="dropdown">Dropdown</a>
                <ul>
                    <li class={pathname === "/generic" ? "current" : ""}>
                        <a href="/generic">Generic</a>
                    </li>
                    <li class={pathname === "/elements" ? "current" : ""}>
                        <a href="/elements">Elements</a>
                    </li>
                    <li>
                        <a href="#">Submenu</a>
                        <ul>
                            <li><a href="#">Option One</a></li>
                            <li><a href="#">Option Two</a></li>
                            <li><a href="#">Option Three</a></li>
                            <li><a href="#">Option Four</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</header>
