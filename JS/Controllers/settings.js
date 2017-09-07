

app.controller('settingsController', function ($scope, $window,$http,postObject,postService) {

	$('#uploadForm').submit(function(e) {
	 if($('#file-5').val()) {
			e.preventDefault();
			  $(".loading-image").css( "display", "block" );
			$(this).ajaxSubmit({ 
				url: "../upload1.php",
				
				beforeSubmit: function() {
				  $("#progress-bar").width('0%');
				  $(".file-upload-icon").css("display","none");
				},
				uploadProgress: function (event, position, total, percentComplete){	
					$("#progress-bar").width(percentComplete + '%');
					$("#progress-bar").html('<div id="progress-status">' + percentComplete +' %</div>')
				},
				success:function (data){
					console.log(data);
					 $(".file-upload-icon").css( "display", "block" );
					
					
					$(".loading-image").css( "display", "none" );
					 if(data.split(':')[0]=='Error'){
						 swal("Error!", data.split(':')[1], "error");}
					 else{
					   swal("Good job!", "The file has been uploaded", "success");
					 }
					   function refresh(node)
					   {
					      var times = 3000; // gap in Milli Seconds;

					      (function startRefresh()
					      {
					         var address;
					         if(node.src.indexOf('?')>-1)
					          address = node.src.split('?')[0];
					         else 
					          address = node.src;
					         node.src = address+"?time="+new Date().getTime();

					         setTimeout(startRefresh,times);
					      })();

					   }
					   
					   var node = document.getElementById('profile_picture');
					   refresh(node);
					
				},
				error: function(data ) { alert(data); },
				resetForm: true 
			}); 
			return false; 
		}
	
	
	});
	
	
	
	
	
	
	
	
	
	
 
	$('input[type=file]').change(function(e){
		  
		
		  $(".fileName").text(e.target.files[0].name)
		});
 
 $scope.changePassword=function(oldPass,newPass){
	 var pass={
			 old_password:oldPass,
			 new_password:newPass
	 }
	 console.log(pass);
	 var url='http://localhost/Licenta/changePassword.php';
	 postService.objSend(url,pass).then(function(data){
	        
	           if(data.data==0)
	           {
	        	   sweetAlert("Succes!", "Password changed!", "success"); 
	               
	              }
	           else
	           {
	               sweetAlert("Oops...", "Old Password is wrong!", "error"); 
	                
	           }
	        });
	 
	 
	 
	 
	 
	 
	 
	 
 }
 
 

 
  });
