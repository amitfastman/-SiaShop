;(function() {
    "use strict";
    
   var app = angular.module("myApp", ["ngRoute"])
    .controller('MainController', MainController)
    .controller('userCtrl', userCtrl)
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
      .when('/product_details/:ID/:NAME/:STOCK', {
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
            if ($scope.products[key].id == id) {
            return $scope.products[key];                                   
        } 
      }

    return 'item not found';
}
//------------------------------------------------//        
 };  
// ##############################  end of  P R O D U C T  controller #####################################//         
    
    
// ##############################        M A I N    controller #############################################//    
    
  function MainController($scope,$routeParams,$http) {
      
        $scope.pageCatg = $routeParams.pageCatg;   // import the page title
        var pageType=$routeParams.pageType;    // import the page type --> which items we should see on each page
        console.log(pageType);
      
   //--------------- import JSON file as main DATA BASE ---------------//
                                                
         var myproducts = $http.get('database/database.json');
           myproducts.then(function(res){
               console.log(res.data);
           $scope.products=res.data;            
        },  
           function(error){
           console.log(error);
        }); 

 //---------------end of JSON file DB import ---------------// 

 
  

// --------------------- list of websites cover images  ------------------------//      
   
//  $scope.slides = [{    
//      image: '/images/carousel1.png',
//      imgTitle: 'Sia Jelwery',
//      slogan: 'The Best Jelwery Shop Online'
//     }, { 
//      image: '/images/carousel2.png',
//      imgTitle: 'Our Collection',
//      slogan: 'variety of Necklace and Rings'  
//     }, { 
//      image: '/images/carousel3.png',
//      imgTitle: 'Sia Jelwery',
//      slogan: 'variety of bracelets'  
//     }, { 
//      image: '/images/carousel4.png',
//      imgTitle: 'Second hand board',
//      slogan: 'Buy and Sell your own vintage 2nd hand Jelwery'  
//     }, { 
//      image: '/images/carousel5.png',
//      imgTitle: 'Sia Jelwery',
//      slogan: 'All In One Place'      
//    }];

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
  
      

 
// ----------------------------------------------------------------------- //
  })();
// ############################ END of iife ############################## //          

    
    
    
    
  