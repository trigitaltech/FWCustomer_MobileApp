appCtrl.controller('paymentController', function($scope,$state,$filter,services,$localStorage,$ionicLoading) {


 $scope.$on('$ionicView.enter', function() {

$localStorage.planId=undefined;
$localStorage.changePlanId=undefined;
   $scope.Payment= {}; 
   $scope.showChequeDetails = false;

   $scope.paymentChange = function(value)
   {
       if(value=="CHEQUE")
       $scope.showChequeDetails=true;
       else
       $scope.showChequeDetails=false

   }

   $scope.paymentType = [{
            "key": "CASH",
            "name": "CASH"
            
        }, {
            "key": "CHEQUE",
            "name": "CHEQUE"
            
        }];


        $scope.addPayment = function(form)
        {

            swal({
                title: "Are You Sure",
                text: "Do You Want to Proceed to Payment",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes Proceed",
                cancelButtonText: "No Cancel",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {

                    // if(navigator.geolocation)
                    // {
                    // navigator.geolocation.getCurrentPosition(function(coords){
                       //console.log(location);

                       var paymentObj = {
                        "STATE":$localStorage.STATE,"ACCOUNT_NO":$localStorage.ACCOUNT_NO,
                    "CUSTOMER_NAME":$localStorage.ACCOUNT_NO,"DUE_DATE":$localStorage.DUE_DATE,
                    "ADDRESS":$scope.Payment.address,"PREVIOUS_OUTSTANDING":$localStorage.PREVIOUS_OUTSTANDING,
                    "ACCOUNT_OBJ":$localStorage.ACCOUNT_OBJ,"LAST_INVOICE":$localStorage.LAST_INVOICE,
                    "MSO_FLD_AGREEMENT_NO":$localStorage.MSO_FLD_AGREEMENT_NO,"SERVICE_OBJ":$localStorage.SERVICE_OBJ, 
                    "PLAN_NAME":" ","MOBILE_NO":$scope.Payment.mobileNumber,
                    "ACCOUNT_POID": $localStorage.ACCOUNT_POID,"CITY":$localStorage.CITY,
                    "EMAIL_ID":$scope.Payment.emailId,"PAY_TYPE":$scope.Payment.paymentKey,
                    "PAID_AMOUNT":$scope.Payment.amountPaid,"CASH_DATE":$scope.Payment.date,
                    "REMARKS":$scope.Payment.remarks,"ALTERNATE_MOBILE_NO": $scope.Payment.mobileNumber,
                    "ALTERNATE_EMAIL_ID": $scope.Payment.emailId,
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
                    "CARD_TRANSACTION_ID": "TPR-45644464346444"
                  
                     };

                     $localStorage.CASH_DATE = $scope.Payment.date;
                     $localStorage.remarks = $scope.Payment.remarks;
                     $localStorage.amountPaid = $scope.Payment.amountPaid;



                     if($scope.showChequeDetails)
                     {
                        paymentObj.BANK_NAME = $scope.Payment.bankName;
                        paymentObj.CHEQUE_NUMBER = $scope.Payment.chequeNumber;
                        paymentObj.CHEQUE_DATE = $scope.Payment.chequeDate;
                        $localStorage.paymentType= 'CHEQUE'
                        $localStorage.BANK_NAME = $scope.Payment.bankName;
                        $localStorage.CHEQUE_NUMBER = $scope.Payment.chequeNumber;
                        $localStorage.CHEQUE_DATE = $scope.Payment.chequeDate;
                     }
                     else
                     {
                        $localStorage.paymentType= 'CASH';

                     }

                   
                        
                           var obj =  JSON.parse(angular.toJson(paymentObj))
                     
                           $ionicLoading.show();
    
             services.addPayment(obj).then(function(response){
                $ionicLoading.hide();
                $state.go('common.receipt');
                           swal({
                                title: "Payment",
                                text: "Payment Completed" ,
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            });
              console.log(response)
              $localStorage.receiptNumber = response.data.OBRM_RECEIPT_NO;
              $localStorage.referenceId = response.data.REFERENCE_ID;
                form.$setPristine();
                form.$setUntouched();
    
              $scope.Payment= {}; 
    
             },function(err){
               console.log(err);
               swal({
                title: "Payment",
                 text: err.data.ERROR_DESCR,
               type: "error",
               confirmButtonColor: "#007AFF"
             }, function() {
        
            });
    
             });
                    // });
                   // }
                } else {
                    swal({
                        title: "Payment Cancelled",
                        text: "Payment Not Done",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });

  

        }

  
})
 })