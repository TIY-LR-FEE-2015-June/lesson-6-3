var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '#target',

  initialize: function() {
    this.listenTo(this.collection, 'add reset', this.render);

    this.render();
  },

  events: {
    'submit form': 'addTodo'
  },

  render: function() {
    var html = this.template(this.collection);
    this.$el.html(html);
    console.info('render');

    return this;
  },

  addTodo: function(ev) {
    ev.preventDefault();

    var title = this.$el.find('input').val();
    this.collection.add(new Todo({title: title}));
    this.$el.find('input').val('');
  }
});
