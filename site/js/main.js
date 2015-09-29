/**
 * Created by lty on 15/9/27.
 */
"use strict";
require.config({
    paths: {
        jQuery: "lib/jquery/dist/jquery",
        underscore: "lib/underscore/underscore",
        backbone: "lib/backbone/backbone",
        text: "lib/requirejs-text/text"
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: [
                "underscore",
                "jQuery"
            ],
            exports: "Backbone"
        }
    }
});

require(["backbone", "views/library"],
    function(Backbone, LibraryView) {

        new LibraryView( books );
    }
);