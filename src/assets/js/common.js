// external js: flickity.pkgd.js

// Add this code:

Flickity.createMethods.push('_createPrevNextCells');

Flickity.prototype._createPrevNextCells = function() {
	this.on('select', this.setPrevNextCells);
};

Flickity.prototype.setPrevNextCells = function() {
	// remove classes
	changeSlideClasses(this.previousSlide, 'remove', 'is-prev');
	changeSlideClasses(this.nextSlide, 'remove', 'is-next');
	// set slides
	this.previousSlide = this.slides[(this.selectedIndex - 1 + this.slides.length) % this.slides.length];
	this.nextSlide = this.slides[(this.selectedIndex + 1 + this.slides.length) % this.slides.length];
	// add classes
	changeSlideClasses(this.previousSlide, 'add', 'is-prev');
	changeSlideClasses(this.nextSlide, 'add', 'is-next');
};

function changeSlideClasses(slide, method, className) {
	if (!slide) {
		return;
	}
	slide.getCellElements().forEach(function(cellElem) {
		cellElem.classList[method](className);
	});
}

class RyderMarquee {
	constructor(el, direct = 0) {
		this.hero = $(el).parent().get(0)
		this.wrapper = el
		this.delta = 0
		this.transform = 0
		this.step = (device == 'mobile') ? 0.6 : 0.8
		this.direct = direct % 2
		this.hover = false

		if (this.direct == 1) {
			this.wrapper.style.transform = `translate3d(-${this.wrapper.getBoundingClientRect().width / 2}px, 0, 0)`;
			this.transform = -this.wrapper.getBoundingClientRect().width / 2
		}

		// $(el).hover(() => {
		// 	this.hover = true
		// }, () => {
		// 	this.hover = false
		// })
	}

	animate() {
		if (!this.hover) {
			this.transform += this.step
		}

		if (this.direct == 1) {
			if (this.transform > 0) {
				this.transform = -this.wrapper.getBoundingClientRect().width / 2;
			}
			this.wrapper.style.transform = `translate3d(${this.transform}px, 0, 0)`;
		} else {
			if (this.transform > this.wrapper.getBoundingClientRect().width / 2) {
				this.transform = 0;
			}
			this.wrapper.style.transform = `translate3d(-${this.transform}px, 0, 0)`;
		}
	}

	render() {
		this.scrollY = $(window).scrollTop()

		const bounding = this.hero.getBoundingClientRect();
		const distance = (window.innerHeight + this.scrollY) - (bounding.top + this.scrollY);
		const percentage = distance / ((window.innerHeight + bounding.height) / 100);

		if (percentage > 0 && percentage < 100) {
			this.animate();
		}
	}

	create() {
		gsap.ticker.add(this.render.bind(this));
	}
}




$(window).on("resize", function() {
	if ($(this).width() > 1025) {
		if (window.device == 'mobile') {
			location.reload()
		}
		window.device = 'desktop';
	} else {
		if (window.device == 'desktop') {
			location.reload()
		}
		window.device = 'mobile';
	}
}).trigger("resize")





$("[data-share]").each((i, el) => {
	var type = el.dataset.share
	$(el).click(function(e) {
		e.preventDefault();

		var winHeight = 360;
		var winWidth = 600;
		var winTop = (screen.height / 2) - (winHeight / 2);
		var winLeft = (screen.width / 2) - (winWidth / 2);
		var url = $(this).attr("href");

		if (type == "facebook") {
			window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
		} else if (type == "twitter") {
			window.open('https://twitter.com/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
		} else if (type == "pinterest") {
			window.open('https://www.pinterest.com/pin/create/button/?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
		} else if (type == "googleplus") {
			window.open('https://plus.google.com/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
		} else if (type == "linkedin") {
			window.open('https://www.linkedin.com/cws/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
		} else if (type == "weibo") {
			window.open('https://service.weibo.com/share/share.php?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
		} else if (type == "line") {
			window.open('https://line.naver.jp/R/msg/text/?' + url);
		} else if (type == "copy") {
			copy(url)
			alert("連結已複製完成!");
		}
	});
});
function copy(s) {
	var clip_area = document.createElement('textarea');
	clip_area.textContent = s;

	document.body.appendChild(clip_area);
	clip_area.select();

	document.execCommand('copy');
	clip_area.remove();
}




$("[data-r]").each(function(i, el) {

	if (device == 'mobile' && $(el).data("mobile-r") != undefined) {
		var _p = $(el).data("mobile-r")
	} else {
		var _p = $(el).data("r")
	}

	var _st_default = {
		trigger: el,
		start: "top 80%",
		end: "bottom 0%",
		toggleActions: "play none play none",
		// toggleActions: "play reverse play reverse",
		// markers: true,
	}

	var _st = Object.assign(_st_default, _p.scrollTrigger)

	var _t = $(el).offset().top
	var _hook = $(window).height() * _st.start.replace(/[^0-9]/g, '') / 100

	if (_t <= _hook) {
		_p.delay = (_p.delay != undefined) ? _p.delay += 1.5 : 1.5
	}

	delete _p.scrollTrigger

	var _setting = {
		scrollTrigger: _st,
		duration: 2,
		opacity: 0,
		ease: "power2.out",
	}

	if (_p != '' && "stagger" in _p) {
		var $el = $(el).children()
	} else {
		var $el = el
	}

	var _obj = Object.assign(_setting, _p);

	gsap.from($el, _obj);
})





$(window).on("load", function() {
	$("#preload").fadeOut(300)

	gsap.delayedCall(.5, () => {
		ScrollTrigger.refresh();
	});
})