app
 .controller(
  'createNewsController',
  function($scope, $window, $http, postService, $timeout) {
	  
  
  
   
   
	  $scope.newsName;
	   
	   
	   
	   
	   $scope.addNews = function() {

		    if (!$scope.newsName) {
		    	
//		     $scope.showErrorMessage("Please choose a News name!");
		     
		    } 
		   
		    else{
		    
		     
		     var task = {
		      news_subject: $scope.newsName,
		     
		      news_message: tinyMCE.activeEditor.getContent(),
		      
		     };

		    
		     
		     
		     
		     
		     
		     
		     
		     var url = 'http://localhost/Licenta/createNews.php';

		     postService.objSend(url, task).then(function(data) {

		        var response = data.data.replace(/\s+/g, '');
		        var responseFinal = response.substring(0, 7);
		       
		      
		        
		       

		        if (responseFinal == "Success") {
		         sweetAlert("Succes!","News Created!","success");

		         tinyMCE.activeEditor.setContent("");
		         $scope.newsName = null;
		         
		        
		       

		        } else {
		         sweetAlert("Try again","Make sure everything is correct","error");

		        }
		       });

		    }

		   }
 
	   
	   
	   
	   
	   
	   
   
   
   

  });