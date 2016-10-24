var app = angular.module('snapp', ['ngRoute', 'ngCookies']);
var URL = 'http://betsol.org:9000/';
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/login'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginCtrl'
  })
  .when('/signup',{
    templateUrl: 'views/signup.html',
    controller: 'signupCtrl'
  })
  .when('/dashboard',{
    templateUrl: 'views/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
app.controller('loginCtrl',[
  '$scope', '$location', '$http', function ($scope, $location,$http) {
    $scope.login = function(){
      var request = $http({
        method: "POST",
        url: URL + 'login',
        data: {
          email: $scope.email,
          password: $scope.password}
        });
    request.success(function (data){
      console.log(data);
      var response = angular.fromJson(data);
      if(response["error"]){
        console.log("if error");
       $scope.validationMessage = "Invalid username or password"; // or scope.validationMessage = response["message"][0]; //
      }
      else{

        sessionStorage.email = response["email"];
        sessionStorage.password = response["password"];
        sessionStorage.userId = response["id"];
        $location.url('/dashboard');
        console.log("else error");
      }
    });
    request.error(function(data){
      console.log(data);
    });
  }
}]);

app.controller('signupCtrl', ['$scope', '$location', '$http',
  function ($scope, $location, $http){
    $scope.signup = function(){
      var request = $http({
        method: "POST",
        url: URL + 'signup',
        data: {
          firstName: $scope.firstname,
          lastName: $scope.lastname,
          email: $scope.email,
          password: $scope.password}
        });
    request.success(function (data){
      console.log(data);
      var response = angular.fromJson(data);
      if(response["error"]){
        console.log("if error");
       $scope.validationMessage = "Enter the required fields"; // or scope.validationMessage = response["message"][0]; //
      }
      else{
        sessionStorage.email = response["email"];
        sessionStorage.password = response["password"];
        sessionStorage.userId = response["id"];
        //sessionStorage.firstname = response["firstname"];
        //sessionStorage.lastname = response["lastname"];
        $location.url('/dashboard');
        console.log("else error");
      }
    });
    request.error(function(data){
      console.log(data);
    });
  }

  }]);

  app.controller('dashboardCtrl', ['$scope', '$location', '$http',
    function ($scope, $location, $http){

    }]);
