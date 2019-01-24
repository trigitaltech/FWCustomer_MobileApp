appCtrl.controller('viewticketsController', function($scope,$q,$http,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {
    $scope.errorMsg = ''
    services.tickets().then(resp=>{
        console.log(resp);
        $scope.tickets = resp.data;
        if(resp.data.length==0)
        {
            $scope.errorMsg = "No tickets found"
        }
    },err=>{
        console.log(err);
        $scope.errorMsg = err.data
    })
});
 
})