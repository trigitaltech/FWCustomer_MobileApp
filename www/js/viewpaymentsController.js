appCtrl.controller('viewpaymentsController', function($scope,$q,$http,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {
   

    $scope.errorMsg='';

    services.payments($localStorage.ACCOUNT_POID).then(resp=>{
        console.log(resp);
		$scope.paymentsDataShow = true;
        $scope.payments = resp.data;
        if(resp.data.length==0)
        {
            $scope.errorMsg = "No payments found"

        }
    },function(err){
       $ionicLoading.hide();
       $scope.paymentsDataShow = false;
      $scope.errorMsg = err.data
      console.log(err);
    })
});
 
})