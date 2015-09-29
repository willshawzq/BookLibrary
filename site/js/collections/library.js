/**
 * Created by lty on 15/9/27.
 */
define(["backbone", "models/book"],function(Backbone, Book) {
  var Library = Backbone.Collection.extend({
        model: Book,
        url: "api/books"
  });
    return Library;
});