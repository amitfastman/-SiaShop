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
        templateUrl: 'administrator/views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'administrator/views/contact.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'administrator/views/login.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/products/:pageCatg/:pageType', {
        templateUrl: 'administrator/views/products.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/product_details/:ID', {
        templateUrl: 'administrator/views/product_details.html',
        controller: 'prodCtrl',
        controllerAs: 'productsCtrl'
      })
     .when('/SHboard/:pageCatg', {
        templateUrl: 'administrator/views/second_hand.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/cart', {
        templateUrl: 'administrator/views/cart.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
     .when('/register', {
        templateUrl: 'administrator/views/register.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/messages', {
        templateUrl: 'administrator/views/message.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      .when('/confirmation/:title', {
        templateUrl: 'administrator/views/confirmation.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      .when('/new', {
        templateUrl: 'administrator/views/newitem.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

     
      .otherwise({
        redirectTo: '/'
      });

  });
      
//#######################   // RECIVE ALL ITEMS FROM Data base // 

app.factory('itemsService', function ($http){

	return {
         itemsList : function (pageCatgValue,pageTypeValue,callback){

			var myproducts = $http({
				method: 'POST',
				url: 'admin/products',
				data: [pageCatgValue,pageTypeValue]
				}).
			  then(function(res){
			  console.log(res.data);
			  var products={};
			  products=res.data;     // the array 
			  console.log(products);
			  var size=res.data.length;  // length of array 
        if (res.data.length === 0 ) $scope.message = "We are sorry, currently we don't have items in this category ";  // if return 0 results
        //return products;
        callback(products);
			  },  
			  function(error){
			  console.log(error);
			  });
  
		 }

 
	};



}); 
    

    
 // #################################################      P R O D U C T  controller      #############################################// 

   function prodCtrl($scope,$routeParams,$http, $location,itemsService ) {
    
    // @@@@@@@@@@@@@@@@@@@@@@@@  G E N E R A L @@@@@@@@@@@@@@@@@@@@@@@@@@  //

    
    $scope.pageCatg = 'All Jewelry & Watches';   // import the page title
    $scope.pageType = '13';    // import the page type --> which items we should see on each page
    $scope.products = itemsService.itemsList($scope.pageCatg,$scope.pageType, function(products){
                  $scope.products=products;
                  $scope.ITEM = getById($routeParams.ID);         // calling function that recive ID and bring the relevant object to $scope
                  console.log($scope.ITEM);
                }); 

    console.log($routeParams.ID);
    $scope.ITEM = getById($routeParams.ID);         // calling function that recive ID and bring the relevant object to $scope
    console.log($scope.ITEM);

       
   
     // @@@@@@@@@@@@@@@@@@@@@@@@  F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@  //
   
  
    //--------------- get ITEM OBJECT by ID (function) ------------------//      
       function getById (id) {
        // console.log(id);
        // console.log($scope.products);    

        for (var key in $scope.products) {
            if ($scope.products[key]['_id'] == id) {
              console.log($scope.products[key]);
            return $scope.products[key];                                   
        } 
      }

    return 'item not found';

}

// -----------------   ADMIN ONLY -  function when UPDTATE Item  ------------------//

$scope.updateform = function(obj){

    console.log(obj);

    var myform = $http({
      method: 'POST',
      url: '/admin/edit',
      data: [obj]
     }).
     then(function(res){
     console.log(res.data);
     $location.path('/confirmation/Updated');
     },  
    function(error){
    console.log(error);
   }); 
 };


// -----------------   ADMIN ONLY -  function when DELETE Item  ------------------//

$scope.deleteItem = function(obj){
  var myproducts = $http({
    method: 'POST',
    url: '/admin/delete',
    data: [obj]
    }).
then(function(res){
console.log(res.data);
$location.path('/confirmation/Deleted');
},  
function(error){
console.log(error);
});
 
};
// -------------------END ------------//
};  
// ##############################  end of  P R O D U C T  controller #####################################//         
    
    
// #####################################################        M A I N    controller         #############################################//    
    
  function MainController($scope,$routeParams,$http,$location, itemsService) {

    // @@@@@@@@@@@@@@@@@@@@@@@@  G E N E R A L @@@@@@@@@@@@@@@@@@@@@@@@@@  //
  $scope.itemsService =itemsService;    
 $scope.pageCatg = $routeParams.pageCatg;   // import the page title
 $scope.pageType = $routeParams.pageType;    // import the page type --> which items we should see on each page
 $scope.products = itemsService.itemsList($scope.pageCatg,$scope.pageType, function(products){
  $scope.products=products;
  console.log($scope.products);
 }); 

// console.log($scope.products);
 $scope.prod ={};
 $scope.classType = "span3A";
 $scope.title = $routeParams.title;
 
     // @@@@@@@@@@@@@@@@@@@@@@@@  F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@  // 

     // -----------------ADMIN ONLY -  function when NEW Item CREATED ------------------//

     $scope.newItem = function(obj){
      console.log(obj);
      console.log(obj['_id']);    
  
      var myform = $http({
        method: 'POST',
        url: '/admin/new',
        data: [obj]
      }).
      then(function(res){ 
        console.log(res.data);
        $location.path('/confirmation/Updated');
        $scope.prod ={};   // CLEAR object //
        },  
        function(error){
           console.log(error);
        }); 
     };
  

//---------------------- END of new ITEM created function -------------//

//------------- change size of products grid ------------------//  
        
      $scope.changeClass = function(){
        if ($scope.classType === "span3A")
          $scope.classType = "span2";
        else
          $scope.classType = "span3A";
      };
//-------------------END of function size of grid--------------//  

// ------- redirect the page to admin.html -------- //
 $scope.sendform = function(){
      $location.path('/admin');
 };

// --------------- END redirect ---------------//
// --------------- products view options  ------------------------//      
   
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
     
     
  };  
// ##############################  end of  Admin  controller #####################################//     
      
// ##############################        U S E R  controller      #############################################//       
      
   function userCtrl($scope) {
    
  };     



 
// ----------------------------------------------------------------------- //
  })();
// ############################ END of iife ############################## //          

    
    
 
 
 