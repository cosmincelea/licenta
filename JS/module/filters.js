app.filter('selectedTags', [ function($filter) {
	return function(inputArray, txnType) {

		var data = [];
		angular.forEach(inputArray, function(item) {
			var counter = null;
			if (txnType.length == 0)
				data.push(item);
			else {
				for ( var i = 0 in item.SKILLS) {
					if (txnType.indexOf(item.SKILLS[i].SKILL_NAME) != -1) {
						counter++; 
						if (counter == txnType.length)
							data.push(item);
					}
				}
			}
		});
		return data;
	};
} ]);
