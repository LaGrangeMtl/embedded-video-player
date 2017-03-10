'format es6';
'use strict';

import $ from 'jquery';

let videoOverlay;
let player;
let close;
let events;

const ACTIVE_CLASS = 'opened';

const TARGET_ELEMENT_DATA = 'video-btn';
const TARGET_ELEMENT_SELECTOR = `[data-${TARGET_ELEMENT_DATA}]`;
const EVENT_NAMESPACE = 'lagrange';
const PLAYER_DONE = 0;

const playerBtns = $(TARGET_ELEMENT_SELECTOR);

/* Open Close fonction */
function openVideoPlayer(e) {
	e.preventDefault();

	const clicked = $(e.currentTarget);
	player.loadVideoById(`${clicked.data(TARGET_ELEMENT_DATA)}`);
	
	videoOverlay.addClass(ACTIVE_CLASS);
	events.target.playVideo();
}

function closeVideoPlayer(e) {
	e.preventDefault();

	player.stopVideo();
	videoOverlay.removeClass(ACTIVE_CLASS);
}

/* fonction reliée a Youtube */
function onPlayerReady(event) {
	events = event;
	
	close.on(`click.${EVENT_NAMESPACE}.video_player`, closeVideoPlayer);
	playerBtns.on(`click.${EVENT_NAMESPACE}.video_player`, openVideoPlayer);
}

function onPlayerStateChange(event) {
	if (event.data === PLAYER_DONE) {
		player.stopVideo();
		videoOverlay.removeClass(ACTIVE_CLASS);
	}
}

export default {
	init() {
		videoOverlay = $(`
			<div class="video-overlay">
				<div class="close">&times;</div>
				<div id="player" class="player"></div>
			</div>
		`);
		player = videoOverlay.find('.player');
		close = videoOverlay.find('.close');
		
		if (playerBtns.length === 0) return;

		$('body').append(videoOverlay);

		// 2. This code loads the IFrame Player API code asynchronously.
		const tag = document.createElement('script');

		tag.src = 'https://www.youtube.com/iframe_api';
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// 3. This function creates an <iframe> (and YouTube player)
		//    after the API code downloads.
		window.onYouTubeIframeAPIReady = () => {
			player = new YT.Player('player', {
				playerVars: {
					rel: 0,
					modestbranding: 1,
					showinfo: 0,
				},
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				},
			});
		};
	},
};
