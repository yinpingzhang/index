/**
 * 自定义提示框
 * cai
 */
(function($){
	$.fn.calert = function(option,param){
		if (typeof option == 'string'){
			var method = $.fn.calert.methods[option];
			if (method){
				return method(this, param);
			} else {
				return this;
			}
		}
		option = option || {};
		var target = this;
		var old_options = $.data(target[0],"data");
		old_options = old_options || {};
		var new_options = $.extend(true,{},$.fn.calert.defaults,old_options,option);
		$.data(target[0],"data",new_options);
		//初始化提示框
		init(target);
		return target;
	};
	
	$.fn.calert.methods = {
		show: function(target, params){ 
			return show(target, params);
		},
		hide: function(target){ 
			return popClose(target);
		},
		alert: function(target, params){
			return alert(target, params);
		}
	};
	
	$.fn.calert.defaults={
		title: '提示信息',
		content: '',
		icon: 'ok',
		ok_text: '确定',
		cancel_text: '取消',
		has_ok: true,
		has_cancel: true,
		onClose: function(params){
			
		},
		onOk: function(params) {
			
		},
		onCancel: function(params) {
			
		},
		onShow: function(params) {
			
		}
	};
	
	function init(target){
		var options = $.data(target[0],"data");
		target.empty();
		var bg = '<div class="open-bg" style="z-index:8888;"></div>';
		target.append(bg);
		var icon_class = '';
		if(options.icon== 'warn'){
			icon_class = 'openDesExclamation ';
		}
		var msg = '';
		msg += '<div class="open-msg1">';
		msg += '	<h2><a class="a-close" href="javascript:void(0);"></a><span class="openTitle">'+ options.title +'</span></h2>';
		msg += '    <p class="openDescription"><span class="'+ icon_class +'openDesHook">'+ options.content +'</span></p>';
		msg += '    <div class="tc">';
		if(options.has_ok){
			msg += '        <a href="javascript:void(0);" class="a-finish _btn_ok">'+ options.ok_text +'</a>';
		}
		if(options.has_cancel){
			msg += '        <a href="javascript:void(0);" class="a-finish _btn_cancel">'+ options.cancel_text +'</a>';
		}		
		msg += '    </div>';
		msg += '</div>';
		target.append(msg);
		bindFuncs(target);
	}
	
	function bindFuncs(target) {
		var options = $.data(target[0],"data");
		
		target.find(".a-close").click(function(){
	        popClose(target);              
	    });
		if(options.has_ok){
			target.find("._btn_ok").click(function(){
				if(options && options.onOk){
					var params = $.data(target[0],"params");
					options.onOk.call(target, params);
				}
		        popClose(target);              
		    });
		}
		
		if(options.has_cancel){
			target.find("._btn_cancel").click(function(){
				if(options && options.onCancel){
					var params = $.data(target[0],"params");
					options.onCancel.call(target, params);
				}
		        popClose(target);              
		    });
		}		
	}
	
	function popClose(target){
		target.find(".open-bg").fadeOut();
		target.find(".open-msg1").hide();
		var options = $.data(target[0],"data");
		var params = $.data(target[0],"params");
		if(options && options.onClose){
			options.onClose.call(target, params);
		}
		$.data(target[0],"params", null);
    }
    	
	function show(target, params) {
		var options = $.data(target[0],"data");
		$.data(target[0],"params", params);
		if(options && options.onShow){
			options.onShow.call(target, params);
		}
		target.find(".open-bg").show().css("height",$(document).height()).animate({"opacity":0.5});
		target.find(".open-msg1").show();
	}
	
	function alert(target, params){
		var option = { has_cancel: false };
		if (typeof params == 'string'){
			option.content = params;
		}else{
			$.extend(option,params);
		}
		var old_options = $.data(target[0],"data");
		old_options = old_options || {};
		var new_options = $.extend(true,{},$.fn.calert.defaults,old_options,option);
		$.data(target[0],"data",new_options);
		if(target.children().length == 0){			
			//初始化提示框
			init(target);
		}else{
			target.find("._btn_cancel").hide();
			if (typeof params == 'string'){
				target.find(".openDesHook").html(params);
			}else{
				if(params.title){
					target.find(".openTitle").html(params.title);
				}
				if(params.content){
					target.find(".openDesHook").html(params.content);
				}
				if(params.icon){
					var icon_span = target.find(".openDesHook");
					if(params.icon == 'ok'){
						icon_span.removeClass("openDesExclamation");
					}
					if(params.icon == 'warn'){
						icon_span.addClass("openDesExclamation");
					}
				}
				if(params.ok_text){
					target.find("._btn_ok").html(params.ok_text);
				}
			}			
		}		
		show(target);
	}
})(jQuery);