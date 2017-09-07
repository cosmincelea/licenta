app.service("postService",function($http,$q){
	this.objSend=function(url,obj){
		var deferred = $q.defer();
		$http.post(url,obj,{header:{"Content-Type":"application/json"}}
		).then(function(data){
			deferred.resolve(data);
		});
		return deferred.promise;
		};
});