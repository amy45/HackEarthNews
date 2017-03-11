var app=angular.module("myApp",['ui.bootstrap','ngRoute']);


/*app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/bars", {
        templateUrl : "bars.html"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
});
*/
app.filter('offset', function() {
	  return function(input, start) {
	    start = parseInt(start, 10);
	    return input.slice(start);
	  };
	});




app.controller('myCtrl',function($scope,$http,dataFactory,$filter){
	
	
	$scope.hideSearch=false;
	
	$scope.clearSearch=function(){
		
		$scope.hideSearch=false;	
		$scope.firstname="";
		
	}
	
	
	dataFactory.get('http://starlord.hackerearth.com/edfora/hackernews').then(function(data){
		$scope.items=data;
	});
	$scope.name="";
	$scope.onItemSelected=function(){
	
		$scope.hideSearch=true;
		console.log('selected='+$scope.name);
		$scope.firstname=$scope.name;
		
		
	}
	
	
	
	
	$scope.newPage=function(url){
		
		window.open(url);
		
		
	}
	
	$scope.filterName="movie_title";
	$scope.setFilter=function(test){
		alert(test);
		if(test=="By Name")
		{

	}
		else{
			$scope.filterName="genres";
			
		}	
	}
	
	$http.get("http://starlord.hackerearth.com/edfora/hackernews")
    .then(function(response) {
        $scope.itemsNew = response.data;
        $scope.totalItems = response.data.length;
      //  alert(response.data.length);
        //localStorage.setItem('testObject', JSON.stringify(response.data));
        
        Number.prototype.padLeft = function(base,chr){
        	   var  len = (String(base || 10).length - String(this).length)+1;
        	   return len > 0? new Array(len).join(chr || '0')+this : this;
        	}
        var d = new Date,
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
    console.log("Date:"+dformat);
        
    
    Object.keys($scope.itemsNew).forEach(function(key,i) {
        $scope.itemsNew[key].indexCount=i;
        
        
        var firstDate = new Date(dformat);
       var secondDate = new Date($scope.itemsNew[key].created_at);
      //  var secondDate = new Date( "03/11/2017 13:24");

        var hourDiff = firstDate - secondDate; //in ms
        var secDiff = hourDiff / 1000; //in s
        var minDiff = hourDiff / 60 / 1000; //in minutes
        var hDiff = hourDiff / 3600 / 1000; //in hours
        var dayDiff=hDiff/24;
        var humanReadable = {};
        humanReadable.days = Math.floor(dayDiff);
        humanReadable.hours = Math.floor(hDiff) -24 * humanReadable.days;
         
       // humanReadable.minutes = minDiff - 60 * humanReadable.hours;
        console.log(humanReadable);
        
        $scope.itemsNew[key].timeDiff=humanReadable.days;

       // var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    
       // console.log("Difference is:"+diffDays);
    });    
    
    
    
    });
	

    
	
	
	
	$scope.itemsPerPage = 5;
	  $scope.currentPage = 0;
	  $scope.range = function() {
		    var rangeSize = 5;
		    var ret = [];
		    var start;

		    start = $scope.currentPage;
		    if ( start > $scope.pageCount()-rangeSize ) {
		      start = $scope.pageCount()-rangeSize+1;
		    }

		    for (var i=start; i<start+rangeSize; i++) {
		      ret.push(i);
		    }
		    return ret;
		  };

		  $scope.prevPage = function() {
		    if ($scope.currentPage > 0) {
		      $scope.currentPage--;
		    }
		  };

		  $scope.prevPageDisabled = function() {
		    return $scope.currentPage === 0 ? "disabled" : "";
		  };

		  $scope.pageCount = function() {
		    return Math.ceil($scope.itemsNew.length/$scope.itemsPerPage)-1;
		  };

		  $scope.nextPage = function() {
		    if ($scope.currentPage < $scope.pageCount()) {
		      $scope.currentPage++;
		    }
		  };

		  $scope.nextPageDisabled = function() {
		    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		  };

		  $scope.setPage = function(n) {
		    $scope.currentPage = n;
		  };
		  
})

		  app.directive('typeahead', function($timeout) {
			  return {
			    restrict: 'AEC',
			    scope: {
					items: '=',
					prompt:'@',
					title: '@',
					subtitle:'@',
					model: '=',
					onSelect:'&'
				},
				link:function(scope,elem,attrs){
				   scope.handleSelection=function(selectedItem){
					 scope.model=selectedItem;
					 scope.current=0;
					 scope.selected=true;        
					 $timeout(function(){
						 scope.onSelect();
					  },200);
				  };
				  scope.current=0;
				  scope.selected=true;
				  scope.isCurrent=function(index){
					 return scope.current==index;
				  };
				  scope.setCurrent=function(index){
					 scope.current=index;
				  };
				},
			    templateUrl: 'templates/templateurl.html'
			  }
			});

			app.factory('dataFactory', function($http) {
			  return {
			    get: function(url) {
			      return $http.get(url).then(function(resp) {
			        return resp.data;
			      });
			    }
			  };
			});
	
	//$scope.name="Amit";
	
		
	
	
	
	
	
	


