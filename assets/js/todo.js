var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    done: false
  }
});

var TodoList = Backbone.Collection.extend({
  model: Todo
});
