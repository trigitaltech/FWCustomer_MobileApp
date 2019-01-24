appCtrl.controller('receiptCtrl', function($scope,$http,$location,services,$state,$ionicLoading,$localStorage,$filter) {


    $scope.$on('$ionicView.enter', function() {
   
   
     
   
      $scope.receiptDetails = {
          "ACCOUNT_NO": $localStorage.ACCOUNT_NO,
          "ADDRESS": $localStorage.ADDRESS,
          "CUSTOMER_NAME": $localStorage.CUSTOMER_NAME,
          "EMAIL_ID": $localStorage.EMAIL_ID,
          "MOBILE_NO": $localStorage.MOBILE_NO,
          "CASH_DATE": $localStorage.CASH_DATE,
          "paymentType": $localStorage.paymentType,
          "BANK_NAME": $localStorage.BANK_NAME,
          "CHEQUE_NUMBER": $localStorage.CHEQUE_NUMBER,
          "CHEQUE_DATE": $localStorage.CHEQUE_DATE,
          "receiptNumber": $localStorage.receiptNumber,
          "remarks": $localStorage.remarks,
          "amountPaid": $localStorage.amountPaid
          




      }
   
   
    
   
   
   
   
   
   });
    
   })