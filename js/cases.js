//JQuery
$(document).on('click', '.panel-heading span.clickable', function(e){
  var $this = $(this);
  if(!$this.hasClass('panel-collapsed')) {
    $this.parents('.panel').find('.panel-body').slideUp();
    $this.addClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
  } else {
    $this.parents('.panel').find('.panel-body').slideDown();
    $this.removeClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
  }
});

//JS
window.localStorage.clear();

//AngularJS
var allTasks = angular.module('allTasks', []);
allTasks.controller('TaskPanelCtrl', ['$scope', '$http', '$location', function ($scope, $http,  $location) {

  $http.get('https://semobiletraining.appspot.com/_ah/api/caseApi/v1/casebeancollection')
    .success( function(data, status, headers, config) {
      $('#imgLoading').show();
      var unsolvedTaskNumber = 0;
      $scope.tasks = data.items;

      for (var i in data.items)
        if (data.items[i].status != 'CLOSED')
          unsolvedTaskNumber++;

      chrome.browserAction.setBadgeText({text: unsolvedTaskNumber.toString()});
      $('#imgLoading').hide();
    });

  $scope.close = function(id, title, owner, description) {
    $http.put('https://semobiletraining.appspot.com/_ah/api/caseApi/v1/void', { "id" : id , "title" : title, "owner" : owner, "status" : "CLOSED", "comments" : description }  )
      .then( function() {
        location.reload('/');
      });
    };

  $scope.update = function update(id, title, owner, description, status) {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("owner", owner);
    localStorage.setItem("description", description);
    localStorage.setItem("status", status);
  };
}]);
