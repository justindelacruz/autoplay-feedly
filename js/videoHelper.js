(function($) {
    'use strict';

    /**
     * Module to allow videos to be playable in Feedly.
     *
     * @returns {{setup: Function}}
     * @constructor
     */
    var VideoHelper = function() {
        var timeoutId;

        /**
         * Listen for changes to the DOM.
         */
        var setupEvents = function () {
            console.log("Setting up events...");
            var container = document.getElementById('box');
            container.addEventListener("DOMSubtreeModified", _handleDOMSubtreeModified, false);
        };

        /**
         * Handle "DOMSubtreeModified" event to DOM.
         * Uses setTimeout() for performance reasons-- this method is called very frequently.
         *
         * @private
         */
        var _handleDOMSubtreeModified = function() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(_handleDomModified, 1000);
         };

         /**
         * Add controls to videos.
         *
         * @private
         */
        var _handleDomModified = function() {
            var allContent = document.getElementById('floatingEntry');
            var videos = allContent.getElementsByTagName('video');

            Array.prototype.forEach.call(videos, function(el, i) {
                $(el).attr("controls", "controls");
            });
        };

        return {
            setup: setupEvents
        };
    };

    var videoHelper = new VideoHelper();
    videoHelper.setup();
})($);