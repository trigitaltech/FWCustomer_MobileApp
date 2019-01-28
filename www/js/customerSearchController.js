appCtrl.controller('customerSearchController', function($scope,$ionicPopup,$rootScope,$cordovaInAppBrowser,$ionicLoading,$filter,$stateParams,$http,$state,services,$localStorage) {
  
$scope.$on('$ionicView.enter', function() {

   $localStorage.planId=undefined;
   $localStorage.changePlanId=undefined;
   $scope.customerDataShow = false;
   $scope.searchCustomer = true;
   $scope.errorMsg= "";
   $scope.roundNumber = function(num)
   {
     var number = parseFloat(num);
     return  number.toFixed(2);
   }

   $scope.checkNegativeNumber = num=>{
    var number = parseFloat(num).toFixed(2);
     return number.toString().includes('-') || number.toString()=='0.00'
   }

   
 
  $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){

  });

  $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){

  });

  var CARD_TRANSACTION_ID ;
  var PAY_TYPE;

  $scope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
    //console.log(event.url.indexOf('https://securegw-stage.paytm.in'));
    //console.log(event.url.search());
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
     
      //if($localStorage.paymentCompleted!='0')
        //{
          console.log(PAY_TYPE);
          console.log(CARD_TRANSACTION_ID);
          var cardtype = 'CARD';
          if(PAY_TYPE=='CC')
          {
            cardtype="CREDIT"
          }
          else if(PAY_TYPE=='DC')
          {
            cardtype = "DEBIT"
          }
        
          callPaymentApi(CARD_TRANSACTION_ID,cardtype);
          $cordovaInAppBrowser.close();
        //}
    }


  });

  $localStorage.paymentCompleted=1;

  function callPaymentApi(txn,paytype)
  {
    $localStorage.paymentCompleted=0;

    //if(navigator.geolocation)
    //{
      //navigator.geolocation.getCurrentPosition(function(coords){

        var paymentObj = {
          "STATE":$localStorage.STATE,"ACCOUNT_NO":$localStorage.ACCOUNT_NO,
      "CUSTOMER_NAME":$localStorage.ACCOUNT_NO,"DUE_DATE":$localStorage.DUE_DATE,
      "ADDRESS":$scope.customerData.ADDRESS,"PREVIOUS_OUTSTANDING":$localStorage.PREVIOUS_OUTSTANDING,
      "ACCOUNT_OBJ":$localStorage.ACCOUNT_OBJ,"LAST_INVOICE":$localStorage.LAST_INVOICE,
      "MSO_FLD_AGREEMENT_NO":$localStorage.MSO_FLD_AGREEMENT_NO,"SERVICE_OBJ":$localStorage.SERVICE_OBJ, 
      "PLAN_NAME":" ","MOBILE_NO":$scope.customerData.MOBILE_NO,
      "ACCOUNT_POID": $localStorage.ACCOUNT_POID,"CITY":$localStorage.CITY,
      "EMAIL_ID":$scope.customerData.EMAIL_ID,"PAY_TYPE":paytype,
      "PAID_AMOUNT":$localStorage.amountPaid,"CASH_DATE":new Date(),
      "REMARKS":"","ALTERNATE_MOBILE_NO": $scope.customerData.MOBILE_NO,
      "ALTERNATE_EMAIL_ID": $scope.customerData.EMAIL_ID,
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
       $localStorage.CASH_DATE = new Date();
       $localStorage.remarks = '';
       //$localStorage.amountPaid = $scope.Payment.amountPaid;
       var obj =  JSON.parse(angular.toJson(paymentObj))

       services.addPayment(obj).then(function(response){
        $localStorage.paymentCompleted=1;
        $localStorage.receiptNumber = response.data.OBRM_RECEIPT_NO;
        $localStorage.referenceId = response.data.REFERENCE_ID;


        swal({
          title: "Payment",
          text: "Payment Completed" ,
          type: "success",
          confirmButtonColor: "#007AFF"
      });
      console.log(response);
      $state.go('common.receipt');

       },function(err){
        //$state.go('common.receipt');

        swal({
          title: "Payment",
           text: err.data.ERROR_DESCR,
         type: "error",
         confirmButtonColor: "#007AFF"
       }, function() {
  
      });
         console.log(err);
       })

      // },function(err){
      //   console.log(err);
      // })
   // }
    

  }

    $scope.paytm =function(amount)
    {
      var custid = $localStorage.ACCOUNT_POID.split(' ')[2];
      $localStorage.amountPaid = amount

      var orderId = (new Date()).getTime() ;
      var options = {
        location: 'no',
        clearcache: 'yes',
        toolbar: 'no'
      };
  
    document.addEventListener("deviceready", function () {
      $cordovaInAppBrowser.open('http://123.63.148.119:2462/paytm_java/pgRedirect.jsp?TXN_AMOUNT='+$localStorage.amountPaid+'&ORDER_ID='+orderId+'&CUST_ID='+custid+'&LCOID='+$localStorage.LCO_ACCOUNT_NO, '_blank', options)
      //$cordovaInAppBrowser.open('http://123.63.148.119:2462/paytm_java/WebContent/pgRedirect.jsp?TXN_AMOUNT='+$localStorage.amountPaid+'&ORDER_ID='+orderId+'&CUST_ID='+custid, '_blank', options)
        .then(function(event) {
          // success
        })
        .catch(function(event) {
          // error
        });
  
  
      //$cordovaInAppBrowser.close();
  
    }, false);
    }

 
   
   var popup;
        $scope.categoryType = [{
          "key": "ACC",
          "name": "Account No"
          
      }, {
          "key": "VC",
          "name": "VC"
          
      }, {
          "key": "STB",
          "name": "STB"
         
      }, {
          "key": "RMN",
          "name": "RMN"
         
      }];
  $scope.category = {};
 

 

  $scope.activePlansData = $localStorage.planDetails


  $scope.search = function()
  {

    $ionicLoading.show();
    services.getCustomerInformation($scope.category.categoryKey,$scope.category.categoryValue).then(function(response){
           console.log(response);
           $scope.customerDataShow = true;
           $scope.customerData = response.data;
           $scope.activePlansData = response.data.PLAN_DETAIL;
           $localStorage.planDetails = response.data.PLAN_DETAIL;
           $localStorage.ACCOUNT_NO = response.data.ACCOUNT_NO;
           $localStorage.ACCOUNT_POID = response.data.ACCOUNT_POID;
           $localStorage.ACCOUNT_OBJ = response.data.ACCOUNT_OBJ;
           $localStorage.SERVICE_OBJ = response.data.SERVICE_OBJ;
           $localStorage.CUSTOMER_NAME = response.data.CUSTOMER_NAME;
           $localStorage.STATE = response.data.STATE;
           $localStorage.DUE_DATE = response.data.DUE_DATE;
           $localStorage.PREVIOUS_OUTSTANDING = response.data.PREVIOUS_OUTSTANDING;
           $localStorage.LAST_INVOICE = response.data.LAST_INVOICE;
           $localStorage.MSO_FLD_AGREEMENT_NO = response.data.MSO_FLD_AGREEMENT_NO;
           $localStorage.CITY = response.data.CITY;
           response.data.type = $localStorage.customerType ;
           $localStorage.LCO_ACCOUNT_NO = response.data.LCO_ACCOUNT_NO;
           $localStorage.MOBILE_NO = response.data.MOBILE_NO;
           $localStorage.EMAIL_ID = response.data.EMAIL_ID;
           $localStorage.ADDRESS = response.data.ADDRESS;
         
           

           $ionicLoading.hide();

    },function(err){
       $ionicLoading.hide();
       $scope.customerDataShow = false;
      $scope.errorMsg = "Customer Data Not Found"
      console.log(err);
    })
  }


  if($localStorage.categoryKey != undefined && $localStorage.categoryValue!=undefined)
  {
       $scope.category.categoryKey= $localStorage.categoryKey;
      $scope.category.categoryValue = $localStorage.categoryValue;

      $scope.search();

      
  }

  $scope.closePopupActivity=function(){
  activityPopup.close();

}


  $scope.AddPlan = function()
  {
    $state.go('common.addPlan');
    //$scope.closePopupActivity();
  }

  $scope.cancelPlan = function()
  {
    $state.go('common.cancelPlan');
       // $scope.closePopupActivity();

  }

   $scope.payment = function()
  {
    $state.go('common.payment');
    
  }

   $scope.Ticket = function()
  {
    $state.go('common.ticket');
    
  }




  $scope.tickets = function(type)
  {
    if(type=='tickets')
    {
          $state.go('common.tickets')

    }
    else
    {
          $state.go('common.ticketsList')

    }
  }

   $scope.changePlan = function()
  {
    $state.go('common.changePlanCurrent');
        //$scope.closePopupActivity();

  }
   $scope.renewalPlan = function()
  {
    $state.go('common.renewalPlan');
        $scope.closePopupActivity();

  }

  $scope.SuspendPlan = function(type)
  {

    $localStorage.type = type;
	
     popup = $ionicPopup.show({
                    templateUrl: 'templates/suspendPlanPopUp.html',
                    title: '<b>'+$localStorage.type+'</b>',
                    scope: $scope

                });
  }

  var activityPopup;


  $scope.showPlanActivities = function(service)
  {

         $localStorage.clientServiceId = service.id;
        $localStorage.clientServicePoId = service.clientServicePoId;
        if(service.status=="ACTIVE")
        {
          $scope.suspendTab = true;
        }
        else
        {
          $scope.suspendTab = false;
        }


    activityPopup = $ionicPopup.show({
                    templateUrl: 'templates/popupPlanActivities.html',
                    title: '<b>Services Activities</b>',
                    scope: $scope

                });
  }


  $scope.reactivate = function(type)
  {
         var currentDate = new Date();
      var dateFormatted =  $filter('date')(currentDate,"dd MMMM yyyy");
      var obj = {"locale":"en","clientId":$localStorage.clientId,
                 "suspensionDate":dateFormatted,
                  "clientPoId":$localStorage.clientPoId,
                 "clientServicePoId":$localStorage.clientServicePoId,
                 "dateFormat":"dd MMMM yyyy",
                 "suspensionReason":$scope.suspend.selectedReason}

 $ionicLoading.show();

    services.reactivateService(obj).then(function(response){
      console.log(response);
       $ionicLoading.hide();
        $scope.category.categoryKey= $localStorage.categoryKey;
      $scope.category.categoryValue = $localStorage.categoryValue;

      $scope.search();
                            swal({
                                title: "Service",
                                text: "Service Re-activated",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {

                            });
      $scope.closePopup();
      $scope.closePopupActivity();
    },function(err){
      console.log(err);
      $ionicLoading.hide();
    })  
  }

  $scope.closePopup = function()
  {
    popup.close();
  }

  $scope.suspend = {};

  $scope.showPlansInfo = function()
  {
    $state.go("common.planInfo");
  }

  $scope.suspendPlanSubmit = function()
  {

    if($localStorage.type=="suspend")
    {
     var suspendService = {"ACCOUNT_NO":$localStorage.ACCOUNT_NO,"CUSTOMER_NAME":$localStorage.CUSTOMER_NAME,"ACCOUNT_POID": $localStorage.ACCOUNT_POID,
      "SERVICE_OBJ": $localStorage.SERVICE_OBJ, "DESCR":$scope.suspend.selectedReason};
            var obj =  JSON.parse(angular.toJson(suspendService));
    console.log(JSON.stringify(obj));
    services.suspendService(obj).then(function(response){
      console.log(response);
                           swal({
                                title: "Service",
                                text: "Service Suspended Successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {

                            });

    },function(err){
      console.log(err);
      $ionicLoading.hide();
      $scope.closePopup();
                         
                            //    swal({
                            //     title: "Service",
                            //     text: "Service Suspension Error",
                            //     type: "error",
                            //     confirmButtonColor: "#007AFF"
                            // }, function() {

                            // });
    })             
    }
    else if($localStorage.type=="reactivate")
    {
       /*var currentDate = new Date();
      var dateFormatted =  $filter('date')(currentDate,"dd MMMM yyyy");
      var obj = {"locale":"en","clientId":$localStorage.clientId,
                 "suspensionDate":dateFormatted,
                 "clientPoId":$localStorage.clientPoId,
                 "clientServicePoId":$localStorage.clientServicePoId,
                 "dateFormat":"dd MMMM yyyy",
                 "suspensionReason":$scope.suspend.selectedReason}*/
      var reactivate = {"ACCOUNT_NO":$localStorage.ACCOUNT_NO,"CUSTOMER_NAME":$localStorage.CUSTOMER_NAME,"ACCOUNT_POID": $localStorage.ACCOUNT_POID,
       "SERVICE_OBJ": $localStorage.SERVICE_OBJ, "DESCR":$scope.suspend.selectedReason};
             var obj =  JSON.parse(angular.toJson(reactivate))

 $ionicLoading.show();

    services.reactivateService(obj).then(function(response){
      console.log(response);
       $ionicLoading.hide();
                            swal({
                                title: "Service",
                                text: "Service Re-activated",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {

                            });
      $scope.closePopup();
            $scope.closePopupActivity();

    },function(err){
      console.log(err);
      $ionicLoading.hide();
      $scope.closePopup();

    })  


    }

     
  }


  $scope.retrackPlan = function()
  {
          $scope.closePopupActivity();

    var retrackObj = {"requestMessage":[{"Activation":"true"}],
                      "requestType":"RETRACK",
                      "clientServiceId":$localStorage.clientServiceId,
                      "type":"single",
                      "clientId":$localStorage.clientId}


                swal({
                title: "Are You Sure",
                text: "Do You Want to Retrack",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes Proceed",
                cancelButtonText: "No Cancel",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {

                

         services.retrackPost(retrackObj).then(function(response){
          console.log(response);
                       swal({
                            title: "Retrack",
                            text: "Retracked Successfully" ,
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
        

         },function(err){
           console.log(err);
                   swal({
                        title: "Retrack",
                        text: "Retrack Error",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });

         })


                   
                } else {
                    swal({
                        title: "Retrack",
                        text: "Retrack Not Done",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });


  }
  if($localStorage.customerType=="C")
  {
    $scope.category.categoryKey ="ACC" 
    $scope.category.categoryValue = $localStorage.userName;
    $scope.customerSearch = true;
    $scope.loginType = "Customer Details"
    $scope.search();

  }
  else
  {
    $scope.loginType = "Customer Search"

    $scope.customerSearch = false;
  }


})

})
