/**
 * Created by lty on 15/9/27.
 */
define(["backbone", "collections/library", "text!template/bookTemplate.html"],
    function(Backbone, Library, bookTemplate) {
        var BookView = Backbone.View.extend({
            tagName: "div",
            className: "bookContainer",
            template: _.template(bookTemplate),
            events: {
                "click .delete": "deleteBook"
            },
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            deleteBook: function() {
                this.model.destroy();
                this.remove();
            }
        });
        return BookView;
});