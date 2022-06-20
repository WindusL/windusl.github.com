/**
 * js网页雪花效果jquery插件 
 */
(function($){
	
	$.fn.snow = function(options){
	
			var $flake1 			= $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('<div style="position:relative;">&hearts;<div style="color:#ffff00;position:absolute;top:25%;left:35%;font-size:50%;">6</div></div>'),
			$flake2 			= $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('<div style="position:relative;">&hearts;<div style="color:#ffff00;position:absolute;top:25%;left:30%;font-size:45%;">周</div></div>'),
			$flake3 			= $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('<div style="position:relative;">&hearts;<div style="color:#ffff00;position:absolute;top:25%;left:30%;font-size:45%;">年</div></div>'),
			flakeIndex = 0,
				documentHeight 	= $(document).height()-60,
				documentWidth	= $(document).width()-60,
				defaults		= {
									minSize		: 10,		//雪花的最小尺寸
									maxSize		: 20,		//雪花的最大尺寸
									newOn		: 1,		//雪花出现的频率
									flakeColor	: "#FF0000"	
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
				
				// 两周年
				var $flake ;	
				if(flakeIndex==0){
					$flake = $flake1;
				}else if(flakeIndex==1){
					$flake = $flake2;
				}else if(flakeIndex==2){
					$flake = $flake3;
				}else{
					flakeIndex=0;
					$flake = $flake1;
				}
				flakeIndex++;

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
							$(this).remove();
						}
					);
					
			}, options.newOn);
	
	};
	
})(jQuery);
