app.controller('allNewsController', function ($scope, $window,$http,postObject,postService) {
	
 $scope.loadNews= function() { 
var url='http://localhost/Licenta/newsGet.php';
	$http({
			method: 'GET',
			url: url
    
		}).then(function successCallback(data) {
			
                        $scope.news=data.data;
                        
                        
                       
		},
		function errorCallback(response) {
    
});

  };
  
  setInterval($scope.loadNews(), 9500);
  
$scope.loadNews();
  
 $scope.viewNews=function(news_subject,news_message,date_added,news_id,index){
      $(".taskPopUp").css( "display", "block" );
      $scope.news_subject=news_subject;
    
     tinyMCE.activeEditor.setContent(news_message);
     $scope.date_added=date_added;
     
     $scope.news_id=news_id;
    
    
    
 };
  
 $(document).mouseup(function (e)
			{
	
			    var container = $(".task_pop_content");

			    if (!container.is(e.target) // if the target of the click isn't
											// the container...
			        && container.has(e.target).length === 0) // ... nor a
																// descendant of
																// the container
			    {
			    	 
			        $("#taskPopUp").css( "display", "none" );
			    }
			});
 
 
 
  $scope.close_popup=function(){
    $(".taskPopUp").css( "display", "none" );
};
   

		 

  


});
