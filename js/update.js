// JQuery
$(function(){
  $('#title').attr('placeholder',title);
  $("#owner").attr('placeholder', owner);
  $('#description').attr('placeholder', description);
});

//JS
var id = localStorage.getItem("id");
var title = localStorage.getItem("title");
var description = localStorage.getItem("description");
var status = localStorage.getItem("status");
var owner = localStorage.getItem("owner");

//AngularJS
var updateTask = angular.module('updateTask', []);
updateTask.controller('updateTaskCtrl', ['$scope', '$http', '$location', function ($scope, $http,  $location) {

  $scope.statusList = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'EMERGENCY', label: 'Emergency' },
    { value: 'CLOSED', label: 'Closed' }
  ];

  for (var i = 0; i < 3; i++) {
    if ($scope.statusList[i].value == status) {
      $scope.status = $scope.statusList[i].value;
      break;
    }
  }

  $scope.update = function() {
    if ($scope.title != null)
      title = $scope.title;
    if ($scope.description != null)
      description = $scope.description;
    if ($scope.status != null)
      status = $scope.status;
    if ($scope.owner != null)
      owner = $scope.owner;

    $http.put('https://semobiletraining.appspot.com/_ah/api/caseApi/v1/void', {
      "id" : localStorage.getItem("id", id) ,
      "title" : title,
      "owner" : owner,
      "status" : status,
      "comments" : description
    }).then(function() {
        window.location = "cases.html";
       });
  };
}]);
