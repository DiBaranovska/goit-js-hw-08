import Player from '@vimeo/player';
import trottle from 'lodash.throttle';
///updatePage();
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTime = function getCurrentTime(event) {
  const time = event.seconds;
  localStorage.setItem('videoplayer-current-time', time);
};

player.on('timeupdate', trottle(currentTime, 1000));

/*const setTime = localStorage.getItem('videoplayer-current-time')
  ? localStorage.getItem('videoplayer-current-time')
  : 0;

player.setCurrentTime(setTime);*/

/*function updatePage() {
  const savedStorage = localStorage.getItem('videoplayer-current-time');
  if (savedStorage) {
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
  }
}*/

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
