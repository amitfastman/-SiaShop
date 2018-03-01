;(function() {
    "use strict";
    
   var app = angular.module("myApp", ["ngRoute"])
    .controller('MainController', MainController)
    .controller('userCtrl', userCtrl)
    .controller('adminCtrl', adminCtrl)
    .controller('prodCtrl', prodCtrl);   
    

// ##############################        CONFIG + ROUTING     ################################### //          
    
     app.config(function($routeProvider) {

// routes
     $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/products/:pageCatg/:pageType', {
        templateUrl: 'views/products.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/product_details/:ID', {
        templateUrl: 'views/product_details.html',
        controller: 'prodCtrl',
        controllerAs: 'productsCtrl'
      })
     .when('/SHboard/:pageCatg', {
        templateUrl: 'views/second_hand.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
     .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/messages', {
        templateUrl: 'views/message.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      .when('/admin', {
        templateUrl: 'views/adminlogin.html',
        controller: 'adminCtrl',
        controllerAs: 'admin'
      })

     
      .otherwise({
        redirectTo: '/'
      });

  });
      
       
 // ##############################        U S E R  controller #############################################//       
      
   function userCtrl($scope) {
    
   };
    
 // ##############################      P R O D U C T  controller #############################################//      
   function prodCtrl($scope,$routeParams ) {
    $scope.NAME = $routeParams.NAME;                // simple parameter recive
    $scope.STOCK = $routeParams.STOCK;              // simple parameter recive
    $scope.ITEM = getById($routeParams.ID);         // calling function that recive ID and bring the relevant object to $scope
       
 //-----------------get ITEM by ID ------------------//      
       function getById (id) {
          for (var key in $scope.products) {
            if ($scope.products[key]['_id'] == id) {
            return $scope.products[key];                                   
        } 
      }

    return 'item not found';
}
//------------------------------------------------//        
 };  
// ##############################  end of  P R O D U C T  controller #####################################//         
    
    
// ##############################        M A I N    controller #############################################//    
    
  function MainController($scope,$routeParams,$http,$location,$window) {
      
        $scope.pageCatg = $routeParams.pageCatg;   // import the page title
        $scope.pageType = $routeParams.pageType;    // import the page type --> which items we should see on each page
        //console.log(pageType);  
        //$scope.refnumber;
       
      //------------- change size of products grid ------------------//  
        $scope.classType = "span3A";
        $scope.changeClass = function(){
            if ($scope.classType === "span3A")
              $scope.classType = "span2";
            else
              $scope.classType = "span3A";
          };
      //---------------------jump to start of page to view the form---------------------------------------//  

      $scope.scrollup = function(){
      $window.scrollTo(0,0);
       };

//  ---------- Import data base items by using POST request ---------//

var myproducts = $http({
        method: 'POST',
        url: '/products',
        data: [$routeParams.pageCatg,$routeParams.pageType]
        }).
  then(function(res){
  console.log(res.data);
 $scope.products=res.data;     // the array 
 $scope.size=res.data.length;  // length of array 
 if (res.data.length === 0 ) $scope.message = "We are sorry, currently we don't have items in this category ";  // if return 0 results
 },  
 function(error){
 console.log(error);
 });

// -------------------redirect the page after form being sent -------------------//

 $scope.sendform = function(){
     $location.path('/messages');

 };



// --------------------------- form SEND button UNlock ---------------//
 $scope.isDisabled = false;

 $scope.disableButton = function() {
     $scope.isDisabled = true;
 }

// ------------------------END form SEND button UNlock ---------------//
//-------------------------------------------------------------------------------// 
// --------------------- products view options  ------------------------//      
   
  $scope.views = [{    
      viewTitle: 'list-view',
      lines: 20,
      columns: 1
    }, { 
      viewTitle: 'grid-view',
      lines: 4,
      columns: 3
      
    }, { 
      viewTitle: 'icon-view',
      lines: 6,
      columns: 4
  }];

//-------------------------------------------------------------------------------// 
      
  };      
// ############################ END of controller MAIN ############################## //      
  
// ##############################      Admin  controller #############################################//      
function adminCtrl ($scope,$routeParams,$http,$location) {
     
//------------------------------------------------//        
  };  
  // ##############################  end of  Admin  controller #####################################//     
      
       



 
// ----------------------------------------------------------------------- //
  })();
// ############################ END of iife ############################## //          

    
    
 
 
 
