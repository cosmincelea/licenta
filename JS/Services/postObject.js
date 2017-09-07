

app.service("postObject",function($q){
    var myObject={};
	this.objSend=function(obj){
		myObject=obj;
		};
                
                this.getObject=function(){return myObject};
                
});

