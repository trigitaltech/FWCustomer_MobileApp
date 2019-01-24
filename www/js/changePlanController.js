appCtrl.controller('ChangePlanCtrl', function($scope,$cordovaInAppBrowser,$filter,$location,$ionicLoading, $stateParams,services,$http,$state,$localStorage) {

$scope.$on('$ionicView.enter', function() {
  $scope.city = $localStorage.city;


  $scope.plansData = $localStorage.planDetails;
  $scope.changePlanSelectedPlans = $localStorage.newPlanList

    $scope.plan = {}
   function getPlanDetails()
	    {
	      services.getPlanDetails($localStorage.clientId,0).then(function(response){
	        console.log(response)
	        $scope.planDetails = response.data.PLAN_LIST;
	        //$scope.city = $localStorage.city;
	      },function(err){
	        console.log(err);
	      })
      }
      $scope.plansList = [];
     
    $scope.getPlansByPlanListId = function()
    {
      $ionicLoading.show();

      services.getPlansListByListId($scope.plan.CategoryId.PLAN_LIST_ID).then(resp=>{

        $ionicLoading.hide();

        console.log(resp);
        $scope.plansList = resp.data.ID_BASED_PLAN_LIST;

      },err=>{

        console.log(err);
        $ionicLoading.hide();


      })
    } 

      if($location.path()=='/common/changePlan')
         getPlanDetails();

    

   function getIndexOfPlanArray(id,PlanList)
   {
       for(var i=0;i<PlanList.length;i++)
       {
         if(PlanList[i].PLAN_ID==id)
         {
           return i;
         }
       }
   }

   
   $scope.paytm =function()
   {

   console.log($localStorage.changePlanAmount); 
   if($localStorage.changePlanAmount=="0" || $localStorage.changePlanAmount=="0.00")
   {
     $scope.changePlan();

   }
   else
   {
     var custid = $localStorage.ACCOUNT_POID.split(' ')[2];

     var orderId = Math.round((new Date()).getTime() / 1000);
     var options = {
       location: 'no',
       clearcache: 'yes',
       toolbar: 'no'
     };
 
   document.addEventListener("deviceready", function () {
     $cordovaInAppBrowser.open('http://123.63.148.119:2462/paytm_java/WebContent/pgRedirect.jsp?TXN_AMOUNT='+$localStorage.changePlanAmount+'&ORDER_ID='+orderId+'&CUST_ID='+custid, '_blank', options)
       .then(function(event) {
         // success
       })
       .catch(function(event) {
         // error
       });
 
 
     //$cordovaInAppBrowser.close();
 
   }, false);
   }
     
   }

   var CARD_TRANSACTION_ID ;
   var PAY_TYPE;

   $scope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
     console.log(event.url);
     if(event.url.includes('txn'))
     {
       //console.log(event.url);
       console.log(event.url.split('?')[1].split('=')[1])
       CARD_TRANSACTION_ID= event.url.split('?')[1].split('=')[1];
     }
     if(event.url.includes('bankresponse'))
     {
       //console.log(event.url);
       var strings = event.url.split('/')
       console.log(strings[strings.length-2])
       PAY_TYPE= strings[strings.length-2];
     }
     
     if(event.url=="http://123.63.148.119:2462/paytm_java/WebContent/pgResponse.jsp")
     {
      var cardtype = 'CARD';
      if(PAY_TYPE=='CC')
      {
        cardtype="CREDIT"
      }
      else if(PAY_TYPE=='DC')
      {
        cardtype = "DEBIT"
      }
         $scope.changePlan(CARD_TRANSACTION_ID,cardtype);
         $cordovaInAppBrowser.close();
       
      
     }
 
 
   });


      $scope.showChangePlansSelected = function()
      {
           if(newPlanList.length==1)
           {
             $localStorage.newPlanList = newPlanList
             var planCodesArray = [];
             planCodesArray.push($localStorage.newPlanList[0].plan[0].CODE)
             var priceObj = {"PLANCODES":planCodesArray};
             var obj = JSON.parse(angular.toJson(priceObj));

    services.getPlanPrice(obj).then(function(response){
      console.log(response);
      $localStorage.changePlanAmount = response.data;
      $state.go('common.changePlanSelectedPlan');

    },function(err){
      console.log(err);
    })
           }
           else if(newPlanList.length>1)
           {
             alert("please select only one plan");
           }
           else
           {
             alert("please select atleast one plan")
           }
      }
      $scope.totalPrice = $localStorage.changePlanAmount;
     var count =0;
     var newPlanList = [];
      $scope.planSelected = function(plans)
      {

         if(plans.checkStatus)
         {
          newPlanList.push({plan: [plans],
           CITY:$scope.plan.CategoryId.CITY,
           PLAN_LIST_NAME:$scope.plan.CategoryId.PLAN_LIST_NAME,
           PLAN_LIST_ID:$scope.plan.CategoryId.PLAN_LIST_ID,PLAN_ID:plans.PLAN_ID
         });
         }
         else
         {
          newPlanList.splice(getIndexOfPlanArray(plans.PLAN_ID,newPlanList),1); 
          console.log(newPlanList); 
         }
      }

    

     var currentPlanList = []
      $scope.planClickCurrent = function(plan)
     {
        if(plan.checkStatus)
        {
           
          currentPlanList.push({'PLAN_ID':plan.PLAN_ID,'PLAN_OBJ':plan.PLAN_OBJ,
          'DEALS':[{'DEAL_OBJ':plan.DEAL_OBJ,
          'PACKAGE_ID':plan.PACKAGE_ID}]});
           $scope.errorMsg=""
        }
        else
        {
          //$scope.errorMsg = "Check Atleast One Plan"
          currentPlanList.splice(getIndexOfPlanArray(plan.PLAN_ID,currentPlanList),1);  
          console.log(currentPlanList); 

        }
       
     }

     $scope.changePlan = function(txn,paytype)
     {
      $ionicLoading.show();
      var paymentObj = {
        "STATE":$localStorage.STATE,"ACCOUNT_NO":$localStorage.ACCOUNT_NO,
    "CUSTOMER_NAME":$localStorage.ACCOUNT_NO,"DUE_DATE":$localStorage.DUE_DATE,
    "ADDRESS":$localStorage.ADDRESS,"PREVIOUS_OUTSTANDING":$localStorage.PREVIOUS_OUTSTANDING,
    "ACCOUNT_OBJ":$localStorage.ACCOUNT_OBJ,"LAST_INVOICE":$localStorage.LAST_INVOICE,
    "MSO_FLD_AGREEMENT_NO":$localStorage.MSO_FLD_AGREEMENT_NO,"SERVICE_OBJ":$localStorage.SERVICE_OBJ, 
    "PLAN_NAME":$localStorage.newPlanList[0].PLAN_LIST_NAME,"MOBILE_NO":$localStorage.MOBILE_NO,
    "ACCOUNT_POID": $localStorage.ACCOUNT_POID,"CITY":$localStorage.CITY,
    "EMAIL_ID":$localStorage.EMAIL_ID,"PAY_TYPE":paytype,
    "PAID_AMOUNT":$localStorage.changePlanAmount,"CASH_DATE":new Date(),
    "REMARKS":"","ALTERNATE_MOBILE_NO": $localStorage.MOBILE_NO,
    "ALTERNATE_EMAIL_ID": $localStorage.EMAIL_ID,
    "LATITUDE": "coords.latitude",
    "LONGITUDE": "coords.longitude",
    "T_TYPE": "TOP UP",
    "T_ID": "TOP_UP-201609134788898488",
    "T_STATUS": "TOPUP SUCCESS",
    "T_ORIG_AMOUNT": "10.0",
    "T_FIXED_AMOUNT": "5.0",
    "T_TAXED_AMOUNT": "2.0",
    "T_TOTAL_AMOUNT": "17.0",
    "T_PAYABLE_AMOUNT": "10.0",
    "CARD_TRANSACTION_ID": txn
  
     };
     var obj =  JSON.parse(angular.toJson(paymentObj))

     services.addPayment(obj).then(function(response){
      console.log(response);
      
     
      $scope.errorMsg=""
        var currentDate = new Date();
     var dateFormatted =  $filter('date')(currentDate,"dd MMMM yyyy");

     
        var changePlanObj = $localStorage.ChangePlanObj;
        delete changePlanObj.PLAN_ID;
        var changPlanObject = {"ACCOUNT_NO":$localStorage.ACCOUNT_NO,"ACCOUNT_POID": $localStorage.ACCOUNT_POID,
        "CUSTOMER_NAME": $localStorage.CUSTOMER_NAME,
         "SERVICE_OBJ": $localStorage.SERVICE_OBJ,"CUR_PLAN_LIST":changePlanObj, "NEW_PLAN_LIST":[{PLAN_OBJ:$localStorage.newPlanList[0].plan[0].POID}]};
               var obj =  JSON.parse(angular.toJson(changPlanObject));
      

          services.changePlan(obj).then(function(response){
            console.log(response);
            $ionicLoading.hide();
                         swal({
                              title: "Change Plan ",
                              text: "Plan Changed Successfully",
                              type: "success",
                              confirmButtonColor: "#007AFF"
                          }, function() {

                          });
                           $state.go('common.customerSearch');

          },function(err){
             $ionicLoading.hide();
            console.log(err);
            var ticketobj = {
              "CUST_ACCOUNT_NO":$localStorage.ACCOUNT_NO,
            "NOTES_TYPE":"Raise a complaint",
              "CUSTOMER_NOTES":	"change Plan failed"
          
               };
               services.addTicket(ticketobj).then(response=>{
                swal({
                  title: "Ticket Raised",
                   text: "",
                 type: "error",
                 confirmButtonColor: "#007AFF"
               }, function() {
    
              });
               },error=>{
                 console.log(error);
               })
          //   swal({
          //     title: "Change Plan",
          //      text: err.data.ERROR_DESCR,
          //    type: "error",
          //    confirmButtonColor: "#007AFF"
          //  }, function() {
    
          // });
          })
     },function(err){
      $ionicLoading.hide();
     
      swal({
        title: "Payment",
         text: err.data.ERROR_DESCR,
       type: "error",
       confirmButtonColor: "#007AFF"
     }, function() {

    });
      console.log(err);

     })
  
        //$state.go("common.changePlan");

      

     
     }

     function currentPlanListChange(array)
     {
         var newArray = [];
         array.forEach(function(resp){
           delete resp.PLAN_ID;
           newArray.push(resp);
         })

         return newArray;
     }

     $scope.changePlanCurrent = function()
     {
       if(currentPlanList.length==0)
       {
         alert("please select atleast one plan");
       }
       else
       {
         $localStorage.ChangePlanObj = currentPlanListChange(currentPlanList);
         $state.go("common.changePlan");

       }

     }


  })
})