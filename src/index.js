window.addEventListener("DOMContentLoaded", function () {
    'use strict';
    let calc = require("./calc.js"),
        timer = require("./timer.js"),
        tabs = require("./tabs.js"),
        img = require("./img.js"),
        mainScript = require("./script.js");

    timer();
    calc();
    tabs();
    mainScript();
	img();
});