appCtrl.controller('collectionReportController', function($scope,$q,$http,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {

    services.collectionReport().then(resp=>{
        console.log(resp);
        $scope.collectionDate = resp.data;
    },err=>{
        console.log(err);
    })
});
 
})