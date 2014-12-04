/*jslint browser: true*/
/*global Tangram, gui */

(function () {
    'use strict';

    var locations = {
        'London': [51.508, -0.105, 15],
        'New York': [40.70531887544228, -74.00976419448853, 16],
        'Seattle': [47.609722, -122.333056, 15]
    };

    // Get location from URL
    var map_start_location = locations['New York'];

    /*** Map ***/

    var map = L.map('map', {
        maxZoom: 20,
        minZoom: 1,
        inertia: false,
        keyboard: true
    });

    var layer = Tangram.leafletLayer({
        vectorTileSource: {
            type: 'GeoJSONTileSource',
            url:  'http://vector.mapzen.com/osm/all/{z}/{x}/{y}.json'
        },
        vectorLayers: 'layers.yaml',
        vectorStyles: 'styles.yaml',
        numWorkers: 2,
        attribution: 'Map data &copy; OpenStreetMap contributors | <a href="https://github.com/tangrams/tangram" target="_blank">Source Code</a>',
        unloadInvisibleTiles: false,
        updateWhenIdle: false
    });
    window.layer = layer;

    var scene = layer.scene;
    window.scene = scene;

    map.setView(map_start_location.slice(0, 2), map_start_location[2]);

    // Resize map to window
    function resizeMap() {
        document.getElementById('map').style.width = window.innerWidth + 'px';
        document.getElementById('map').style.height = window.innerHeight + 'px';
        map.invalidateSize(false);
    }

    window.addEventListener('resize', resizeMap);
    resizeMap();

    /***** Render loop *****/
    window.addEventListener('load', function () {
        // Scene initialized
        layer.addTo(map);
    });


}());
