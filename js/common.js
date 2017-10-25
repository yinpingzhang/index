$(document).ready(function() {
	$("#header").load('/common/header.html', function() {
		var pathname = window.location.pathname;
		var active = pathname.split("/portal/")[1].split(".")[0];
		/*console.log(active);*/
		var columns = ["index","product","operate","case","joinwork","contact"];
		if(columns.indexOf(active) > -1){
			$("#nav li").eq(columns.indexOf(active)).addClass("active");
		}
	});
	
	$("#fd").load('/common/footer.html', function() {
		
	});
	        
});



function toRegister(){
	window.location.href = "/html/register.html";
}