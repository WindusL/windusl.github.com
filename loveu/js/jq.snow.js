/**
 * js网页雪花效果jquery插件 
 */
(function($){
	
	$.fn.snow = function(options){
	
			var $flake 			= $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('&hearts;'),
				documentHeight 	= $(document).height()-80,
				documentWidth	= $(document).width()-60,
				defaults		= {
									minSize		: 10,		//雪花的最小尺寸
									maxSize		: 20,		//雪花的最大尺寸
									newOn		: 1000,		//雪花出现的频率
									flakeColor	: "#FF0000"	//懒人建站 www.51xuediannao.com   整理
								},
				options			= $.extend({}, defaults, options);
			
			var interval		= setInterval( function(){
				var startPositionLeft 	= Math.floor(Math.random()*(documentWidth-0+1)+0),
				 	startOpacity		= 0.5 + Math.random(),
					sizeFlake			= options.minSize + Math.random() * options.maxSize,
					endPositionTop		= documentHeight,
					endPositionLeft		= Math.floor(Math.random()*((startPositionLeft+500)-(startPositionLeft-500)+1)+(startPositionLeft-500)),
					durationFall		= documentHeight * 10 + Math.random() * 5000;

					if(endPositionLeft>=documentWidth){
						endPositionLeft = documentWidth;
					}
					if(endPositionLeft<0){
						endPositionLeft = 0;
					}

					console.log("- :"+startPositionLeft)
					console.log("=:"+endPositionLeft)
				$flake.clone().appendTo('body').css({
							left: startPositionLeft,
							opacity: startOpacity,
							'font-size': sizeFlake,
							color: options.flakeColor
						}).animate({
							top: endPositionTop,
							left: endPositionLeft,
							opacity: 0.2
						},durationFall,'linear',function(){
							$(this).remove()
						}
					);
					
			}, options.newOn);
	
	};
	
})(jQuery);