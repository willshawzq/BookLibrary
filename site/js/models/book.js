/**
 * Created by lty on 15/9/27.
 */
define(["backbone"],function(Backbone) {
    var Book = Backbone.Model.extend({
       defaults: {
           coverImage: "img/placeholder.png",
           title: "No title",
           author: "Unknown",
           releaseDate: "Unknown",
           keywords: "None"
       },
        parse: function(res) {
            res.id = res._id;
            return res;
        }
    });
    return Book;
});