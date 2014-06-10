$(function(){
  var News = Backbone.Model.extend({})
  var NewsCollection = Backbone.Collection.extend({
    model: News,
    url  : "/getNews"
  });
  var NewsView = Backbone.View.extend({
    el : "#container",
    events: {
      'click #search-button': 'search'
    },
    initialize:function(){
      this.collection = new NewsCollection();
      this.$query     = $("#search-query");
      this.$newsList  = $("#news-list");
    },
    search : function(event){
      var self  = this;
      var query = this.$query.val();
      this.$newsList.empty();
      if (query){
        this.collection
        .fetch({data:{keyWord:query}})
        .then(function(res){
          _.each(res.data, function(val) {
            self.collection.add(val);
          });
        })
        .then(function(){
          self.render();
        })
      }
    },
    render : function(event){
      var self = this;
      this.collection.each(function(news){
        self.$newsList.append($("<li/>").html(news.get("Overview")));
      });
    }
  })
  var newsView = new NewsView();
})