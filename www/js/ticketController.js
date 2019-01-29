appCtrl.controller('ticketController', function($scope,$ionicPopup,$rootScope,$cordovaInAppBrowser,$ionicLoading,$filter,$stateParams,$http,$state,services,$localStorage) {

 $scope.$on('$ionicView.enter', function() {
	 $scope.ticket= {}; 
	$scope.ticket = function()
	{
        var ticketobj = {
      "CUST_ACCOUNT_NO":$localStorage.ACCOUNT_NO,
	  "NOTES_TYPE":$scope.ticket.type,
      "CUSTOMER_NOTES":	$scope.ticket.description
  
       };
       var obj = JSON.parse(angular.toJson(ticketobj))
       services.addTicket(obj).then(function(response){
	
      
         console.log(response);
                               swal({
                                 title: "Ticket",
                                  text: "Ticket Raise Successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                              }, function() {

                             });

                               $state.go('common.customerSearch');

       },function(err){
	    $scope.error = "msg"
	  })
	}
});
})







