'format es6';
'use strict';

import $ from 'jquery';

let videoOverlay;
let player;
let close;
let shareURL;

const CLOSE_ANIMATION_TIME = 600;
const ACTIVE_CLASS = 'opened';

const TARGET_ELEMENT_DATA = 'video-btn';
const TARGET_ELEMENT_SELECTOR = `[data-${TARGET_ELEMENT_DATA}]`;

const FB_APP_ID = '';
const EVENT_NAMESPACE = 'lagrange';

function closeVideoPlayer(e) {
	e.preventDefault();

	videoOverlay.removeClass(ACTIVE_CLASS);
	setTimeout(() => {
		player.empty();
	}, CLOSE_ANIMATION_TIME);
}

function openVideoPlayer(e) {
	e.preventDefault();

	const clicked = $(e.currentTarget);
	const isVimeo = clicked.data('is-vimeo');

	const source = isVimeo ? `https://player.vimeo.com/video/${clicked.data(TARGET_ELEMENT_DATA)}` : `https://www.youtube.com/embed/${clicked.data(TARGET_ELEMENT_DATA)}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;
	const html = `<iframe width="100%" height="100%" src="${source}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;

	shareURL = isVimeo ? `https://vimeo.com/${clicked.data(TARGET_ELEMENT_DATA)}` : `http://youtu.be/${clicked.data(TARGET_ELEMENT_DATA)}`;
	
	player.empty().append(html);
	videoOverlay.addClass(ACTIVE_CLASS);
}

export default {
	init() {
		const playerBtns = $(TARGET_ELEMENT_SELECTOR);
		videoOverlay = $(`
			<div class="video-overlay">
				<div class="close">&times;</div>
				<div class="share">
					<div class="facebook share-button" data-facebook data-video-share>
						<i class="facebook icon-facebook"></i>
					</div>
					<div class="twitter share-button" data-twitter data-video-share>
						<i class="twitter icon-twitter"></i>
					</div>
					<div class="linkedin share-button" data-linkedin data-video-share>
						<i class="linkedin icon-linkedin"></i>
					</div>
				</div>
				<div class="player"></div>
			</div>
		`);
		player = videoOverlay.find('.player');
		close = videoOverlay.find('.close');
		
		if (playerBtns.length === 0) return;

		$('body').append(videoOverlay);

		const facebookBtn = $('[data-facebook]', videoOverlay);
		const twitterBtn = $('[data-twitter]', videoOverlay);
		const linkedinBtn = $('[data-linkedin]', videoOverlay);

		facebookBtn.on(`click.${EVENT_NAMESPACE}.video_player`, (e) => {
			e.preventDefault();
		
			const url = `https://www.facebook.com/dialog/share?app_id=${FB_APP_ID}&display=popup&href=${shareURL}`;
			window.open(url, 'Partager', 'width=520,height=570');
		});

		twitterBtn.on(`click.${EVENT_NAMESPACE}.video_player`, (e) => {
			e.preventDefault();

			const url = `https://twitter.com/intent/tweet/?url=${shareURL}`;
			window.open(url, 'Partager', 'width=560,height=250');
		});

		linkedinBtn.on(`click.${EVENT_NAMESPACE}.video_player`, (e) => {
			e.preventDefault();

			const url = `https://www.linkedin.com/cws/share?url=${shareURL}`;
			window.open(url, 'Partager', 'width=520,height=570');
		});

		close.on(`click.${EVENT_NAMESPACE}.video_player`, closeVideoPlayer);
		playerBtns.on(`click.${EVENT_NAMESPACE}.video_player`, openVideoPlayer);
	},
};
