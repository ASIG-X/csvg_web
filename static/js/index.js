window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function () {
	// Check for click events on the navbar burger icon

	var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
	}

	// Initialize carousel only if the library is available
	try {
		if (typeof bulmaCarousel !== 'undefined') {
			var carousels = bulmaCarousel.attach('.carousel', options);
		}
	} catch (e) {
		console.log('Carousel library not loaded, skipping carousel initialization');
	}

	try {
		if (typeof bulmaSlider !== 'undefined') {
			bulmaSlider.attach();
		}
	} catch (e) {
		console.log('Slider library not loaded, skipping slider initialization');
	}

	/* COMMENTED OUT - Mobile navbar burger menu (navbar removed)
	$('.navbar-burger').on('click', function () {
		$('.navbar-burger').toggleClass('is-active');
		$('.navbar-menu').toggleClass('is-active');
	});

	$('.navbar-item').on('click', function () {
		if ($(window).width() <= 1023) {
			$('.navbar-burger').removeClass('is-active');
			$('.navbar-menu').removeClass('is-active');
		}
	});
	*/

	// Sidebar toggle functionality - works differently on desktop vs mobile
	$('#sidebar').on('click', function (e) {
		// Only trigger if the click was directly on the sidebar element or sidebar-content
		// (not on a link, icon, logo or other interactive element)
		if ((e.target === this || $(e.target).hasClass('sidebar-content')) &&
			!$(e.target).closest('a, i, img, .sidebar-link, .sidebar-logo, .sidebar-separator').length) {

			const sidebar = $(this);

			// Always toggle sidebar expansion state
			sidebar.toggleClass('expanded');

			// Only adjust content margins on desktop
			if ($(window).width() > 1023) {
				const mainContent = $('.main-content');
				const heroSections = $('.hero');
				const sections = $('.section');
				const footer = $('.footer');

				mainContent.toggleClass('expanded');
				heroSections.toggleClass('expanded');
				sections.toggleClass('expanded');
				footer.toggleClass('expanded');
			}
		}
	});

	// Smooth scrolling for sidebar links
	$('.sidebar-link').on('click', function (e) {
		// Check if this is an external link
		if ($(this).hasClass('external-link')) {
			// Let the browser handle the navigation naturally
			return true;
		}

		// Handle internal scrolling
		e.preventDefault();

		const target = $(this).attr('href');
		const targetElement = $(target);

		if (targetElement.length) {
			const offsetTop = $(window).width() <= 1023 ? 20 : 80;

			// Stop any ongoing animations to prevent delay
			$('html, body').stop();

			$('html, body').animate({
				scrollTop: targetElement.offset().top - offsetTop
			}, 400);
		}

		// Update active link
		$('.sidebar-link').removeClass('active');
		$(this).addClass('active');
	});

	// Highlight active section on scroll (desktop only)
	$(window).on('scroll', function () {
		if ($(window).width() > 1023) { // Only on desktop where sidebar is visible
			const scrollPos = $(window).scrollTop() + 100;

			$('.sidebar-link').each(function () {
				const link = $(this);
				const section = $(link.attr('href'));

				if (section.length && section.offset().top <= scrollPos &&
					section.offset().top + section.outerHeight() > scrollPos) {
					$('.sidebar-link').removeClass('active');
					link.addClass('active');
				}
			});
		}
	});

	// Close sidebar on mobile when clicking outside
	$(document).on('click', function (e) {
		const sidebar = $('#sidebar');

		// If sidebar is not the target and doesn't contain the target
		if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
			sidebar.removeClass('expanded');

			// Only adjust content margins on desktop
			if ($(window).width() > 1023) {
				$('.main-content').removeClass('expanded');
				$('.hero').removeClass('expanded');
				$('.section').removeClass('expanded');
				$('.footer').removeClass('expanded');
			}
		}
	});

	// Handle window resize to remove expanded classes on very small screens
	$(window).on('resize', function () {
		if ($(window).width() <= 600) {
			$('#sidebar').removeClass('expanded');

			// Only reset content margins if not on mobile
			if ($(window).width() > 1023) {
				$('.main-content').removeClass('expanded');
				$('.hero').removeClass('expanded');
				$('.section').removeClass('expanded');
				$('.footer').removeClass('expanded');
			}
		}
	});
});

