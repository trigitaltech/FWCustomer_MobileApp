appCtrl.controller('ticketsCtrl', function($scope,$q,$http,$location,services,$state,$ionicLoading,$localStorage,$filter) {


 $scope.$on('$ionicView.enter', function() {


 	$scope.tickets = {};


  function getTicketsMasterData()
  {
    services.ticketsMasterData().then(function(response){
      console.log(response);
      $scope.teams = response.data.TicketTeamMappingData;
      $scope.teamUsers = response.data.usersData;
    })
  }

  getTicketsMasterData();


 function getProblems()
 {
 	  services.problemService().then(function(response){
  	$scope.problemsData = response.data.problemsDatas;
    console.log(response);
  },function(err){
    console.log(err);
  })
 }


 $scope.getSubCategory = function(id)
 {
      services.problemSubCategory(id).then(function(response){
  	    $scope.subCategoryList = response.data.subCategory;
          console.log(response);
         },function(err){
            console.log(err);
           })
 }

if($location.path()=='/common/ticketsList')
{
   services.getTickets($localStorage.clientId).then(function(response){
  console.log(response);
  $scope.ticketsList = response.data;
 },function(err){
  console.log(err);
 })
}
else
{
   getProblems();

}


 $scope.addTicket = function(form)
 {

 	 var currentDate = new Date();
     var dateFormatted =  $filter('date')(currentDate,"dd MMMM yyyy");
     $scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');

var ticketObj = {
  "assignedTo": $localStorage.userId,
  "priority": "LOW",
  "teamUserId": $scope.tickets.teamUser,
  "teamCode":$scope.tickets.team,
  "sourceOfTicket": "Phone",
  "problemCode": $scope.tickets.problemId,
  "subCategory":  $scope.tickets.subCategory,
  "description": $scope.tickets.Description,
  "locale": "en",
  "dateFormat": "dd MMMM yyyy",
  "ticketDate": dateFormatted,
  "ticketURL": "",
  "ticketTime": " "+$scope.hhmmsstt
}

//  {"assignedTo":1,"priority":"LOW","sourceOfTicket":"Phone",
//  "problemCode":10,"subCategory":"Billing Problem1"
// ,"teamCode":1,"teamUserId":1,"description":"test ticket",
// "locale":"en","dateFormat":"dd MMMM yyyy","ticketDate"
// :"01 August 2018","ticketURL":"https://192.168.1.243:8443/app/#/viewTicket/10189","ticketTime":" 10:25
// "10:52 AM"}

		console.log(JSON.stringify(ticketObj));

services.addTicket(ticketObj,$localStorage.clientId).then(function(response){
	console.log(response);
                           swal({
                                title: "Tickets",
                                text: "Ticket Added Successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {

                            });
	        form.$setPristine();
            form.$setUntouched();

          $scope.tickets= {};
},function(err){
	console.log(err);
})


 }





});
 
})