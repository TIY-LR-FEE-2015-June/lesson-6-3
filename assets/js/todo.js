var Todo = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    title: '',
    done: false
  }
});

var TodoList = Backbone.Collection.extend({
  model: Todo,
  url: 'http://tiny-lr.herokuapp.com/collections/rt-todos'
});
