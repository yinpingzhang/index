function execute(method, url, suc, err, data) {
	var options = {
		url : url,
		type : method,
		processData : false,
		data : data,
		contentType : "application/json; charset=utf-8",
		dataType : "JSON",
		success : function(data, status) {
			if (suc != null || status == 'success') {
				suc(data);
			}
		},
		error : function(request, status, message) {
			if (request != null && request.responseJSON != null) {
				var error = request.responseJSON;
				var key = error.exceptionType + "_" + error.type;
				var msg = ErrorMessage[key];
				if (!msg)
					msg = key;
					alert(msg);
			} else {
				var msg = 'status:' + status + ' message:' + message;
				if (err != null) {
					err(msg);
				} 
			}
		}
	};
	$.ajax(options);
}
