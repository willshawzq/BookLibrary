/**
 * Created by lty on 15/9/27.
 */
define(["backbone", "collections/library", "models/book", "views/book"],
    function(Backbone, Library,Book, BookView){
        var LibraryView = Backbone.View.extend({
            el: "#books",
            events: {
                "click #add": "addBook"
            },
            initialize: function(initialBooks) {
                this.collection = new Library(initialBooks);
                this.collection.fetch({reset: true});
                this.listenTo(this.collection, "add", this.renderBook);
                this.listenTo(this.collection, "reset", this.render);
                this.render();
            },
            render: function() {
                this.collection.each(function(book) {
                    this.renderBook(book);
                }, this);
            },
            renderBook: function(book) {
                var bookView = new BookView({
                    model: book
                });
                this.$el.append(bookView.render().el);
            },
            addBook: function(e) {
                e.preventDefault();
                var formData = {};
                this.$("#addBook div input").each(function(i, el) {
                    if($(el).val().trim() != "") {
                        if(el.id === "keywords"){
                            formData[el.id] = [];
                            formData[el.id].push({"keyword": $(el).val()});
                        }else if(el.id === "releaseDate"){
                            formData[el.id] = new Date($(el).val()).getTime();
                            console.log(formData[el.id], new Date($(el).val()).getTime());
                        }
                        formData[el.id] = $(el).val();
                    }
                });
                console.log(formData);
                //this.collection.add( new Book(formData));
                this.collection.create(formData);
            }
        });
        return LibraryView;
});