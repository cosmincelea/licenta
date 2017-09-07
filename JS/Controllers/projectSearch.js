app.controller('projectSearchController', function ($scope, $window,$http,postProject,postService) {
 $scope.usersData={};
    $scope.loadProjects=function(){ 
var url='http://localhost/Licenta/projects.php';
	$http({
			method: 'GET',
			url: url
    
		}).then(function successCallback(data) {
			
                       
                     $scope.projects= data.data;
//                        postObject.objSend($scope.userData);
                        
                       
		},
		function errorCallback(response) {
    
});

  };
  
  var user_send_to;
 
  $scope.loadProjects();
 
 
  function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}
  
 
$scope.viewProject=function(id){
	setCookie('project_id',id,2);
    var projectSearched={project_id:id,request_role:"admin"};
    postProject.objSend(projectSearched);  
    window.location.href = "#viewProject";
};
 
 
 
 
 
 
  });
