var TodoView = Backbone.View.extend({
  tagName: 'li',
  template: AppTemplates.todo,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'change .toggle': 'toggleDone',
    'click .destroy': 'burnItWithFire'
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    this.$el.toggleClass('completed', this.model.get('done'));

    return this;
  },

  toggleDone: function() {
    this.model.set('done', !this.model.get('done'));
    this.model.save();
  },

  burnItWithFire: function() {
    var _this = this;
    this.$el.slideUp(function() {
      _this.model.destroy();
      _this.remove();
    });
  }
});

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '#target',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
    'submit form': 'addTodo'
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(html);
    this.collection.sortBy('done').forEach(function(todo) {
      var childView = new TodoView({model: todo});

      _this.$el.find('.todo-list')
        .append(childView.render().$el);
    });

    console.info('render');

    this.$('.new-todo').focus();
    return this;
  },

  addTodo: function(ev) {
    ev.preventDefault();

    var title = this.$el.find('input').val();
    this.collection.create({title: title});
    this.$el.find('input').val('');
  }
});
