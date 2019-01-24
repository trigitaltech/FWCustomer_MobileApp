appCtrl.controller('viewbillsController', function($scope,$q,$http,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {
	 var bills = {"ACCOUNT_POID": $localStorage.ACCOUNT_POID};  
   
     var obj =  JSON.parse(angular.toJson(bills))

    services.bills(obj).then(resp=>{
        console.log(resp);
		 $scope.billsDataShow = true;
        $scope.bills = resp.data;
    },function(err){
       $ionicLoading.hide();
       $scope.billsDataShow = false;
      $scope.errorMsg = "Bills data Not Found"
      console.log(err);
    })
});
 
})