// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider,$httpProvider,$cordovaInAppBrowserProvider) {

  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no'
  };

  document.addEventListener("deviceready", function () {

    $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions)

  }, false);


  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common["Accept"] = "text/plain";
  $httpProvider.defaults.headers.common["Content-Type"] = "text/plain";
  $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

 
  $stateProvider

.state('common', {
    url: '/common',
    abstract: true,
    templateUrl: 'templates/common.html',
    controller: 'AppCtrl'
  })

.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
})

.state('termsConditions', {
  url: '/termsConditions',
 // views: {
    //'menuContent': {
      templateUrl: 'templates/termsConditions.html',
      controller: 'termsCondtionsCtrl'
    //}
  //}
})

.state('ipaddress', {
    url: '/ipaddress',
    templateUrl: 'templates/ipAddrees.html',
    controller: 'loginCtrl'
})

.state('common.dashboard', {
  url: '/dashboard',
  views: {
    'menuContent': {
      templateUrl: 'templates/dashboard.html',
      controller: 'AppCtrl'
    }
  }
})

  .state('common.customerSearch', {
    url: '/customerSearch',
    views: {
      'menuContent': {
        templateUrl: 'templates/customerSearch.html',
        controller:'customerSearchController'
      }
    }
  })

   .state('common.planInfo', {
    url: '/planInfo',
    views: {
      'menuContent': {
        templateUrl: 'templates/planInfo.html',
        controller:'customerSearchController'
      }
    }
  })

  
  .state('common.selectedPlanList', {
    url: '/planInfo',
    views: {
      'menuContent': {
        templateUrl: 'templates/selectedPlansList.html',
        controller:'addPlanController'
      }
    }
  })

  .state('common.payment', {
      url: '/payment',
      views: {
        'menuContent': {
          templateUrl: 'templates/payment.html',
          controller:  'paymentController'
        }
      }
    })
    .state('common.cancelPlan', {
      url: '/cancelPlan',
      views: {
        'menuContent': {
          templateUrl: 'templates/cancelPlan.html',
          controller: 'cancelPlanController'
        }
      }
    })

      .state('common.changePlan', {
      url: '/changePlan',
      views: {
        'menuContent': {
          templateUrl: 'templates/changePlan.html',
          controller: 'ChangePlanCtrl'
        }
      }
    })

    .state('common.changePlanSelectedPlan', {
      url: '/changePlanSelectedPlan',
      views: {
        'menuContent': {
          templateUrl: 'templates/changePlanSelectedPlan.html',
          controller: 'ChangePlanCtrl'
        }
      }
    })

      .state('common.tickets', {
      url: '/tickets',
      views: {
        'menuContent': {
          templateUrl: 'templates/tickets.html',
          controller: 'ticketsCtrl'
        }
      }
    })

    .state('common.changePassword', {
      url: '/changePassword',
      views: {
        'menuContent': {
          templateUrl: 'templates/changePassword.html',
          controller: 'loginCtrl'
        }
      }
    })

        .state('common.ticketsList', {
      url: '/ticketsList',
      views: {
        'menuContent': {
          templateUrl: 'templates/ticketsList.html',
          controller: 'ticketsCtrl'
        }
      }
    })
      .state('common.customerActivation', {
      url: '/customerActivation',
      views: {
        'menuContent': {
          templateUrl: 'templates/customerActivation.html',
          controller: 'activationController'
        }
      }
    })
      .state('common.changePlanCurrent', {
      url: '/changePlanCurrent',
      views: {
        'menuContent': {
          templateUrl: 'templates/ChangePlanCurrent.html',
          controller: 'ChangePlanCtrl'
        }
      }
    })
    .state('common.renewalPlan', {
    url: '/renewalPlan',
    views: {
      'menuContent': {
        templateUrl: 'templates/renewalPlans.html',
        controller:'renewalPlanController'
      }
    }
  })

  .state('common.packageCountReport', {
    url: '/packageCountReport',
    views: {
      'menuContent': {
        templateUrl: 'templates/packageCountReport.html',
        controller:'packageCountController'
      }
    }
  })

  .state('common.collectionReport', {
    url: '/collectionReport',
    views: {
      'menuContent': {
        templateUrl: 'templates/collectionReport.html',
        controller:'collectionReportController'
      }
    }
  })

  .state('common.ticket', {
    url: '/ticket',
    views: {
      'menuContent': {
        templateUrl: 'templates/ticket.html',
        controller:'ticketController'
      }
    }
  })

  .state('common.viewtickets', {
    url: '/viewtickets',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewtickets.html',
        controller:'viewticketsController'
      }
    }
  })

  .state('common.viewpayments', {
    url: '/viewpayments',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewpayments.html',
        controller:'viewpaymentsController'
      }
    }
  })
  
  
  .state('common.viewbills', {
    url: '/viewbills',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewbills.html',
        controller:'viewbillsController'
      }
    }
  })

 

  .state('common.receipt', {
    url: '/receipt',
    views: {
      'menuContent': {
        templateUrl: 'templates/receipt.html',
        controller: 'receiptCtrl'
      }
    }
  })
  .state('common.paymentrefunddetail', {
    url: '/paymentrefunddetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/paymentrefunddetail.html',
        
      }
    }
  })






  .state('common.addPlan', {
    url: '/addPlan',
    views: {
      'menuContent': {
        templateUrl: 'templates/addPlan.html',
        controller: 'addPlanController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/login');
   $urlRouterProvider.otherwise(function($injector, $location) {
        var state = $injector.get('$state');
        var storage = $injector.get('$localStorage');
      
           if (storage.isLoggedIn==1) {
            state.go('common.customerSearch');
        } else {
            state.go('login');
        }
        
        return $location.path();
    });
});
