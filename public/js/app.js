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
        	self.render();
        })
      }
    },
    render : function(event){
      var self = this;
      this.collection.each(function(news){
      	var a = $("<a/>");
      	$(a).attr("href", news.get('Url')).attr("target", "_blank").html(news.get('Overview'));
        self.$newsList.append($("<li/>").html($(a)));
      }, this);
    }
  })
  var newsView = new NewsView();
})