// RECIVE ALL ITEMS FROM Data base // 

app.factory('itemsService', function (){

	return {
         itemsList : function (pageCatgValue,pageTypeValue){

			var myproducts = $http({
				method: 'POST',
				url: 'admin/products',
				data: [pageCatgValue,pageTypeValue]
				}).
			  then(function(res){
			  console.log(res.data);
			  products={};
			  products=res.data;     // the array 
			  console.log(products);
			  var size=res.data.length;  // length of array 
			  if (res.data.length === 0 ) $scope.message = "We are sorry, currently we don't have items in this category ";  // if return 0 results
			  },  
			  function(error){
			  console.log(error);
			  });

         return products;
		 }

 
	};



}); 