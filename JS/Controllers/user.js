app.controller('userController', function ($scope, $window,$http,postObject,$timeout,postService) {

 $scope.editSkill=function(skill_id,skill_name,skill_value,index){
    $(".popup_block").css( "display", "block" );
     $scope.skill_id=skill_id;
     $scope.$emit('popupFunction',{skill_id_value:skill_id,skill_name_value:skill_name,skill_level_value:parseInt(skill_value),index_value:index}); 
     
     
 };
 
 $scope.toggle = function (par1, par2) {
        
        var selectie = par1;
        var selectie2 = par2;
        $('.' + selectie2).slideToggle("fast", "linear");
        $('.' + selectie).toggleClass("glyphicon glyphicon-menu-down glyphicon glyphicon-menu-up ", 300);

    };
    
   

$scope.$on('apply_skills_value',function(evt,obj){
    if(obj.delete_skill==1){ 
        swal({   title: "Well Done!",   text: "Skill deleted!",   timer: 2000, type:"success",  showConfirmButton: true });
     $scope.userData.SKILLS.splice(obj.index_value,1);}
     else{
        
         $scope.userData.SKILLS[obj.index_value].skill_level=obj.skill_level_value;
         swal({   title: "Well Done!",   text: "Skill updated!",   timer: 2000, type:"success",  showConfirmButton: true });
         
     }
     
    $(".popup_block").css( "display", "none" );
    
  
    

 } );


$scope.loadSkills=function(){ 
	 var url='http://localhost/Licenta/skillsAll.php';
	 	$http({
	 			method: 'GET',
	 			url: url
	     
	 		}).then(function successCallback(data) {
	 			
	 			    
	                      $scope.skills= data.data;
	                      
	                         
	                        
	 		},
	 		function errorCallback(response) {
	     
	 });

	   };

	   $scope.loadSkills();
	   
	   $scope.addSkill=function(skill_id){
		  
		   var url='http://localhost/Licenta/addSkill.php';
	        var dataUser={user_id:$scope.userData.USER_ID,skill_id:skill_id};
	   
	       
	       postService.objSend(url,dataUser).then(function(data){
	    	   
	           if(data.data==1)
	           {
	        	  
	        	   sweetAlert("Success", "Skill added!", "success");
	        	   setTimeout(function() {
	        		    
	        		   $scope.loadUser(); 
	        		   
	        		    }, 600);
	        	  
	 
	 
	              }
	           else
	           {
	               sweetAlert("This Skill Exists", "Add Another Skill", "error"); 
	                
	           }
	        });
		   
		   
	   }
	   
	   
	   $scope.loadChart = function() {
	        var projectStatus;
	        var url = 'http://localhost/Licenta/myProjectsStatus.php';
	        $http({
	            method: 'GET',
	            url: url
	        }).then(function successCallback(data) {
	            projectStatus = data.data;

	            // Doughtnut Chart
	            var ctx = document.getElementById("projectsChart");
	            var myDoughnutChart = new Chart(ctx, {
	                type: 'doughnut',
	                data: { 
	                    labels: [
	                        "Finalizate",
	                        "În desfășurare"
	                    ],
	                    datasets: [
	                        {
	                            data: projectStatus,
	                            backgroundColor: [
	                                "#1fd51f",
	                                "#FFCE56"
	                            ],
	                            hoverBackgroundColor: [
	                                "#4BC0C0",
	                                "#FFCE56"
	                            ]
	                        }]
	                    },
	                options: {
	                    title: {
	                        display: true,
	                        text: 'Statistica proiectelor',
	                        fontSize: 27,
	                        fontColor: "#000028",
	                        fontStyle: 'normal'
	                    },
	                    scales: {
	                        yAxes: [{
	                            display: false
	                        }]
	                    }
	                }
	            });
	        },
	        function errorCallback(response) {
	        });
	    };
	    $scope.loadChart();
	   
	   
	   
	   
	   

 
  });
