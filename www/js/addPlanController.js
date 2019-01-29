appCtrl.controller('addPlanController', function($scope,$q,$http,$location,$rootScope,$cordovaInAppBrowser,$ionicHistory,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {

$localStorage.planId=undefined;
$localStorage.changePlanId=undefined;
$scope.amount = 0;
if($localStorage.selectedPlans)
{
  $scope.plansSelected = $localStorage.selectedPlans;
  
}

    function getPlanDetails()
    {
      services.getPlanDetails($localStorage.clientId,0).then(function(response){
        console.log(response);
		 $scope.planDetails = response.data.PLAN_LIST;
	  	 //$scope.city = $localStorage.city;
      },function(err){
        console.log(err);
      })
    }


    $scope.getPlansByPlanListId = function()
    {
      $ionicLoading.show();

      services.getPlansListByListId($scope.plan.CategoryId.PLAN_LIST_ID).then(resp=>{

        $ionicLoading.hide();

        console.log(resp);
        $scope.plansList = resp.data.ID_BASED_PLAN_LIST;

      },err=>{
        $ionicLoading.hide();

        console.log(err);

      })
    }




    if($location.path()=='/common/addPlan')
      getPlanDetails();

    function getIndexOfPlanArray(id)
    {
        for(var i=0;i<PlanList.length;i++)
        {
          if(PlanList[i].PLAN_ID==id)
          {
            return i;
          }
        }
    }
    var planArray = [];
    $scope.plan = {};
    $scope.planCategories = [];
    $scope.planDetails = [];



     var PlanList = [];
    //getPlanCategories();
   
    function addPlanObjectPreparation()
    {
      plansFinal = [];

      angular.forEach(PlanList,function(plans){
        delete plans.checkStatus;
        plans.POID = $localStorage.ACCOUNT_POID;
      })

      plansFinal.push({'PLAN_LIST_NAME':$scope.plan.CategoryId.PLAN_LIST_NAME,
           'CITY':$scope.plan.CategoryId.CITY,'PLAN_LIST_ID':$scope.plan.CategoryId.PLAN_LIST_ID,
           'SERVICE_TYPE':$scope.plan.CategoryId.SERVICE_TYPE,PLANS:PlanList})
    
      // var planPostObject = [];
      //   angular.forEach($scope.planDetails,function(plansList,outerIndex){
		  // planPostObject.push({'PLAN_LIST_NAME':plansList.PLAN_LIST_NAME,
      //     'CITY':plansList.CITY,'PLAN_LIST_ID':plansList.PLAN_LIST_ID,
      //     'SERVICE_TYPE':plansList.SERVICE_TYPE,PLANS:[]})
      //     angular.forEach(PlanList,function(plan,innerIndex){
      //       if(PlanList[innerIndex].plan.PLAN_LIST_ID==plansList.PLAN_LIST_ID)
      //       {
      //          delete plan.plan.CITY;
      //          delete plan.plan.PLAN_LIST_ID;
      //          delete plan.plan.PLAN_LIST_NAME;
      //          //delete plan.plan.SERVICE_TYPE;
      //          delete plan.plan.checkStatus;
      //          delete plan.plan['$$hashKey'];
			//    planPostObject[outerIndex].PLANS.push(plan.plan);
      //       }

      //     })
      //   })
         return plansFinal;

    }
    

    $scope.back = function()
    {
      $ionicHistory.goBack() 
    }
    

    //check box click event
    $scope.planSelected = function(plans,plan)
    {

      $scope.errorMsg=""

    
            if(plans.checkStatus)
            {
              
			  //  plan.PLAN_LIST_ID = plans.PLAN_LIST_ID;
        //        plan.CITY = plans.CITY;
        //        plan.PLAN_LIST_NAME = plans.PLAN_LIST_NAME;
        //        plan.SERVICE_TYPE = plans.SERVICE_TYPE;
        //        plan.PLAN_SUBTYPE = "100"
			   
			  //  plan.PLAN_CODE = plans.CODE;
		
               PlanList.push(plans);
            }
            else
            {
              PlanList.splice(getIndexOfPlanArray(plans.PLAN_ID),1);
              console.log(PlanList);   
                 
            }
    }



	
	
    $scope.showPlansSelected = function()
    {
      if(PlanList.length==0)
      {
        alert('No Plans Has Been Selected');

      }
      else
      {
        $localStorage.selectedPlans = addPlanObjectPreparation();
		$localStorage.amount =0;
    //console.log(JSON.stringify($localStorage.selectedPlans));
    var priceObj = {"PLANCODES":getPlansCodes()};
    var obj = JSON.parse(angular.toJson(priceObj));

    services.getPlanPrice(obj).then(response=>{

      console.log(response);
      $localStorage.amount = response.data;		
      $state.go('common.selectedPlanList');

    },error=>{
      console.log(error);
    })
      }
    }
    $scope.totalPrice = $localStorage.amount;
    function getPlansCodes()
    {
      var planCodesArray = [];
		for(var i=0;i<$localStorage.selectedPlans.length;i++){
			if($localStorage.selectedPlans[i].PLANS.length !=0){
        //break;
        for(var j=0;j<$localStorage.selectedPlans[i].PLANS.length;j++){
          planCodesArray.push($localStorage.selectedPlans[i].PLANS[j].CODE);
				}
			}
		}
		 return planCodesArray;
    }

    function postObject(array)
    {
      var postArray = [];
      angular.forEach(array,function(element,index){
        if(element.PLANS.length>0)
        {
          postArray.push(array[index]);
        }
      })

      return postArray;

    }

    $localStorage.addPlanCompleted=1;
	
    $scope.paytm =function()
    {

    console.log($localStorage.amount); 
    if($localStorage.amount=="0" || $localStorage.amount=="0.00")
    {
      $scope.addPlans("","CASH");

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
      $cordovaInAppBrowser.open('http://123.63.148.119:2462/paytm_java/pgRedirect.jsp?TXN_AMOUNT='+$localStorage.amount+'&ORDER_ID='+orderId+'&CUST_ID='+custid+'&LCOID='+$localStorage.LCO_ACCOUNT_NO, '_blank', options)
      //$cordovaInAppBrowser.open('http://123.63.148.119:2462/paytm_java/WebContent/pgRedirect.jsp?TXN_AMOUNT='+$localStorage.amount+'&ORDER_ID='+orderId+'&CUST_ID='+custid, '_blank', options)
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
      
      if(event.url=="http://123.63.148.119:2462/paytm_java/pgResponse.jsp")
      {
        if($localStorage.addPlanCompleted!='0')
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
          $scope.addPlans(CARD_TRANSACTION_ID,cardtype);
          $cordovaInAppBrowser.close();
        }
       
      }
  
  
    });
  
	

    $scope.addPlans = function(txn,payType)
    {

      $ionicLoading.show();
      var paymentObj = {
        "STATE":$localStorage.STATE,"ACCOUNT_NO":$localStorage.ACCOUNT_NO,
    "CUSTOMER_NAME":$localStorage.ACCOUNT_NO,"DUE_DATE":$localStorage.DUE_DATE,
    "ADDRESS":$localStorage.ADDRESS,"PREVIOUS_OUTSTANDING":$localStorage.PREVIOUS_OUTSTANDING,
    "ACCOUNT_OBJ":$localStorage.ACCOUNT_OBJ,"LAST_INVOICE":$localStorage.LAST_INVOICE,
    "MSO_FLD_AGREEMENT_NO":$localStorage.MSO_FLD_AGREEMENT_NO,"SERVICE_OBJ":$localStorage.SERVICE_OBJ, 
    "PLAN_NAME":$localStorage.selectedPlans[0].PLAN_LIST_NAME,"MOBILE_NO":$localStorage.MOBILE_NO,
    "ACCOUNT_POID": $localStorage.ACCOUNT_POID,"CITY":$localStorage.CITY,
    "EMAIL_ID":$localStorage.EMAIL_ID,"PAY_TYPE":payType,
    "PAID_AMOUNT":$localStorage.amount,"CASH_DATE":new Date(),
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
     console.log(paymentObj);
     var obj =  JSON.parse(angular.toJson(paymentObj))

     services.addPayment(obj).then(function(response){
      console.log(response);
      $localStorage.addPlanCompleted=0;
      var addPlanObject = {"ACCOUNT_NO":$localStorage.ACCOUNT_NO,"ACCOUNT_POID": $localStorage.ACCOUNT_POID,
           "SERVICE_OBJ": $localStorage.SERVICE_OBJ,"PLAN_LIST":postObject($localStorage.selectedPlans)};  
         
           var obj =  JSON.parse(angular.toJson(addPlanObject))
      services.addPlan(obj).then(function(response){
        $ionicLoading.hide();

        $localStorage.addPlanCompleted=1;
      
        console.log(response);
                              swal({
                                title: "Plan",
                                 text: "Plans Added Successfully",
                               type: "success",
                               confirmButtonColor: "#007AFF"
                             }, function() {

                            });

                              $state.go('common.customerSearch');

      },function(err){


        $ionicLoading.hide();

        console.log(err);
        $localStorage.addPlanCompleted=1;
        var ticketobj = {
          "CUST_ACCOUNT_NO":$localStorage.ACCOUNT_NO,
        "NOTES_TYPE":"complaint",
          "CUSTOMER_NOTES":	"add Plan failed"
      
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
      //     title: "Add Plan",
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

    
           
     

    }
	
	
    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
 
})