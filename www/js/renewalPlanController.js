appCtrl.controller('renewalPlanController', function($scope,$q,$http,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {


   if($localStorage.orderData!=undefined)
  {
    $scope.activePlansData= [];
       angular.forEach($localStorage.orderData,function(obj){
        if(obj.status=="ACTIVE" && obj.clientServiceId==$localStorage.clientServiceId)
        {
          $scope.activePlansData.push(obj); 
        }

      })
        console.log($scope.activePlansData) ;
  }


  // {"renewalPeriod":2,"priceId":5,"description":"gdgfd",
  // "orderNo":"OR-000001117","clientPoId":"783213",
  // "clientServicePoId":"805471","planPoId":"426058",
  // "dealPoId":"429962","dateFormat":"dd MMMM yyyy",
  // "disconnectionDate":"03 August 2018","locale":"en"}


  $scope.renewalPlan = function(plan)
  {

     var currentDate = new Date();
      var dateFormatted =  $filter('date')(currentDate,"dd MMMM yyyy");

    var renewalObj =  {"renewalPeriod":2,"priceId":0,"description":"gdgfd",
                "orderNo":plan.orderNo,"clientPoId":$localStorage.clientPoId,
                "clientServicePoId":$localStorage.clientServicePoId,"planPoId":plan.planPoId,
                "dealPoId":plan.dealPoId,"dateFormat":"dd MMMM yyyy",
                "disconnectionDate":dateFormatted,"locale":"en"}

                console.log(JSON.stringify(renewalObj));

services.renewalOrder(renewalObj,plan.id).then(function(response){

                             swal({
                                title: "Plan",
                                text: "Plan Renewaled Successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {

                            });

},function(err){

  console.log(err);

})


               



  }



});
 
})