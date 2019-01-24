var appCtrl = angular.module('starter.controllers', ["ion-floating-menu","RestAPIServices","ngStorage","ngCordova"]);

appCtrl.controller('AppCtrl', function($scope,services,$rootScope,$ionicModal,$ionicLoading,$state,$cordovaInAppBrowser, $timeout,$localStorage,$window) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
 

  // Form data for the login modal
  $scope.loginData = {};

  function getDashboardData()
  {

    $ionicLoading.show();
    services.subscriberCount().then(function(response){
      console.log(response);
      $ionicLoading.hide();
      angular.forEach(response.data,function(data){
        if(data.STATUS=='SUSPENDED')
        {
          $scope.suspended = data.COUNT_OF_CUSTOMER;
        }
        if(data.STATUS=='TERMINATED')
        {
          $scope.terminated = data.COUNT_OF_CUSTOMER;

        }
        if(data.STATUS=='ACTIVE')
        {
          $scope.active = data.COUNT_OF_CUSTOMER;

        }
      })

      $scope.dashBoardData = response.data;
    })
  }
  $scope.customerName = $localStorage.ACCOUNT_NO;

  //getDashboardData();

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });



  $scope.buttonClick = function(type)
  {
     if(type=='csearch')
     {
            $state.go('common.customerSearch');
     }
     else
     {
            $state.go('common.customerActivation');

     }
  }

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
  
    var agree = $localStorage.agree ;


    
     $localStorage.$reset();
    //  $localStorage.$reset({
    // authorizationToken: undefined,
    // cancelPlanObj: undefined,
    // categoryKey: undefined,
    // categoryValue: undefined,
    // city: undefined,
    // clientId: undefined,
    // clientPoId: undefined,
    // clientServiceId: undefined,
    // clientServicePoId: undefined,
    // isLoggedIn: undefined,
    // orderData: undefined,
    // type: undefined

    // });
    $localStorage.agree= agree;
    

     $state.go("login");
  };

 

 





});

 });



