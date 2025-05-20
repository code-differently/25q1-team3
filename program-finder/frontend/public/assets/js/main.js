/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {
	// Breakpoints.

		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
	window.addEventListener('load', function() {
			window.setTimeout(function() {
			document.body.classList.remove('is-preload');
			}, 100);
		});

	// NavPanel.
		// Button.

	const navButton = document.createElement('div');
	navButton.id = 'navButton';
	navButton.innerHTML = '<a href="#navPanel" class="toggle"></a>';
	document.body.appendChild(navButton);

		// Panel.

	const navPanel = document.createElement('div');
	navPanel.id = 'navPanel';
	const nav = document.getElementById('nav');
	if (nav) {
		navPanel.innerHTML = '<nav>' + nav.innerHTML + '</nav>';
		document.body.appendChild(navPanel);
	}
})();