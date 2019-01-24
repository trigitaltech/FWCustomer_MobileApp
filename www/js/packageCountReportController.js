appCtrl.controller('packageCountController', function($scope,$q,$http,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {

    services.packageCount().then(resp=>{
        console.log(resp);
        $scope.packageDate = resp.data;
    },err=>{
        console.log(err);
    })
});
 
})