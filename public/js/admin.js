var remove = function(event) {
  var target = event.srcElement || event.target;
  var $target = $(target);
  var $tr =  $target.parent().parent();
  var id = $tr.data('id');
  $.ajax({
    url: '/api/articles/' + id,
    type: 'DELETE',
    xhrFields: {
      withCredentials: true
    },
    success: function(data, status, xhr) {
      $tr.remove();
    },
    error: function(xhr, status, error){

    }
  })
};

var publish = function(event) {
  var target = event.srcElement || event.target;
  var $target = $(target);
  var $tr =  $target.parent().parent();
  var id = $tr.data('id');
  $.ajax({
    url: '/api/articles/' + id,
    data: JSON.stringify({article: {published: true}}),
    contentType: 'application/json',
    type: 'PUT',
    xhrFields: {
      withCredentials: true
    },
    success: function(data, status, xhr) {
      $tr.removeClass('unpublished').find('.glyphicon-play').removeClass('glyphicon-play').addClass('glyphicon-pause');
    },
    error: function(xhr, status, error){

    }
  })
};

var unpublish = function(event) {
  var target = event.srcElement || event.target;
  var $target = $(target);
  var $tr =  $target.parent().parent();
  var id = $tr.data('id');
  $.ajax({
    url: '/api/articles/' + id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({article: {published: false}}),
    xhrFields: {
      withCredentials: true
    },
    success: function(data, status, xhr) {
      $tr.addClass('unpublished').find('.glyphicon-pause').removeClass('glyphicon-pause').addClass('glyphicon-play');
    },
    error: function(xhr, status, error){

    }
  })
};

$(document).ready(function(){
  $.ajax({
    url: '/api/articles',   
    xhrFields: {
      withCredentials: true
    },
    success: function(data, status, xhr) {
      $('.admin').html('');
      $('.admin').append($('<table>'));
      $.each(data.articles, function(index, article) {
        var element = '<tr><td><span class="glyphicon glyphicon-remove" title="Remove"></span></td>';
        if (article.published)
          element += '<td><span class="glyphicon glyphicon-pause" title="Unpublish"></span></td>';
        else 
          element += '<td><span class="glyphicon glyphicon-play" title="Publish"></span></td>';
        element += '<td>' + article.title + '</td></tr>';
        var $element = $(element);
        $element.data('id', article._id);
        // debugger
        // $element.find('.glyphicon-remove').click(remove);
        // $element.find('.glyphicon-play').click(publish);
        // $element.find('.glyphicon-pause').click(unpublish);        
        // $element
        $element.on('click', '.glyphicon-remove', remove);
        $element.on('click', '.glyphicon-play', publish);
        $element.on('click', '.glyphicon-pause', unpublish);
        if (!article.published) {
          $element.addClass('unpublished')
        }
        $('.admin table').append($element);

      });

    },
    error: function(xhr, status, error) {
    }
  });
})