
/*
$http({
method : 'PUT',
headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic YWRtaW46YWRtaW4='},
url : 'https://demo.trigital.in/obsplatform/api/v1/orders/13',
data :{"disconnectReason":"Payment Due","description":"test cancel","dateFormat":"dd MMMM yyyy","disconnectionDate":"31 March 2018","locale":"en"}
}).then(function(response){
$scope.data_two = response.data;
console.log(response.data);
}); */

/*
$http({
method : 'GET',
headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic YWRtaW46YWRtaW4='},
url : 'https://demo.trigital.in/obsplatform/api/v1/orders/template?clientId=3&planId=2',
}).then(function(response){
$scope.data_two = response.data;
console.log(response.data);
}); */

/*
$http({
method : 'PUT',
headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic YWRtaW46YWRtaW4='},
url : 'https://demo.trigital.in/obsplatform/api/v1/orders/changePlan/2',
data :{"billAlign":true,"planCode":1, "contractPeriod":1,"paytermCode":"Monthly","clientServiceId":"1","isNewplan":false,"locale":"en","dateFormat":"dd MMMM yyyy","start_date":"04 March 2018","disconnectionDate":"04 March 2018","disconnectReason":"Not Interested"}
}).then(function(response){
$scope.data_three = response.data;
console.log(response.data);
}); */

/*
$http({
method : 'POST',
headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic YWRtaW46YWRtaW4='},
url : 'https://demo.trigital.in/obsplatform/api/v1/payments/3' */