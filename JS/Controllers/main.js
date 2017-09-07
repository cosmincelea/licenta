app.controller('mainController', function ($scope, $window,$http,postObject,postService,$rootScope) {
 $scope.userData={};
 $scope.time=new Date().getTime() / 1000;
 $scope.showAdmin=false;
    $scope.loadUser=function(){ 
var url='http://localhost/Licenta/main.php';
	$http({
			method: 'GET',
			url: url
    
		}).then(function successCallback(data) {
			
                        $scope.userData=data.data;
                       if( $scope.userData.USER_TYPE==1){
                    	   $scope.showAdmin=true;
                       }
                        
                       
		},
		function errorCallback(response) {
    
});
	
	
	var url='http://localhost/Licenta/numberOfMessages.php';
	$http({
			method: 'GET',
			url: url
    
		}).then(function successCallback(data1) {
			
			$rootScope.messageNumber=data1.data.numberOfMessages;
                        
                        
                       
		},
		function errorCallback(response) {
    
});
	

  };
  
  
  
  $scope.loadNews= function() { 
	  var url='http://localhost/Licenta/newsGet.php';
	  	$http({
	  			method: 'GET',
	  			url: url
	      
	  		}).then(function successCallback(data) {
	  			var today = new Date();
	  			var day = today.getDate();
	  			var found=false;
	                          $scope.news=data.data;
	                          angular.forEach($scope.news, function(value,key) {
	                        	  var date=new Date(value.date_added);
	                        	 if(found ==true){}
	                        	 else{
	                             if(date.getDate()==day){
	                            	 swal({   title: "You have news!",   text: "Check the latest news!",   imageUrl: "../images/icons/newspaper.png" });
	                            	setCookie("showedNews","true",0.9);
	                            	 found=true;
	                             }
	                        	 }
	                             

	                             });
	                          
	                          
	                         
	  		},
	  		function errorCallback(response) {
	      
	  });

	    };
	    
	    function setCookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*60*60*1000));
		    var expires = "expires="+ d.toUTCString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		}
	    
	    function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ')
					c = c.substring(1);
				if (c.indexOf(name) == 0)
					return c.substring(name.length, c.length);
			}
			return "";
		}
	    if(getCookie("showedNews")!="true"){
	  $scope.loadNews();
	    }
  
  
  
  
  
  
  $scope.numberOfMessages=function(){
	  var url='http://localhost/Licenta/numberOfMessages.php';
		$http({
				method: 'GET',
				url: url
	    
			}).then(function successCallback(data1) {
				
				$rootScope.messageNumber=data1.data.numberOfMessages;
				
	                        
	                       	                       
			},
			function errorCallback(response) {
	    
	});
  }
  
  setInterval(function(){  $scope.numberOfMessages() }, 1000);


  
  $scope.loadUser();
   $scope.logOut=function(){
       
     
       
       
       
         document.cookie = 'user_id=; expires='+new Date(0).toUTCString() +'; path=/Licenta';
       
      
       
       
    };
 
 

 
 
 
 
 $scope.$on('popupFunction',function(evt,obj){
     $scope.skill_name_value=obj.skill_name_value;
     $scope.skill_id_value=obj.skill_id_value;
     $scope.skill_level_value=obj.skill_level_value;
     $scope.original_skill_level=obj.skill_level_value;
     $scope.index_value=obj.index_value;
     
 } );
 
$scope.close_popup=function(){
    $(".popup_block").css( "display", "none" );
};
 
 $(document).mouseup(function (e)
{
    var container = $(".pop_content");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".popup_block").css( "display", "none" );
    }
});
 
 
    $scope.deleteSkill=function(skill_id,index){
        var url='http://localhost/Licenta/deleteSkill.php';
        var dataUser={user_id:$scope.userData.USER_ID,skill_id:skill_id};
     
       
       postService.objSend(url,dataUser).then(function(data){
           
           if(data.data==1)
           {
               
               
 $scope.$broadcast('apply_skills_value',{index_value:$scope.index_value,delete_skill:1}); 
 
              }
           else
           {
               sweetAlert("Try again", "Something went wrong", "error"); 
                
           }
        });
   } ;

  $scope.updateSkill=function(skill_id,index,skill_level){
        var url='http://localhost/Licenta/updateSkill.php';
        var dataUser={user_id:$scope.userData.USER_ID,skill_id:skill_id,skill_level:skill_level};
        
     if(skill_level!==$scope.original_skill_level){
       
       postService.objSend(url,dataUser).then(function(data){
           
           if(data.data==1)
           {
               
               
 $scope.$broadcast('apply_skills_value',{index_value:$scope.index_value,delete_skill:0,skill_level_value:skill_level}); 
 
              }
           else
           {
        	   console.log(data.data);
               sweetAlert("Try again", "Something went wrong", "error"); 
                
           }
        });}
    
    else{
        swal({   title: "New Value must be different",  timer: 2000,  type: "warning",    confirmButtonColor: "#DD6B55",   confirmButtonText: "Ok,got it!",   closeOnConfirm: false });
    }
    
    
    
    
    
    
   } ;
 
 
  });
