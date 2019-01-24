angular.module('RestAPIServices', ['ApiConfig'])


.factory('services',function($http,config,$localStorage){
  return{
     loginMethod: function(loginObj)
     {
      var apiUrl = config.API_URL+'login';
      var req = {
        method: 'POST',
        url: apiUrl,
        headers: {
              'CREDS': JSON.stringify(loginObj)
         }		
      }
     return $http(req);
     },
     getCustomerInformation: function(key,value)
     {
      var apiUrl = config.API_URL+'getCustomerInfo';
      var req = {
        method: 'POST',
        url:apiUrl,
        headers: {
          'CREDS': $localStorage.loginObj,
          'Type': key,
          'PARAMS': value
        }
      }

      return $http(req);
     },
     getPlanDetails: function(clientId,planId)
     {
      var obj ={"USERID":"MOBILEAPP","PASSWORD":"Fastway@123","DEVICEIMEI":"352356079376711"} 

      var apiUrl = config.API_URL+'getPlanList';
      var req = {
        method: 'POST',
        url:apiUrl,
        headers: {
          'CREDS': JSON.stringify(obj)
        }
      }

      return $http(req);
     },
     getPlansListByListId: function(header2)
     {
      var obj ={"USERID":"MOBILEAPP","PASSWORD":"Fastway@123","DEVICEIMEI":"352356079376711"} 

      var apiUrl = config.API_URL+'getPlanListByID';
      var req = {
        method: 'POST',
        url:apiUrl,
        headers: {
          'CREDS': JSON.stringify(obj),
          'PLAN_LIST_ID': header2
        }
      }

      return $http(req);
     },
    addPlan: function(params)
    {
        var obj ={"USERID":"MOBILEAPP","PASSWORD":"Fastway@123","DEVICEIMEI":"352356079376711"} 
		
      var apiUrl = config.API_URL+'addPlan';

      var req = {
        method: 'POST',
        url:apiUrl,
        headers: {
          'CREDS':  JSON.stringify(obj),
          'PARAMS': JSON.stringify(params)
        }
      }

      return $http(req);
    },
     addPayment: function(params)
	    {
        var apiUrl = config.API_URL+'makePayment';
        
	      var req = {
	        method: 'POST',
	        url:apiUrl,
	        headers: {
	          'CREDS': $localStorage.loginObj,
	          'PARAMS': JSON.stringify(params)
	        }
	      }

	      return $http(req);
	    },
    cancelPlan: function(params)
    {
      
       /* var apiUrl = $localStorage.API_URL+'orders/'+planId;
       return $http({
        method : 'PUT',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: planObj
         }) */
       var apiUrl = config.API_URL+'cancelPlan';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(config.CREDObj),
           'PARAMS': JSON.stringify(params)
         }}
     
	   return $http(req);
    },
    changePlan: function(params)
    {
      
    
       var apiUrl = config.API_URL+'changePlan';

       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(config.CREDObj),
           'PARAMS': JSON.stringify(params)
         }}
     return $http(req);
    },
    packageCount: function(params)
    {
		var obj ={"USERID":"NARINDER1","PASSWORD":"Fastway@123","DEVICEIMEI":"352356079376711"} 
       var apiUrl = config.API_URL+'subscriberWiseActivePkgCount';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(obj)
         }}
     return $http(req);
    },
	
    tickets: function(params)
    {
		
       var apiUrl = config.API_URL+'viewTickets';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(config.CREDObj),
		   'PARAMS': 7
         }}
     return $http(req);
    },
    addTicket: function(params)
    {
      var apiUrl = config.API_URL+'createTicket';
      
      var req = {
        method: 'POST',
        url:apiUrl,
        headers: {
          'CREDS': JSON.stringify(config.CREDObj),
          'PARAMS': JSON.stringify(params)
        }
      }

      return $http(req);
    },
	
    bills: function(params)
    {
		
       var apiUrl = config.API_URL+'getCustomerBills';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(config.CREDObj),
		   'ACC': JSON.stringify(params)
         }}
     return $http(req);
    },
	
	
    payments: function(params)
    {
		
       var apiUrl = config.API_URL+'getReceipts';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(config.CREDObj),
		       'PARAMS': params
         }}
     return $http(req);
    },
	
	
    subscriberCount: function()
    {
      var obj ={"USERID":"NARINDER1","PASSWORD":"Fastway@123","DEVICEIMEI":"352356079376711"} 

       var apiUrl = config.API_URL+'totalSubscriberCount';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(obj)
         }}
     return $http(req);
    },
    collectionReport: function(params)
    {
       var apiUrl = config.API_URL+'dailyAndWeeklyCollectionReport';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(config.CREDObj)
         }}
     return $http(req);
    },
    getPlanPrice: function(params)
    {
      var obj ={"USERID":"MOBILEAPP","PASSWORD":"Fastway@123","DEVICEIMEI":"352356079376711"} 
       var apiUrl = config.API_URL+'getPlanPrice';
       var req = {
         method: 'POST',
         url:apiUrl,
         headers: {
           'CREDS': JSON.stringify(obj),
           'PARAMS': JSON.stringify(params)
         }}
     return $http(req);
    },
    suspendService: function(params)
    {
      /*
       var apiUrl = $localStorage.API_URL+'clientservice/suspend/'+clientServiceId;
       return $http({
        method : 'PUT',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: planObj
         })*/
        var apiUrl = config.API_URL+'suspendService';
        var req = {
          method: 'POST',
          url:apiUrl,
          headers: {
            'CREDS': $localStorage.loginObj,
            'PARAMS': JSON.stringify(params)
          }
        }

        return $http(req);
    },
    reactivateService: function(params)
    /*{
      
       var apiUrl = $localStorage.API_URL+'clientservice/reactive/'+clientServiceId;
       return $http({
        method : 'PUT',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: planObj
         })
    },*/
    {
      var apiUrl = config.API_URL+'reactivateService';
      var req = {
        method: 'POST',
        url:apiUrl,
        headers: {
          'CREDS': $localStorage.loginObj,
          'PARAMS': JSON.stringify(params)
        }
      }

      return $http(req);
    },
	
	
	
    problemService: function()
    {
      
       var apiUrl = $localStorage.API_URL+'tickets/template';
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
    problemSubCategory: function(id)
    {
      
       var apiUrl = $localStorage.API_URL+'tickets/subcategory?category='+id;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
    /*addTicket: function(ticketObj,clientId)
    {
        var apiUrl = $localStorage.API_URL+'tickets/ticketing/'+clientId;
       return $http({
        method : 'POST',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization': 'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: ticketObj
         })
    },*/

    getTickets: function(clientId)
    {
       var apiUrl = $localStorage.API_URL+'tickets/'+clientId;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },

    getPlanCategoryies: function()
    {
       var apiUrl = $localStorage.API_URL+'usercataloge/salesPlanCategory?category=all';
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },

     getPlansNewService: function(categoryId,cliendId,clientServiceId)
    {
       var apiUrl = $localStorage.API_URL+'salescataloge/salescataloges/'+categoryId+'?clientId='+cliendId+'&clientServiceId='+clientServiceId+'&planId=0';
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'Origin' : 'https://demo1.trigital.in', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
    addPlanNew: function(plansObj,clientId)
    {
        var apiUrl = $localStorage.API_URL+'multipleorders/'+clientId;
       return $http({
        method : 'POST',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json',  'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: plansObj
         })
    },
    getPlanCategoriesForActivation: function()
    {
       var apiUrl = $localStorage.API_URL+'usercataloge/salesPlanCategory?category=Base+Pack';
       //var apiUrl = $localStorage.API_URL+'orders/template?planId=0&salesPlanCategoryId=248' ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
    getPlansListForActivation: function(id)
    {
       //var apiUrl = $localStorage.API_URL+'usercataloge/salesPlanCategory?category=Base+Pack';
       var apiUrl = $localStorage.API_URL+'orders/template?planId=0&salesPlanCategoryId='+id ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
     customerActivation: function(activationObj)
    {
        var apiUrl = $localStorage.API_URL+'activationprocess/customeractivation';
       return $http({
        method : 'POST',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json',  'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: activationObj
         })
    },
    retrackPost: function(retracKobj)
    {
      var apiUrl = $localStorage.API_URL+'orders/retrackOsdmessage';
       return $http({
        method : 'POST',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json',  'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: retracKobj
         })
    },
    changePassword: function(params)
    
     /* var apiUrl = $localStorage.API_URL+'users/'+userId;
       return $http({
        method : 'PUT',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json',  'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: passwordObj
         }) 
	 ########

     getCustomerInformation: function(key,value)
     {
      var apiUrl = config.API_URL+'getCustomerInfo';
      var req = {
        method: 'POST',
        url:apiUrl,
        headers: {
          'CREDS': $localStorage.loginObj,
          'Type': key,
          'PARAMS': value
	 
	 
	 */
     {
      
         var apiUrl = config.API_URL+'changePassword';
         var req = {
           method: 'POST',
           url:apiUrl,
           headers: {
             'CREDS': $localStorage.loginObj,
             'PARAMS': params
           }
         }

         return $http(req);
     },
    getServicesListForActivation: function()
    {
       //var apiUrl = $localStorage.API_URL+'usercataloge/salesPlanCategory?category=Base+Pack';
       var apiUrl = $localStorage.API_URL+'clientservice/template' ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
    getCitiesListForActivation: function()
    {
       //var apiUrl = $localStorage.API_URL+'usercataloge/salesPlanCategory?category=Base+Pack';
       var apiUrl = $localStorage.API_URL+'address/template' ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },

    getCASListForActivation: function(serviceId)
    {

       //var apiUrl = $localStorage.API_URL+'usercataloge/salesPlanCategory?category=Base+Pack';
       var apiUrl = $localStorage.API_URL+'clientservice/servicedetails/'+serviceId+'/?paramCategory=S' ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
     getOfficesListForActivation: function(serviceId)
    {

       var apiUrl = $localStorage.API_URL+'offices' ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },
     ticketsMasterData: function()
    {

       var apiUrl = $localStorage.API_URL+'tickets/template' ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },

     getDashBoardData: function()
    {

       var apiUrl = $localStorage.API_URL+'clients/dashboard' ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },

    getChangePlansData: function(clientId,clientServiceId,planId,salesCatalogeId)
    {

       var apiUrl = $localStorage.API_URL+'orders/template?clientId='+clientId+'&clientServiceId='+clientServiceId+'&planId='+planId+'&salesCatalogeId='+salesCatalogeId ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },

    getRenewalTypes: function(orderId,planType)
    {

       var apiUrl = $localStorage.API_URL+'orders/renewalorder?orderId='+orderId+'&planType='+planType ;
        return $http({
        method : 'GET',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json', 'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl
          })
    },

    renewalOrder: function(renewalObj,planId)
    {
        var apiUrl = $localStorage.API_URL+'orders/renewal/'+planId;
       return $http({
        method : 'POST',
        headers :{'Content-Type': 'application/json', 'Accept' : 'application/json',  'X-Obs-Platform-TenantId' : 'default', 'Authorization':  'Basic '+$localStorage.authorizationToken},
        url : apiUrl,
        data: renewalObj
         })
    }

 //https://localhost:8877/obsplatform/api/v1/orders/renewal/1117
    




  }
})