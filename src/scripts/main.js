// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  theme = require('bespoke-theme-build-wars'),
  //cube = require('bespoke-theme-cube'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  backdrop = require('bespoke-backdrop'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress'),
  forms = require('bespoke-forms');

// Bespoke.js
bespoke.from('article', [
  //cube(),
  theme(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  backdrop(),
  scale(),
  hash(),
  progress(),
  forms()
]);
var x = document.getElementById('myAudio');
    x.loop = true;
    x.load();
var audio = document.getElementById('myAudio');   
document.onkeypress = function(e){
    if((e || window.event).keyCode === 27){
        audio.paused ? audio.play() : audio.pause();
    }
};
// var audio = new Audio('1.mp3');
// audio.play();
// myAudio = new Audio('1.mp3');
// myAudio.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
// }, false);
// myAudio.play();
// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify
require('prism');
