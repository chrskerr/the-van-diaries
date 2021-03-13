
<script>
	import _ from "lodash";
	const pathname = _.get( window, 'location.pathname' );
</script>

<header id="header" class="alt">
	<a class="logo" href="index.html">Inverse <span>by Pixelarity</span></a>
	<nav id="nav">
		<ul>
			<li class={ pathname === "/" ? "current" : "" }><a href="/">Home</a></li>
			<li>
				<a href="#" class="dropdown">Dropdown</a>
				<ul>
					<li><a href="#">Option One</a></li>
					<li><a href="#">Option Two</a></li>
					<li><a href="#">Option Three</a></li>
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
			<li class={ pathname === "/generic" ? "current" : "" }><a href="/generic">Generic</a></li>
			<li class={ pathname === "/elements" ? "current" : "" }><a href="/elements">Elements</a></li>
		</ul>
	</nav>
</header>