appCtrl.controller('loginCtrl', function($scope, $stateParams,$localStorage,services,$http,$state,$ionicLoading) {


  $scope.login = {};
  $scope.ip = {};
  $scope.changePassword = {};
  $scope.imageURL = $localStorage.Image_URL;

$scope.doLogin = function()
{
	$scope.errorMsg=""
	$ionicLoading.show();
  var loginObj = {"USERID": $scope.login.userName,"PASSWORD": $scope.login.password,"DEVICEIMEI": "352356079376711"};
  services.loginMethod(loginObj).then(function(response){
    $localStorage.loginObj = JSON.stringify(loginObj);
    $localStorage.customerType = response.data.split(':')[4];
    $localStorage.userName = $scope.login.userName;
    if($localStorage.agree==0 || $localStorage.agree==undefined)
    {
      $state.go('termsConditions');

    }
        else
        {
          $state.go('common.customerSearch');

        }

    // if($localStorage.customerType==='L')
    // {
    //   $state.go('common.dashboard');
    // }
    // else
    // {
    //   $state.go('common.customerSearch');
    // }
    $scope.error =''
    	                      
    $ionicLoading.hide();
    $localStorage.isLoggedIn = 1;
    console.log(response);

  },function(err){
  	$ionicLoading.hide();
    console.log(err);
    $scope.error="Username or Password is wrong"
  })
}

$scope.ip.ipaddress = "https://"

$scope.saveIPDetails = function()
{
   $localStorage.API_URL = $scope.ip.ipaddress +'/obsplatform/api/v1/' ;
   $localStorage.Image_URL = $scope.ip.ipaddress+'/app/images/Whitelabel_logo.png' ;
   $state.go('login');
   $localStorage.ipSet = 1;
}
$scope.error = ''

$scope.changePasswordSubmit = function()
{
$scope.error=''
//var changePasswordObj =  {"password":$scope.changePassword.current, "repeatPassword":$scope.changePassword.newPassword}
						   
var changePasswordObj = {"value": $scope.changePassword.current};
  
      // var obj =  JSON.parse(angular.toJson(changePasswordObj))

  services.changePassword($scope.changePassword.Password).then(function(response){
    console.log(response);
    $scope.changePassword= {};
                                 swal({
                                title: "Change password",
                                text: "Password Changed Successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {

                            });

                                 $state.go('login');
  },function(err){
    console.log(err);
    $scope.error = "Incorrect password"
  })
}

  
})