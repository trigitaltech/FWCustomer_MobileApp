appCtrl.controller('activationController', function($scope,$filter,services,$localStorage) {


 $scope.$on('$ionicView.enter', function() {


  $scope.customerActivation = {};

  $scope.getPlans = function(categoryId)
  {
      getActivationPlan(categoryId);
  }
getServicesForActivation();
getCitiesForActivation();
getOperators();


$scope.getCAS = function(id)
{
   getCASListForActivation(id);
}


  function getServicesForActivation()
  {
      services.getServicesListForActivation().then(function(response){
        console.log(response);
        $scope.services = response.data.serviceData;
      });
  }

  function getCitiesForActivation()
  {
      services.getCitiesListForActivation().then(function(response){
        console.log(response);
              $scope.cities = response.data.cityData;

      });
  }

  function getOperators()
  {
    services.getOfficesListForActivation().then(function(response){

      $scope.operators = response.data;

    });
  }

   function getCASListForActivation(serviceId)
  {
    services.getCASListForActivation(serviceId).then(function(response){
        console.log(response);
       $scope.CASList = response.data[0].details;
    });
  }



  function getActivationPlan(id)
  {

    services.getPlansListForActivation(id).then(function(response){

      console.log(response);

      $scope.plansList = response.data.plandata

    },function(err){
      console.log(err);
    })

  }

   function getPlanCategoriesForActivation()
  {

    services.getPlanCategoriesForActivation().then(function(response){

      console.log(response);

      $scope.planCategories =response.data.allPlanDatas;

      //$scope.plansList = response.data.plandata

    },function(err){
      console.log(err);
    })

  }


getPlanCategoriesForActivation();


$scope.addActivation = function(form)
{

// {"firstname":"Customer1","phone":"9876543210",
// "email":"customer1testmb13@gmail.com","city":"Bow Barracks"
// ,"serviceCode":"CABLE TV","stb_serialNumber":"4E1207CB",
// "pairable_serialNumber":"13071004","planCode"
// :"433904","officeId":4,"provisioningSystem":"GOSPEL"}


// {"officeId":11,"firstname":"Prasad","phone":"9553797924",
// "email":"Bdp471@gmail.com","city":"Bow Barracks",
// "serviceCode":"CABLE TV","provisioningSystem":"GOSPEL",
// "stb_serialNumber":"5E1307CB","pairable_serialNumber":"13071005",
// "planCode":"521340"}


   var activationObj = {
"officeId": $scope.customerActivation.officeId,                // -- Combo (List of Values)
"firstname": $scope.customerActivation.firstname,           //-- Text
"phone": $scope.customerActivation.mobileNumber.toString(),          //-- Text 
"email": $scope.customerActivation.emailId,        //-- Text
"city": $scope.customerActivation.city,            //-- Text 
"serviceCode": $scope.customerActivation.service.serviceCode,          //-- Text Default (Settings)
"provisioningSystem": $scope.customerActivation.CAS,    //-- Combo (Settings)
"stb_serialNumber": $scope.customerActivation.STB,    //-- Text
"pairable_serialNumber": $scope.customerActivation.SC,    //-- Text 
"planCode":$scope.customerActivation.planId                      //-- Combo (Call template)
}

console.log(JSON.stringify(activationObj));

services.customerActivation(activationObj).then(function(response){

  console.log(response);
    $state.go('common.customerSearch');

     form.$setPristine();
            form.$setUntouched();

          $scope.customerActivation= {}; 

                             swal({
                                title: "Activation ",
                                text: "Customer Activation Completed Successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {

                            });

},function(err){
  console.log(err);
})


}


  
})
 })