appCtrl.controller('cancelPlanController', function($scope,$localStorage,$state,$ionicLoading,services,$ionicPopup,$filter) {

  $scope.$on('$ionicView.enter', function() {
  
    $localStorage.cancelPlanId = undefined;
    $localStorage.planId=undefined;
    $localStorage.changePlanId=undefined;
    $scope.plansData = $localStorage.planDetails;
    var cancelPlans = [];
  
  
    function getIndexOfPlanArray(id)
      {
          for(var i=0;i<cancelPlans.length;i++)
          {
            if(cancelPlans[i].PLAN_ID==id)
            {
              return i;
            }
          }
      }
  
  
   var popup;
   $scope.cancel={};
   function getPlans()
   {
    services.customerSearch("id",$localStorage.clientId).then(function(response){
        console.log(response.data);
         $scope.plansData = [];
        angular.forEach(response.data.orderData,function(obj){
          if(obj.status=="ACTIVE")
          {
            $scope.plansData.push(obj);
          }
  
        })
        console.log($scope.plansData);
       
       
  
  
      },function(err){
        console.log(err);
      })
   }
  
   //getPlans();
  
  
   $scope.planClick = function(plan)
   {
  
    if(plan.checkStatus)
    {
      cancelPlans.push(plan);
    }
    else
    {
      cancelPlans.splice(getIndexOfPlanArray(plan.PLAN_ID),1);
    }
  
    // $scope.cancelButton = ""
     
    //  if(plan.checkStatus)
    //  {
    //    $localStorage.cancelPlanObj = {"planId": plan.id,
    //                                 "dealPoId": plan.dealPoId,"planPoId": plan.planPoId
    //                                  }
    //  }
    //  else
    //  {
    //    $localStorage.cancelPlanId = undefined;
    //  }
    
   }
   
  
  
   $scope.cancelPlanProceed = function(){
  console.log(cancelPlans);
  
   
  
   
  }
  
  $scope.cancelPlanSubmit = function()
  {
  
    if(cancelPlans.length==0)
    {
       alert("please select atleast one plan");
    }
    else if(cancelPlans.length>1)
    {
       alert("please select only one plan");
    }
    else
    {
      $ionicLoading.show();
    
      var cancelPlanObject = {"ACCOUNT_NO":$localStorage.ACCOUNT_POID,
      "CUSTOMER_NAME": $localStorage.CUSTOMER_NAME,"ACCOUNT_POID": $localStorage.ACCOUNT_POID,
       "SERVICE_OBJ": $localStorage.SERVICE_OBJ,"CANCEL_PLAN_LIST":[{"PLAN_OBJ":cancelPlans[0].PLAN_OBJ,"DEALS":[{"DEAL_OBJ":cancelPlans[0].DEAL_OBJ,"PACKAGE_ID":cancelPlans[0].PACKAGE_ID}]}]};
             var obj =  JSON.parse(angular.toJson(cancelPlanObject))
    services.cancelPlan(obj).then(function(response){
      console.log(response);
      $ionicLoading.hide();
                               swal({
                                    title: "Cancel Plan",
                                    text: "Plan cancelled Successfully",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                }, function() {
    
                                });
     // popup.close();
      //getPlans();
      $state.go('common.customerSearch');
    },function(err){
        $ionicLoading.hide();
      console.log(err);
      swal({
        title: "Cancel Plan",
         text: err.data.ERROR_DESCR,
       type: "error",
       confirmButtonColor: "#007AFF"
     }, function() {

    });

      //popup.close();
    })
    }
  
    
  
  }
  
  
  $scope.closePopup = function()
  {
     popup.close();
  }
  
  })
    
  })
  
  
  
  