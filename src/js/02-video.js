import Player from '@vimeo/player';
import trottle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTime = function getCurrentTime(event) {
  const time = event.seconds;
  localStorage.setItem('videoplayer-current-time', time);
};

player.on('timeupdate', trottle(currentTime, 1000));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
