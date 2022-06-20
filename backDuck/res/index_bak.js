	$(window).load(function(){
		//loading加载
		var load = function(){
			this.config={
				x:300,
				y:180,
				lineWidth:5,
				radius:25,
				startAngle:0,
				endAngle:Math.PI/4,
				angleDer:false,
				strokeStyle:["#00FA9A","#00EE00","#00CD66","#00B2EE","#008B00"]
			};
		};
		var loadCan = $("#load")[0];
		var siv;
		load.prototype={
			start:function(){
				if(loadCan&&loadCan.getContext){
					var loadContext = loadCan.getContext("2d");
					loadContext.save();
					
					var that = this;
					var i = 0,temp=0;
					siv = setInterval(function(){
						return function(){
							temp=i-1;
							if(temp==-1){temp=that.config.strokeStyle.length-1;}
							loadContext.clearRect(260,140,80,80);
							loadContext.beginPath();
							loadContext.strokeStyle=that.config.strokeStyle[temp];
							loadContext.arc(that.config.x,that.config.y,that.config.radius,0,Math.PI*2,that.config.angleDer);
							loadContext.lineWidth=that.config.lineWidth;
							loadContext.stroke();
							loadContext.closePath();
							loadContext.beginPath();
							loadContext.strokeStyle=that.config.strokeStyle[i];
							loadContext.arc(that.config.x,that.config.y,that.config.radius,that.config.startAngle,that.config.endAngle,that.config.angleDer);
							loadContext.stroke();
							
							that.config.endAngle+=Math.PI/6;
							if(that.config.endAngle>(Math.PI*2+Math.PI/18)){
								i++;
								if(i>=that.config.strokeStyle.length){
									i=0;
								}
								that.config.startAngle=0;
								that.config.endAngle=0;
								return;
							}
							
						}
					}(),100);	
				}
			},
			end:function(){
				if(loadCan&&loadCan.getContext){
					clearInterval(siv);
					var loadContext = loadCan.getContext("2d");
					loadContext.clearRect(260,140,80,80);
					$("#load").css("background-color","transparent");
				}
			}
		};
		
	//第一段 ..........start
			var txtVal=["您好，请问有什么可以帮到您？","喂您好您好","您嗍罟这有帛杂音宁我听不清楚","那个……我的车","我 这 才 买 的","刚才","那个","在那个","马路边","低大梁","蹭道牙上撞个坑","您好","您的车","辆出险了","现在要报案","现在要报案是吗"];
			var acParam=[{"tim":"100","x":"50","y":"200","color":"255,255,255,0.2","font":"bold 30pt Arial"},
						 {"tim":"1000","x":"150","y":"150","color":"255,255,255,1","font":"bold 30pt 幼圆"},
						 {"tim":"1000","x":"30","y":"240","color":"255,255,255,1","font":"bold 20pt 隶书"},
						 {"tim":"200","x":"100","y":"280","color":"255,255,255,1","font":"bold 20pt 楷书"},
						 {"tim":"500","x":"100","y":"320","color":"255,255,255,1","font":"bold 18pt 行书"}
						];
					var canvas = document.getElementById("myCanvas");
			$("#play").bind("click",function(){		
			var myaudio=document.getElementById("audio");
			myaudio.load();
			new load().start();
			$(this).hide();
			var myitlTime = setInterval(function(){
				if(myaudio.readyState==myaudio.HAVE_ENOUGH_DATA){
					new load().end();
					myaudio.play();
					clearInterval(myitlTime);
					setTimeout(function(){
	
						//第一段					
						firAction();
						
						//第二段
						setTimeout(function(){
							$("#first_div").hide();
							$("#mainBottom").show();
							
							myaudio.currentTime=20;
							//执行队列
							_showOrHide();
							//执行队列
							_slideFun();
						},18100);//20s之后
						
						//第三段
						setTimeout(function(){
							$("#mainBottom").hide();
							$("#screen").show();
							
							myaudio.currentTime=35;
							//执行
							init();
						},33200);//20s之后
						
						//第四段
						setTimeout(function(){
							$("#screen").hide();
							$("#four_div").show();
							
							myaudio.currentTime=53;
							//执行
							starcanvas4();
						},51500);//20s之后
						
						//第五段 王
						setTimeout(function(){
							$("#four_div").hide();
							$("#screen").show();
							myaudio.currentTime=79.5;
							//执行
							init2();
						},78000);//79.5s之后
						
						
						//第6段 刘
						setTimeout(function(){
							$("#screen").hide();
							$("#bod6").show();
							myaudio.currentTime=95;

							//执行
							startCanvals6();
						},93500);//79.5s之后
						
						//第6段王
						setTimeout(function(){
							$("#bod6").hide();
							$("#screen").show();
							myaudio.currentTime=115.5;

							//执行
							init4();
						},114500);//79.5s之后
						
						//第 王
						setTimeout(function(){
							$("#bod6").hide();
							$("#screen").show();
							myaudio.currentTime=119.83;

							//执行
							init3();
						},118100);//79.5s之后

						
						//第七段 路
						setTimeout(function(){
							$("#screen").hide();
							$("#mycanvas7").show();
							myaudio.currentTime=161.0;
							//执行
							starcanvas7();
						},159000);//79.5s之后
						
						//最后一段 徐
						setTimeout(function(){
							$("#mycanvas7").hide();
							$("#main10_2").show();
							myaudio.currentTime=185;
							//执行
							_slideFun10();
							_actionFun10();
						},183000);//79.5s之后
					},2000);
					
				}
			},1);
			});
		
		//First
		function firAction(){
			var context= canvas.getContext("2d");
			context.save();
			var i=0,str="";
			context.fillStyle="rgba("+acParam[0]["color"]+")";
			context.font=acParam[0]["font"];
			context.fillText(txtVal[0],acParam[0]["x"],acParam[0]["y"]);

			context.fillStyle="rgba(255,255,255,1)";
			
			var siv1 = setInterval(function(){
				str+=txtVal[0][i];
				
				context.fillText(str,acParam[0]["x"],acParam[0]["y"]);	
				i++;
				if(i>=txtVal[0].length){
					clearInterval(siv1);
					//Second
					var siv2 = setInterval(function(){
						clearInterval(siv2);
						secAction(context);
					},acParam[1]["tim"]);	
				}
			},acParam[0]["tim"]);
			$("#myCanvas").css("-webkit-transform","scale(0.85)");	
		}
		//Second
		function secAction(context){
			context.restore();
			var i=0,str="";
			context.fillStyle="rgba("+acParam[1]["color"]+")";
			context.font=acParam[1]["font"];
			
			context.fillText(txtVal[1][i],acParam[1]["x"],acParam[1]["y"]);	
			var siv1 = setInterval(function(){
				i++;
				if(i==2){
					clearInterval(siv1);
					context.fillText(txtVal[1][i+1]+txtVal[1][i+2],parseInt(acParam[1]["x"])+200,acParam[1]["y"]);
					//third
					var siv2=setInterval(function(){
						clearInterval(siv2);
						thiAction(context);
					},acParam[2]["tim"]);
					return;
				}
				context.fillText(txtVal[1][i]+txtVal[1][i+1],parseInt(acParam[1]["x"])+80,acParam[1]["y"]);
				
			},500);
		}
		//Third
		function thiAction(context){
			context.restore();
			var i=1,n=0;
			context.fillStyle="rgba("+acParam[2]["color"]+")";
			context.font=acParam[2]["font"];
			context.fillText("你 6 6 6 6 ,",acParam[2]["x"],acParam[2]["y"]);
			var siv1 = setInterval(function(){
				
				if((n>=3&&n<5) || (n>=6&&n<8) || n>8){
					i++;
				}
				if(n==9 || n==10){
					i++;
					context.clearRect(65+30*(i-1),acParam[2]["y"]-30,30,40);
				}else{
					context.clearRect(65+30*(i-1),acParam[2]["y"]-30,30,40);
				}
				n++;
				
				
				if(n==9){
						context.fillText(txtVal[2][n]+txtVal[2][n+1],65+30*(i-1),acParam[2]["y"]);
						n++;
						return;
				}
				
				if(n>9){
						clearInterval(siv1);
						context.fillText(txtVal[2][n]+txtVal[2][n+1],65+30*(i-1),acParam[2]["y"]);
						context.fillText(txtVal[2][n+2],65+30*(i+0.4),acParam[2]["y"]);
						//Four
						fouAction(context);
						return;
				}
				
				context.fillText(txtVal[2][n],65+30*(i-1),acParam[2]["y"]);
			},150);
			
			
			$("#myCanvas").css({"-webkit-transform":"scale(1.3) rotateZ(-10deg) translate3d(50px,-80px,100px)","-webkit-transition-duration":"3s"});
			var siv2=setInterval(function(){
				clearInterval(siv2);
				$("#myCanvas").css({"-webkit-transform":"scale(1.3) rotateZ(-8deg) translate3d(-200px,-80px,100px)","-webkit-transition-duration":"5s"});
				 siv2=setInterval(function(){		
					clearInterval(siv2);	
					$("#myCanvas").css({"-webkit-transform":"scale(1.3) rotateZ(8deg) translate3d(-200px,-80px,100px)","-webkit-transition-duration":"5s"});	
				},1000);
			},4000);
			
		}
		//Four
		function fouAction(context){
			context.restore();
			var i=0;
			context.fillStyle="rgba("+acParam[3]["color"]+")";
			context.font=acParam[3]["font"];
			var siv1 = setInterval(function(){
				if(txtVal[3][i]=="车"){
					//画车
					clearInterval(siv1);
					drawCar(0,context);
					context.strokeText("刚才",430,285);
					siv1 = setInterval(function(){
						clearInterval(siv1);
						context.clearRect(100,255,180,30);
						context.fillStyle="rgba("+acParam[3]["color"]+")";
						context.font=acParam[3]["font"];
						context.fillText(txtVal[4],acParam[3]["x"],acParam[3]["y"]);
						siv1=setInterval(function(){
							clearInterval(siv1);
							drawCar(1,context);
						},300);
					},1500);
					
					return;	
				}
				context.fillText(txtVal[3][i],(parseInt(acParam[3]["x"])+i*30),acParam[3]["y"]);
				i++;
			},acParam[3]["tim"]);
		}
		
		/**
			@pam 运动参数0：不动1：动
		*/
		function drawCar(pam,context){		
				var x=0;
				var siv = setInterval(function(){
					if(pam==0){
						clearInterval(siv);	
					}
					x+=5;
					context.save();
					context.clearRect(415-x,239,100,71);
					context.beginPath();
					context.fillStyle="rgb(255,255,255)";
					context.strokeStyle="rgb(0,0,0)";
					context.moveTo(450-x,280);
					context.lineTo(450-x,240);
					context.lineTo(490-x,240);
					context.lineTo(490-x,280);
					context.stroke();
					context.closePath();
					context.beginPath();
					context.lineCap="round";
					context.lineWidth="40";
					context.moveTo(430-x,280);
					context.lineTo(490-x,280);
					context.stroke();
					context.closePath();
					context.beginPath();
					context.arc(430-x,300,10,0,Math.PI*2,false);
					context.arc(480-x,300,10,0,Math.PI*2,false);
					context.fill();
					context.beginPath();
					context.restore();
					context.font="10pt 黑体";
					context.strokeStyle="rgb(255,255,255)";
					context.closePath();	
					context.restore();
					if(x==5){
						context.strokeText("刚才",430,285);
					}else if(x==90){
						clearInterval(siv);
						context.strokeText("刚才",430,285);
						//车后动作
						var i=0;
						context.font="bold 25pt 黑体";
						siv = setInterval(function(){
							context.clearRect(425,238,72,35);
							context.fillText(txtVal[6+i],430,265);
							if(i==1){
								clearInterval(siv);
								//five
								fivAction(context);
							}
							i++;
						},500);
					}
				},1);
		}
		//five 马路边
		function fivAction(context){
			context.restore();
			context.fillStyle="rgba("+acParam[4]["color"]+")";
			context.font=acParam[4]["font"];
			var i=0;
			var siv1= setInterval(function(){
				clearInterval(siv1);
				$("#myCanvas").css({"-webkit-transform":"scale(1.6) rotateZ(8deg) translate3d(-50px,-80px,100px)","-webkit-transition-duration":"1s"});
				context.fillText(txtVal[8],330,330);
				siv1 = setInterval(function(){
					clearInterval(siv1);
					$("#myCanvas").css({"-webkit-transform":"scale(1.6) rotateZ(8deg) translate3d(-50px,-150px,100px)","-webkit-transition-duration":"1s"});
					context.font="bolder 50px 华文行楷";
					context.translate(300,360);
					context.rotate(Math.PI/180*10);
					context.fillText(txtVal[9],0,0);
					//蹭道牙上撞个坑
					siv1 = setInterval(function(){
						if(i==0){
							context.font="15px 黑体";
							context.fillText(txtVal[10][i]+txtVal[10][i+1]+txtVal[10][i+2],25,25);
							context.fillText(txtVal[10][i+3],70,25);
							context.fillText(txtVal[10][i+4],80,25);
							context.fillText(txtVal[10][i+5],80,25);
							context.fillText(txtVal[10][i+6],80,25);
							i++;
						}else{
							clearInterval(siv1);
							var n=0;
							i=0;
							siv1=setInterval(function(){
								n++;
								context.clearRect(70,12,70+4*n,16);
								context.fillText(txtVal[10][i+3],70,25);
								context.fillText(txtVal[10][i+4],80+n,25);
								context.fillText(txtVal[10][i+5],80+3*n,25);
								context.fillText(txtVal[10][i+6],80+5*n,25);		
								if(n==8){
									clearInterval(siv1);
									//six
									sixAction(context);
								}
							},50);
							
						}
					},500);
				},1800);
					
			},acParam[4]["tim"]);
		}
		
		//six 原点被移动到300,360
		function sixAction(context){
			$("#myCanvas").css({"-webkit-transform":"scale(1.6) rotateZ(-10deg) translate3d(0px,-270px,100px)","-webkit-transition-duration":"1s"});
			context.font="15pt 黑体"
			var siv=setInterval(function(){
				clearInterval(siv);
				context.fillText(txtVal[11],60,50);		
				//车辆出险效果
				var i=0,j=0;
				siv=setInterval(function(){
					clearInterval(siv);
					context.font="bolder 30px 黑体";
					var siv2 = setInterval(function(){
						if(j<=160){
							i+=5;
							j=i;		
						}else{
							i--;
							if(i<=135){
								clearInterval(siv2);
								//$("audio")[0].load();
								context.translate(0,0);
								context.clearRect(0,0,canvas.width,canvas.height);	
							}	
						}
						
						context.clearRect(-120,55,607,30);
						context.fillText(txtVal[12],-150+i,80);
						context.fillText(txtVal[13],220-i,80);
						/*
						if(i>=15){
							context.fillText(txtVal[12],-90+i,75);
						}						else{
							context.fillText(txtVal[12][0],-90+i,75);	
							context.fillText(txtVal[12][1],-85+2*i,75);	
							context.fillText(txtVal[12][2],-80+3*i,75);		
						}
						
						if(j>=30){
							context.fillText(txtVal[13],270-5*i,75);	
						}else{
							context.fillText(txtVal[13][0],270-5*j,75);	
							context.fillText(txtVal[13][1],265-4*j,75);	
							context.fillText(txtVal[13][2],260-3*j,75);
							context.fillText(txtVal[13][3],255-2*j,75);		
						}
						*/
					},20);
				},500);
			},1500);
			
			
		}
		//第一段 ................end
		//第二段............start
		var showOrHide = [
			function(){
				$("#div1").delay(500).show(_showOrHide);
			},
			function(){
				$("#div2").delay(500).show(_showOrHide);	
			},
			function(){
				$("#div3").delay(500).show("fast",function(){$("#div4").delay(500).show(_showOrHide);});
			},
			function(){
//				$("#totle")[0].style.webkitTransition="all 0s ease-in-out";
				$("#div5").delay(300).show("fast",function(){$("#div6").delay(100).show(_showOrHide)});
			},
			function(){
				$("#div7").delay(500).show("fast",function(){$("#div8").delay(100).show(_showOrHide)});
			},
			function(){
				$("#div9").delay(400).show("fast",function(){$("#div10").delay(200).show(_showOrHide)});
			},
			function(){
				$("#div11en").delay(500).show("fast",function(){$("#div12").delay(200).show("fast",function(){$("#div13").delay(200).show(_showOrHide);})});
			},
			function(){
				$("#div7").hide();
				$("#div8").hide();
				$("#div14").delay(300).show(_showOrHide);
			},
			function(){
				$("#div15").delay(1000).show(_showOrHide);
			},
			function(){
				$("#div16").delay(1500).show(_showOrHide);
			},
			function(){
				$("#div16").hide();
				$("#div17").delay(300).show("fast",function(){$("#div18").delay(500).show(_showOrHide)});
			},
			function(){
				$("#div19").delay(500).show();
			}			
		];
		//定制队列
		$("#totle").queue("showOrHide",showOrHide);
		//定制执行队列的函数
		function _showOrHide(){
			$("#totle").dequeue("showOrHide");
		};
		//定制行为函数（字的滑动）
		var slideFun = [
			//好好好单字蹦出
			function(){
				$("#totle")[0].style.webkitTransition="all 0.5s ease-in-out";
				$("#div1").animate({"width":500},500,_slideFun);
			},
			//整体上移50像素
			function(){
				$("#totle")[0].style.webkitTransition="all 0s ease-in-out";
				$("#totle")[0].style.webkitTransform="translate(0,50px) scale(0.7)";				
				_slideFun();
			},
			//整体放大至原大小
			function(){					
				$("#totle").delay(300).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 2s ease-in-out";
					$("#totle")[0].style.webkitTransform="scale(1)"
				});
				_slideFun();
			},
			//向右上倾斜，并右移
			function(){	
				$("#totle").delay(1300).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all .8s ease-in-out";
					$("#totle")[0].style.webkitTransform="translate(150px,0) rotate(-10deg)"
				});
				_slideFun();
			},
			//向左移
			function(){	
				$("#totle").delay(1300).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 2s ease-in-out";
					$("#totle")[0].style.webkitTransform="translate(0,-100px) rotate(-10deg)"
				});
				_slideFun();
			},
			//由倾斜变为水平
			function(){	
				$("#totle").delay(1300).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 0s ease-in-out";
					$("#totle")[0].style.webkitTransform="translate(0,-50px)"
				});
				_slideFun();
			},
			//缓慢上滑前的缩小
			function(){	
				$("#totle").delay(500).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 2s ease-in-out";
					$("#totle")[0].style.webkitTransform="scale(0.8)"
				});
				_slideFun();
			},
			//缓慢上滑
			function(){	
				$("#totle").delay(400).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 2s ease-in-out";
					$("#totle")[0].style.webkitTransform="translate(0,-100px)"
				});
				_slideFun();
			},
			//快速上滑
			function(){	
				$("#totle").delay(1300).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 0s ease-in-out";
					$("#totle")[0].style.webkitTransform="translate(0,-200px)"
				});
				_slideFun();
			},
			//快速上滑
			function(){	
				$("#totle").delay(1300).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 0s ease-in-out";
					$("#totle")[0].style.webkitTransform="translate(0,-300px)"
				});
				_slideFun();
			},
			//最后一下的快速左移
			function(){
				$("#totle").delay(1300).animate({"":""},function(){
					$("#totle")[0].style.webkitTransition="all 0s ease-in-out";
					$("#totle")[0].style.webkitTransform="translate(-300px,-340px)"
				});
			}
		];
		//根据函数定制队列
		$("#totle").queue("slideList",slideFun);
		//执行队列的函数
		var _slideFun = function(){
			$("#totle").dequeue("slideList");	
		}
		// 第二段................end
		
		//第三段.............start
	function init(){
		var str = '<div id="text_01">是在哪里出的事情<br/><span style="display: none;">是在大连吗？</span></div>'+
					'<div id="text_02">在<span>革镇堡</span></div>'+
					'<div id="text_03">是在...</div>'+
					'<div id="text_04">是吗？</div>'+
					'<div id="text_05">对&nbsp;&nbsp;甘井子</div>'+
					'<div id="text_06" style="display:none;"><span>在大连市的</span><span>那条路？</span></div>'+
					'<div id="text_07"><span>甘</span><span>井</span><span>子</span></div>'+
					'<div id="text_08"><span>革</span><span>镇</span><span>堡</span><span>！</span></div>'+
					'<div id="text_09"><span>干</span><span>警</span><span>市？</span></div>';
		$("#screen").html(str);
		//是在哪里出的事情,是在大连吗？
		$("#text_01")[0].style.webkitTransform = "translate3d(0, -80px, 0)";
		$("#text_01")[0].style.webkitTransitionDuration = "2000ms";
		setTimeout(function(){
			$("#text_01 span").show();
		},1600);
		setTimeout(function(){
			$("#text_01")[0].style.webkitTransform = "rotate(-90deg)";
			$("#text_01")[0].style.marginTop = "200px";
			$("#text_01")[0].style.marginLeft = "-170px";
			$("#text_01")[0].style.webkitTransitionDuration = "1000ms";			
		},2000);
		//在革镇堡
		setTimeout(function(){
			$("#text_02").show();
			setTimeout(function(){
				$("#text_01")[0].style.marginTop = "-65px";
				$("#text_01")[0].style.marginLeft = "35px";
				$("#text_01")[0].style.webkitTransform = "rotate(0deg)";
				$("#text_01")[0].style.webkitTransitionDuration = "1000ms";
				
				$("#text_02")[0].style.webkitTransform = "rotate(90deg)";
				$("#text_02")[0].style.webkitTransitionDuration = "1000ms";
				$("#text_02")[0].style.marginTop = "160px";
				$("#text_02")[0].style.marginLeft = "370px";
			},1000);
		},2800);
		//是在...
		setTimeout(function(){
			$("#text_03").show();			
		},5200);
		//是吗
		setTimeout(function(){
			$("#text_04").show();			
		},7500);
		//对甘井子
		setTimeout(function(){
			$("#text_01")[0].style.webkitTransform = "rotate(-90deg)";
			$("#text_01")[0].style.marginTop = "61px";
			$("#text_01")[0].style.marginLeft = "-381px";
			$("#text_02")[0].style.fontSize = "230px";
			$("#text_02")[0].style.webkitTransform = "rotate(0deg)";
			$("#text_02")[0].style.marginTop = "-135px";
			$("#text_02")[0].style.marginLeft = "-272px";
			
			$("#text_03")[0].style.webkitTransform = "rotate(-90deg)";
			$("#text_03")[0].style.marginTop = "207px";
			$("#text_03")[0].style.marginLeft = "-175px";
			$("#text_04")[0].style.webkitTransform = "rotate(-90deg)";
			$("#text_04")[0].style.marginTop = "211px";
			$("#text_04")[0].style.marginLeft = "-110px";
			setTimeout(function(){
				$("#text_05").show();
			},500);
		},8000);
		setTimeout(function(){
			$("#text_01").hide();
			$("#text_03").hide();
			$("#text_04").hide();

			$("#text_02")[0].style.fontSize = "130px";
			$("#text_02")[0].style.marginTop = "35px";
			$("#text_02")[0].style.marginLeft = "10px";
			$("#text_05")[0].style.fontSize = "50px";
			$("#text_05")[0].style.marginTop = "210px";
			$("#text_05")[0].style.marginLeft = "165px";

			setTimeout(function(){
				$("#text_02 span").hide();
				setTimeout(function(){
					$("#text_02 span").html("革镇堡！");
					$("#text_02 span").show();
				},300);
			},200);
		},9000);
		//在大连市的那条路？
		setTimeout(function(){
			$("#text_02")[0].style.webkitTransform = "rotate(-78deg)";
			$("#text_02")[0].style.fontSize = "300px";
			$("#text_02")[0].style.marginTop = "455px";
			$("#text_02")[0].style.marginLeft = "-667px";
			$("#text_05").hide();
			setTimeout(function(){
				$("#text_06").show();
			},900);
		},10000);
		setTimeout(function(){
			$("#text_06").hide();
			$("#text_02").hide();
			$("#text_07 span:first-child").show();
			setTimeout(function(){
				$("#text_07 span:nth-child(2)").show();
				setTimeout(function(){
					$("#text_07 span:last-child").show();
					setTimeout(function(){
						$("#text_07")[0].style.webkitTransform="rotate(0deg)";
					},200);
				},200);
			},200);
		},12000);
		setTimeout(function(){
			$("#text_08 span:first-child").show();
			setTimeout(function(){
				$("#text_08 span:nth-child(2)").show();
				setTimeout(function(){
					$("#text_08 span:nth-child(3)").show();
					setTimeout(function(){
						$("#text_08 span:last-child").show();
					},200);
				},200);
			},200);
		},13000);
		setTimeout(function(){
			$("#text_08").hide();
			$("#text_07")[0].style.marginTop="-40px";
			$("#text_07")[0].style.marginLeft="-7px";
			$("#text_07")[0].style.fontSize="195px";
			setTimeout(function(){
				$("#text_09 span:first-child").show();
				setTimeout(function(){
					$("#text_09 span:nth-child(2)").show();
					setTimeout(function(){
						$("#text_09 span:last-child").show();
					},200);
				},200);
			},200);
		},13800);
		setTimeout(function(){
			$("#text_02").hide();
			$("#text_09").hide();
			
			$("#text_07")[0].style.marginTop="185px";
			$("#text_07")[0].style.marginLeft="100px";
			$("#text_07")[0].style.fontSize="75px";
			$("#text_07").html("<span style='display:inline;'>甘</span>");
			$("#text_08")[0].style.marginLeft="22px";
			$("#text_08").show();
			
			setTimeout(function(){
				$("#text_07").append("<span style='display:inline;'>井</span>");
				setTimeout(function(){
					$("#text_07").append("<span style='display:inline;'>子</span>");
					setTimeout(function(){
						$("#text_07").append("<span style='display:inline;'>区</span>");
						setTimeout(function(){
							$("#text_08").html("革镇堡");
							setTimeout(function(){
								$("#text_08").html("革镇堡镇");
							},300);
						},300);
					},300);
				},300);
			},300);
		},15500);
	}

	function init2(){
		$("#screen").html("<canvas id='canvas' width='1000px' height='1000px'></canvas>");
		var canvas = document.getElementById("canvas");
		if(canvas==null)return;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle='white';
		ctx.textAlign='left';
		ctx.textBaseline='top';
	
		var radian = Math.PI/180;
		var unitTime = 1/18*1000;//18帧/s，1帧约55.556ms

		ctx.font='bold 160px 黑体';
		ctx.rotate(-7*radian);
		ctx.fillText('啊',0,50);

		setTimeout(function(){
			ctx.fillText('好啦',170,50);
		},4*unitTime);

		setTimeout(function(){
			canvas.style.webkitTransform = 'rotate(4deg)';
			canvas.style.marginTop = '-50px';
			canvas.style.webkitTransitionDuration = 2*unitTime+"ms";
		},7*unitTime);
		setTimeout(function(){
			ctx.font='80px 黑体';
			ctx.fillText('先生我知道了',0,200);
		},8*unitTime);
		setTimeout(function(){
			canvas.style.webkitTransform = 'rotate(8deg)';
			canvas.style.marginTop = '-100px';
			canvas.style.webkitTransitionDuration = 3*unitTime+"ms";
		},21*unitTime);
		setTimeout(function(){
			ctx.font='38px 黑体';
			ctx.fillText('您在那边发生什么事情了',20,300);
		},23*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = '-50px';
			canvas.style.marginLeft = '30px';
			canvas.style.webkitTransform = 'rotate(-8deg)';
			canvas.style.webkitTransitionDuration = 3*unitTime+"ms";
			ctx.font='290px 黑体';
			ctx.fillText('？',450,80);
		},44*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = '-260px';
			canvas.style.marginLeft = '-170px';
			canvas.style.webkitTransform = 'rotate(-83deg)';
			canvas.style.webkitTransitionDuration = 2*unitTime+"ms";
		},62*unitTime);
		setTimeout(function(){
			ctx.translate(620,400);
			ctx.rotate(93*radian);
			ctx.font='200px 黑体';
			ctx.fillText('刚刚',0,0);
		},66*unitTime);
		setTimeout(function(){			
			canvas.style.marginTop = "-400px";
			canvas.style.webkitTransitionDuration = 2*unitTime+"ms";
		},73*unitTime);
		setTimeout(function(){		
			canvas.style.webkitTransform = 'rotate(-87deg)';
			canvas.style.webkitTransitionDuration = "0ms";
			ctx.translate(0,210);//(x,y)
			ctx.rotate(-3*radian);
			ctx.font='190px 黑体';
			ctx.fillText('开车',0,0);
		},75*unitTime);
		setTimeout(function(){			
			canvas.style.marginTop = "-590px";
			canvas.style.marginLeft = "-210px";
			canvas.style.webkitTransform = 'rotate(-89deg) scale(1.3)';
			canvas.style.webkitTransitionDuration = 4*unitTime+"ms";
		},84*unitTime);
		setTimeout(function(){
			ctx.translate(0,180);//(x,y)
			ctx.rotate(2*radian);
			ctx.font='115px 黑体';
			ctx.fillText('不小心',0,0);
		},89*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-795px";
			canvas.style.marginLeft = "-150px";
			canvas.style.webkitTransform = 'rotate(-83deg) scale(1.3)';
			canvas.style.webkitTransitionDuration = 3*unitTime+"ms";
		},97*unitTime);
		setTimeout(function(){
			ctx.translate(0,120);//(x,y)
			ctx.rotate(2*radian);
			ctx.font='41px 黑体';
			ctx.fillText('挂底下道牙子上了',0,0);
		},100*unitTime);
		setTimeout(function(){//倒车挂道牙子上了
			ctx.clearRect(0,0,123,41);
			ctx.font='bold 41px  楷体_GB2312';
			ctx.fillText('倒车挂',0,0);
			canvas.style.marginTop = "-770px";
			canvas.style.marginLeft = "-86px";
			canvas.style.webkitTransform = 'rotate(-77deg) scale(1.3)';
			canvas.style.webkitTransitionDuration = 4*unitTime+"ms";
		},140*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-317px";
			canvas.style.marginLeft = "-518px";
			canvas.style.webkitTransform = 'rotate(-88deg) scale(0.9)';
			canvas.style.webkitTransitionDuration = 4*unitTime+"ms";
		},159*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-383px";
			canvas.style.webkitTransitionDuration = 9*unitTime+"ms";
			ctx.translate(400,-470);//(x,y)
			ctx.rotate(15*radian);
			ctx.font='bold 60px 楷体_GB2312';
			ctx.fillText('那',150,0);
			ctx.fillText('个',210,0);
			var i = 1;
			var timer1 = setInterval(function(){
				if(i<=5){
					ctx.clearRect(150-(i-1)*25,0,60,65);
					ctx.fillText('那',150-i*25,0);
					i++;
				}else{
					clearInterval(timer1);
				}
			},unitTime);
		},163*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-435px";
			canvas.style.webkitTransitionDuration = 15*unitTime+"ms";
			ctx.translate(20,60);
			ctx.font='bold 60px 楷体_GB2312';
			ctx.fillText('低保险',80,0);
			var j = 1;
			var timer2 = setInterval(function(){
				if(j<=13){
					ctx.clearRect(200-(j-1)*15,-60,60,63);
					ctx.fillText('个',200-j*15,-60);
					j++;
				}else{
					clearInterval(timer2);
				}
			},unitTime);
		},172*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-478px";
			canvas.style.webkitTransitionDuration = 9*unitTime+"ms";

			ctx.translate(20,60);
			ctx.font='bold 60px 楷体_GB2312';
			ctx.fillText('低杠',70,0);
			ctx.clearRect(60,-60,60,63);
			ctx.fillText('低',60-14,-60);
			var k = 2;
			var timer3 = setInterval(function(){
				if(k<=5){
					ctx.clearRect(60-(k-1)*14,-60,60,63);
					ctx.fillText('低',60-k*14,-60);
					k++;
				}else if(k>5&&k<=9){
					ctx.clearRect(120-(k-6)*9,-60,60,63);
					ctx.fillText('保',120-(k-5)*9,-60);
					k++;
				}else{
					clearInterval(timer3);
				}
			},unitTime);
		},187*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-505px";
			canvas.style.webkitTransitionDuration = 9*unitTime+"ms";
			ctx.translate(20,60);
			ctx.font='bold 60px 楷体_GB2312';
			ctx.fillText('低大梁',70,0);
			ctx.clearRect(63,-120,60,63);
			ctx.fillText('保',30,-120);
			ctx.clearRect(163,-120,60,63);
			ctx.fillText('险',90,-120);
			ctx.clearRect(50,-60,60,63);
			ctx.fillText('低',20,-60);
			var i = 1;
			var timer4 = setInterval(function(){
				if(i<=3){
					ctx.clearRect(20-(i-1)*15,-60,60,63);
					ctx.fillText('低',20-i*15,-60);
					i++;
				}else if(i>3&&i<7){
					ctx.clearRect(110-(i-6)*20,-60,60,63);
					ctx.fillText('杠',110-(i-5)*20,-60);
					i++;
				}else{
					clearInterval(timer4);
				}
			},unitTime);
		},196*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-521px";
			canvas.style.webkitTransitionDuration = 6*unitTime+"ms";
			ctx.translate(20,60);
			ctx.font='bold 60px 楷体_GB2312';
			ctx.fillText('大',60,0);
			
			ctx.clearRect(70,-120,60,63);
			ctx.fillText('杠',5,-120);
			ctx.clearRect(50,-60,60,63);
			ctx.fillText('低',5,-60);
			var i = 1;
			var timer5 = setInterval(function(){
				if(i<=4){
					ctx.clearRect(5-(i-1)*18,-60,60,63);
					ctx.fillText('低',5-i*18,-60);
					i++;
				}else{
					clearInterval(timer5);
				}
			},unitTime);
		},205*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-554px";
			canvas.style.webkitTransitionDuration = 8*unitTime+"ms";
			ctx.translate(0,60);
			ctx.font='bold 60px 楷体_GB2312';
			ctx.fillText('大梁',80,0);
			ctx.clearRect(110,-120,60,63);
			ctx.fillText('大',-15,-120);
			ctx.clearRect(170,-120,60,63);
			ctx.fillText('梁',75,-120);
			var i = 1;
			var timer6 = setInterval(function(){
				if(i<=2){
					ctx.clearRect(75-(i-1)*20,-120,60,63);
					ctx.fillText('梁',75-i*20,-120);
					i++;
				}else if(i>2&&i<=4){
					ctx.clearRect(100-(i-3)*35,-60,60,63);
					ctx.fillText('大',100-(i-2)*35,-60);
					i++;
				}else if(i>4&&i<=5){
					ctx.clearRect(80,0,60,63);
					ctx.fillText('大',50,0);
					i++;
				}else{
					clearInterval(timer6);
				}
			},unitTime);
		},211*unitTime);
		setTimeout(function(){
			canvas.style.marginTop = "-585px";
			canvas.style.webkitTransitionDuration = 13*unitTime+"ms";
			ctx.translate(0,60);
			ctx.font='bold 60px 楷体_GB2312';
			ctx.fillText('大',-20,0);
			ctx.fillText('架',100,0);
			ctx.fillText('子',160,0);

			ctx.clearRect(50,-60,60,63);
			ctx.fillText('大',-30,-60);
			ctx.clearRect(140,-60,60,63);
			ctx.fillText('梁',30,-60);
			var i = 1;
			var timer7 = setInterval(function(){
				if(i<=4){
					ctx.clearRect(100-(i-1)*15,0,60,63);
					ctx.fillText('架',100-i*15,0);
					i++;
				}else if(i>4&&i<=8){
					ctx.clearRect(160-(i-5)*15,0,60,63);
					ctx.fillText('子',160-(i-4)*15,0);
					i++;
				}else{
					clearInterval(timer7);
				}
			},unitTime);
		},219*unitTime);
		setTimeout(function(){
			canvas.style.marginTop="-651px";
			canvas.style.marginLeft="-288px";
			canvas.style.webkitTransitionDuration = 13*unitTime+"ms";
		},232*unitTime);
		setTimeout(function(){
			canvas.style.marginTop="-601px";
			canvas.style.marginLeft="-298px";
			ctx.rotate(-20*radian);
			ctx.font='bold 120px 黑体';
			ctx.fillText('刮个坑',-300,110);
		},268*unitTime);
		setTimeout(function(){
			canvas.style.marginLeft="600px";
			canvas.style.webkitTransform="rotate(0deg)";
			canvas.style.webkitTransitionDuration = 5*unitTime+"ms";
		},279*unitTime);
	}
	function init3(){
		var radian = Math.PI/180;
		var unitTime = 1/18*1000;
		$("#screen").html("<canvas id='canvas2' width='2000px' height='2000px'></canvas>");
		var canvas2 = document.getElementById("canvas2");
		if(canvas2==null)return;
		var ctx2 = canvas2.getContext('2d');
		ctx2.fillStyle='white';
		ctx2.textAlign='left';
		ctx2.textBaseline='top';

		ctx2.font='bold 50px 黑体';
		ctx2.fillText("其他地方没有啦",30,200);

		setTimeout(function(){
			canvas2.style.marginTop="-50px";
			canvas2.style.webkitTransitionDuration = 3*unitTime+"ms";
			setTimeout(function(){
				ctx2.translate(25,255);
				ctx2.font='bold 50px 黑体';
				ctx2.rotate(-5*radian);
				ctx2.fillText("是您",0,0);
				ctx2.fillText("的车",0,50);
			},2*unitTime);
			setTimeout(function(){
				ctx2.clearRect(0,0,100,100);
				ctx2.rotate(10*radian);
				ctx2.fillText("是您",0,0);
				ctx2.fillText("的车",0,50);
				setTimeout(function(){
					ctx2.clearRect(0,0,100,100);
					ctx2.rotate(-5*radian);
					ctx2.fillText("是您",0,0);
					ctx2.fillText("的车",0,50);
				},4*unitTime);
			},4*unitTime);
		},23*unitTime);
		setTimeout(function(){
			canvas2.style.marginTop="-150px";
			canvas2.style.marginLeft="50px";
			canvas2.style.webkitTransitionDuration = unitTime+"ms";
			setTimeout(function(){
				ctx2.font='bold 150px 黑体';
				ctx2.fillText("擦",100,0);
				ctx2.font='bold 80px 黑体';
				ctx2.fillText("ca",100,120);
				ctx2.translate(250,0);
				ctx2.font='bold 50px 黑体';
				ctx2.fillText("到哪里",0,0);
				ctx2.fillText("啦？",-70,145);
				ctx2.fillText("到墙了",0,50);
				ctx2.fillText("还是",-250,100);
				ctx2.fillText("到哪里?",0,100);
			},2*unitTime);
		},38*unitTime);
		setTimeout(function(){
			canvas2.style.marginTop="-1494px";
			canvas2.style.marginLeft="85px";
			canvas2.style.webkitTransform = 'rotate(-90deg)';
			canvas2.style.webkitTransitionDuration = 10*unitTime+"ms";
		},99*unitTime);
		setTimeout(function(){
			canvas2.style.marginTop="-1500px";
			canvas2.style.webkitTransitionDuration = unitTime+"ms";
			ctx2.translate(170,-90);
			ctx2.rotate(90*radian);
			ctx2.font='bold 35px 黑体';
			ctx2.fillText("擦",0,0);
			setTimeout(function(){
				canvas2.style.marginTop="-1508px";
				canvas2.style.marginLeft="93px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("到",0,35);
			},3*unitTime);
			setTimeout(function(){
				canvas2.style.marginTop="-1516px";
				canvas2.style.marginLeft="101px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("就",0,70);
			},7*unitTime);
			setTimeout(function(){
				canvas2.style.marginTop="-1524px";
				canvas2.style.marginLeft="109px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("是",0,105);
			},9*unitTime);
			setTimeout(function(){
				canvas2.style.marginTop="-1532px";
				canvas2.style.marginLeft="117px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("道",0,140);
			},15*unitTime);
			setTimeout(function(){
				canvas2.style.marginTop="-1540px";
				canvas2.style.marginLeft="125px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("边",0,175);
			},19*unitTime);
			setTimeout(function(){
				canvas2.style.marginTop="-1548px";
				canvas2.style.marginLeft="133px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("那",0,210);
			},21*unitTime);
			setTimeout(function(){
				canvas2.style.marginTop="-1555px";
				canvas2.style.marginLeft="141px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("个",0,245);
			},23*unitTime);
		},113*unitTime);
		setTimeout(function(){
			canvas2.style.marginTop="-1565px";
			canvas2.style.marginLeft="148px";
			canvas2.style.webkitTransitionDuration = unitTime+"ms";
			ctx2.translate(-120,0);
			ctx2.font='bold 90px 黑体';
			ctx2.fillText("道",0,0);
			setTimeout(function(){
				canvas2.style.marginTop="-1575px";
				canvas2.style.marginLeft="156px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("牙",0,120);
			},6*unitTime);
			setTimeout(function(){
				canvas2.style.marginTop="-1585px";
				canvas2.style.marginLeft="160px";
				canvas2.style.webkitTransitionDuration = unitTime+"ms";
				ctx2.fillText("子",0,240);
			},8*unitTime);
		},140*unitTime);
		
		setTimeout(function(){
			canvas2.style.marginTop="-1795px";
			canvas2.style.marginLeft="450px";
			canvas2.style.webkitTransitionDuration = unitTime+"ms";
		},155*unitTime);
		setTimeout(function(){
			$("#screen").html("<canvas id='canvas3' width='2000px' height='2000px'></canvas>");
			var canvas3 = document.getElementById('canvas3');
			if(canvas3==null)return;
			var ctx3 = canvas3.getContext('2d');
			canvas3.style.marginTop="-1000px";
			canvas3.style.marginLeft="-1000px";
			canvas3.style.webkitTransitionDuration = "0ms";
			ctx3.fillStyle='white';
			ctx3.textAlign='left';
			ctx3.textBaseline='top';
			ctx3.translate(1000,1000);
			
			ctx3.font='bold 100px 黑体';
			ctx3.fillText("倒鸭子",50,150);
			ctx3.save();
			ctx3.translate(370,150);
			ctx3.rotate(90*radian);
			ctx3.font='bold 50px 黑体';
			ctx3.scale(2,1);
			ctx3.fillText("？",0,-20);
			ctx3.fillText("？",25,-20);
			ctx3.restore();
			setTimeout(function(){
				ctx3.clearRect(340,150,50,100);
				ctx3.save();
				ctx3.translate(320,150);
				ctx3.font='bold 50px 黑体';
				ctx3.rotate(-5*radian);
				ctx3.fillText("对",20,0);
				ctx3.fillText("呀",20,50);
				ctx3.restore();
			},30*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1024px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				setTimeout(function(){
					canvas3.style.marginTop="-1055px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
				},unitTime);
			},41*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1080px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.font='60px 黑体';
				ctx3.fillText("是个",0,250);
				ctx3.fillText("什么",110,250);
				ctx3.fillText("物体",220,250);
				ctx3.fillText("呢",330,250);
			},43*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1157px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
			},96*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1197px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.translate(410,150);
				ctx3.font='bold 90px 黑体';
				ctx3.fillText('道牙子',0,0);
			},97*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1140px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.font='70px 黑体';
				ctx3.fillText('什么物体',0,90);
			},110*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1195px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText('哎呀妈呀',0,160);
				ctx3.font='40px 黑体';
				ctx3.fillText('就',0,230);
				ctx3.fillText('是',0,270);
				ctx3.fillText('道',57,230);
				ctx3.fillText('边',57,270);
				ctx3.fillText('公',114,230);
				ctx3.fillText('路',114,270);
				ctx3.fillText('道',171,230);
				ctx3.fillText('边',171,270);
				ctx3.fillText('不',228,230);
				ctx3.fillText('是',228,270);
			},119*unitTime);
			setTimeout(function(){
				setTimeout(function(){
					canvas3.style.marginTop="-1205px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					setTimeout(function(){
						canvas3.style.marginTop="-1210px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
					},unitTime);
				},unitTime);
			},179*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1220px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				setTimeout(function(){
					canvas3.style.marginTop="-1235px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					setTimeout(function(){
						canvas3.style.marginTop="-1250px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
						setTimeout(function(){
							canvas3.style.marginTop="-1265px";
							canvas3.style.webkitTransitionDuration = unitTime+"ms";
							setTimeout(function(){
								canvas3.style.marginTop="-1270px";
								canvas3.style.webkitTransitionDuration = unitTime+"ms";
							},unitTime);
						},unitTime);
					},unitTime);
				},unitTime);
			},185*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1285px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				setTimeout(function(){
					canvas3.style.marginTop="-1300px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
				},unitTime);
			},190*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1320px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.font='56px 黑体';
				ctx3.fillText('有道牙子么',0,310);
			},192*unitTime);//移动：-956-1200
			setTimeout(function(){
				canvas3.style.marginTop="-1200px";
				canvas3.style.marginLeft="-956px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.translate(-240,160);
				ctx3.font='56px 黑体';
				ctx3.fillText('是',0,0);
			},218*unitTime);
			setTimeout(function(){
				ctx3.clearRect(0,0,60,60);
				ctx3.translate(-170,0);
				ctx3.font='56px 黑体';
				ctx3.fillText('是，是那个',0,0);
			},221*unitTime);
			setTimeout(function(){
				ctx3.clearRect(0,0,115,60);
			},227*unitTime);
			setTimeout(function(){
				ctx3.clearRect(0,0,280,60);
				ctx3.font='56px 黑体';
				ctx3.fillText('是墙',168,0);
			},227*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1203px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				setTimeout(function(){
					canvas3.style.marginTop="-1205px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					setTimeout(function(){
						canvas3.style.marginTop="-1207px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
					},unitTime);
				},unitTime);
			},243*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1230px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText('还是铁杆',56,56);
			},246*unitTime);
			setTimeout(function(){
				ctx3.fillText('还是怎么的',0,112);
			},260*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1237px";
				setTimeout(function(){
					canvas3.style.marginTop="-1265px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					setTimeout(function(){
						canvas3.style.marginTop="-1286px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
					},unitTime);
				},unitTime);
			},263*unitTime);
			setTimeout(function(){
				ctx3.translate(280,0),
				ctx3.save();
				ctx3.scale(1,4);
				ctx3.font='bold 60px 黑体';
				ctx3.fillText('？',100,-7);
				ctx3.restore();
				setTimeout(function(){
					canvas3.style.marginTop="-1250px";
					canvas3.style.marginLeft="-976px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					setTimeout(function(){
						canvas3.style.marginTop="-1215px";
						canvas3.style.marginLeft="-990px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
					},unitTime);
				},3*unitTime);
			},281*unitTime);
			setTimeout(function(){
				ctx3.font='bold 60px 黑体';
				ctx3.fillText('石',0,0);
				ctx3.fillText('头',0,60);
				setTimeout(function(){
					ctx3.clearRect(0,0,60,120);
					ctx3.font='bold 70px 黑体';
					ctx3.fillText('石',0,0);
					ctx3.fillText('头',0,70);
					setTimeout(function(){
						ctx3.clearRect(0,0,70,140);
						ctx3.font='bold 80px 黑体';
						ctx3.fillText('石',0,0);
						ctx3.fillText('头',0,80);
						setTimeout(function(){
							ctx3.clearRect(0,0,80,160);
							ctx3.font='bold 90px 黑体';
							ctx3.fillText('石',0,0);
							ctx3.fillText('头',0,90);
							setTimeout(function(){
								ctx3.clearRect(0,0,90,180);
								ctx3.font='bold 90px 黑体';
								ctx3.fillText('石',0,0);
								ctx3.fillText('头',0,100);
								
							},unitTime);
						},unitTime);
					},unitTime);
				},unitTime);
			},287*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1259px";
				canvas3.style.marginLeft="-984px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				setTimeout(function(){
					canvas3.style.marginTop="-1303px";
					canvas3.style.marginLeft="-978px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
				},unitTime);
			},312*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1347px";
				canvas3.style.marginLeft="-970px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.font="bold 34px 黑体";
				ctx3.fillText("是土是吗",0,190);
			},314*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-945px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				setTimeout(function(){
					canvas3.style.marginLeft="-915px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					ctx3.font="bold 50px 黑体";
					ctx3.fillText("石块！",-280,168);
					setTimeout(function(){
						canvas3.style.marginLeft="-905px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
					},unitTime);
				},unitTime);
			},348*unitTime);
			setTimeout(function(){
				ctx3.clearRect(-280,168,150,50);
				ctx3.fillText("就是道边",-280,168);
				setTimeout(function(){
					canvas3.style.marginTop="-1358px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					setTimeout(function(){
						canvas3.style.marginTop="-1369px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
					},unitTime);
				},6*unitTime);
			},356*unitTime);
			setTimeout(function(){
				canvas3.style.marginTop="-1402px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("铺道牙子",-280,218);
			},365*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-945px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				setTimeout(function(){
					canvas3.style.marginLeft="-975px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					setTimeout(function(){
						canvas3.style.marginLeft="-997px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
					},unitTime);
				},unitTime);
			},373*unitTime);
			setTimeout(function(){
				ctx3.fillText("那个石块！",-80,218);
				setTimeout(function(){
					canvas3.style.marginTop="-1528px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
				},9*unitTime);
			},377*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1025px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.translate(-80,290);
				ctx3.font="30px 黑体";
				ctx3.fillText("每",0,0);
			},392*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1050px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("个",30,0);
			},393*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1075px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("公",60,0);
			},396*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1100px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("路",90,0);
			},398*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1125px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("道",120,0);
			},401*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1150px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("边",150,0);
			},403*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1175px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("不",180,0);
			},405*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1200px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("都",210,0);
			},409*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1225px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("有",240,0);
			},413*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1250px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("道",270,0);
			},415*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1300px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("边",300,0);
			},417*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1325px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("那",330,0);
			},421*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1350px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("个",360,0);
			},423*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1375px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("道",390,0);
			},427*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1400px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("牙",420,0);
			},431*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1425px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("子",450,0);
			},433*unitTime);
			setTimeout(function(){
				canvas3.style.marginLeft="-1450px";
				canvas3.style.webkitTransitionDuration = unitTime+"ms";
				ctx3.fillText("吗",480,0);
				setTimeout(function(){
					canvas3.style.marginLeft="-1465px";
					canvas3.style.webkitTransitionDuration = unitTime+"ms";
					ctx3.fillText("？",510,0);
					setTimeout(function(){
						canvas3.style.marginLeft="-1485px";
						canvas3.style.webkitTransitionDuration = unitTime+"ms";
						ctx3.fillText("！",540,0);
					},5*unitTime);
				},unitTime);
			},438*unitTime);
			setTimeout(function(){
				ctx3.font="bold 100px 黑体";
				ctx3.fillText("倒鸭子?",300,30);
			},451*unitTime);
			setTimeout(function(){
				canvas3.style.webkitTransform = "rotate(90deg)";
				canvas3.style.marginTop="-1631px";
				canvas3.style.marginLeft="-275px";
				canvas3.style.webkitTransitionDuration = 5*unitTime+"ms";
			},511*unitTime);
			setTimeout(function(){
				ctx3.font="bold 30px 黑体";
				ctx3.translate(500,-80);
				ctx3.rotate(-90*radian);
				ctx3.fillText("就是道边道牙子那个石块",0,0);
				ctx3.fillText("你叫那个过来出险看一",30,30);
				ctx3.fillText("下就知道了",180,60);
			},516*unitTime);
		},158*unitTime);
	}
	function init4(){
		$("#screen").html("<canvas id='canvas4' width='1000px' height='1000px'></canvas>");
		var canvas4 = document.getElementById("canvas4");
		if(canvas4==null)return;
		var ctx4 = canvas4.getContext('2d');
		ctx4.fillStyle='white';
		ctx4.textAlign='left';
		ctx4.textBaseline='top';
		
		var unitTime = 1000/18;
		//还有没有其他地方受损呢，嗯。。。别de的地方没有
		ctx4.font="bold 40px 黑体";
		ctx4.rotate(10*Math.PI/180);
		ctx4.fillText("还",310,0);
		setTimeout(function(){
			canvas4.style.marginTop="-18px";
			ctx4.fillText("有",310,40);
			setTimeout(function(){
				canvas4.style.marginTop="-36px";
				ctx4.fillText("没",310,80);
				setTimeout(function(){
					canvas4.style.marginTop="-54px";
					ctx4.fillText("有",310,120);
					setTimeout(function(){
						canvas4.style.marginTop="-72px";
						ctx4.fillText("其",310,160);
						setTimeout(function(){
							canvas4.style.marginTop="-90px";
							ctx4.fillText("他",310,200);
							setTimeout(function(){
								canvas4.style.marginTop="-108px";
								ctx4.fillText("地",310,240);
								setTimeout(function(){
									canvas4.style.marginTop="-126px";
									ctx4.fillText("方",310,280);
									setTimeout(function(){
										canvas4.style.marginTop="-144px";
										ctx4.fillText("受",310,320);
										setTimeout(function(){
											canvas4.style.marginTop="-162px";
											ctx4.fillText("损",310,360);
											setTimeout(function(){
												canvas4.style.marginTop="-180px";
												ctx4.fillText("呢",310,400);
											},2*unitTime);
										},3*unitTime);
									},2*unitTime);
								},2*unitTime);
							},3*unitTime);
						},2*unitTime);
					},3*unitTime);
				},2*unitTime);
			},4*unitTime);
		},2*unitTime);
		setTimeout(function(){
			canvas4.style.marginTop="30px";
			canvas4.style.marginLeft="-100px";
			ctx4.rotate(-10*Math.PI/180);
			ctx4.font='bold 80px 黑体';
			ctx4.fillText("嗯",390,0);
			setTimeout(function(){
				ctx4.fillText("。",470,0);
				setTimeout(function(){
					ctx4.fillText("。",510,0);
					setTimeout(function(){
						ctx4.fillText("。",550,0);
					},unitTime);
				},3*unitTime);
			},unitTime);
		},44*unitTime);
		setTimeout(function(){
			ctx4.font='bold 50px 黑体';
			ctx4.fillText("别de",360,100);
			setTimeout(function(){
				ctx4.clearRect(410,100,50,50);
				ctx4.fillText("的",410,100);
				setTimeout(function(){
					ctx4.fillText("地方",460,100);
					setTimeout(function(){
						ctx4.fillText("没有",560,100);
					},6*unitTime);
				},unitTime);
			},4*unitTime);
		},50*unitTime);
		setTimeout(function(){
			canvas4.style.marginTop="-265px";
			canvas4.style.marginLeft="-275px";
			canvas4.style.webkitTransform="rotate(84deg)";
			canvas4.style.webkitTransitionDuration = 9*unitTime+"ms";
		},65*unitTime);
	}
//第三段结束	
//第四段开始	
		function starcanvas4(){
			var mycanvas=document.getElementById("mycanvas");
					var ctx=mycanvas.getContext("2d");
					ctx.fillStyle='white';
					ctx.font='55px 黑体';
					
					ctx.save();
					ctx.translate(540,100);
					ctx.rotate(Math.PI/180*90);
					ctx.fillText('是吗',0,0);
					ctx.restore();
					
					ctx.save();
					ctx.translate(0,0);
					ctx.rotate(Math.PI/180*-2);
					ctx.fillText("先生",260,150);
					setTimeout(function(){
						ctx.fillText("您好",370,135);
					mycanvas.style.webkitTransitionDuration='500ms';
					mycanvas.style.webkitTransform='translate(25px,-20px)';
					},300);
					setTimeout(function(){
								ctx.rotate(Math.PI/180*-2);
						ctx.fillText("是在大连市的干警",50,210);
					},500);
					setTimeout(function(){
							ctx.clearRect(50,160,450,70);
							ctx.fillText("干警两个字是",155,210);
							ctx.fillText("怎么写的",260,275);
						/*setTimeout(function(){
								ctx.fillText("怎么写的",260,275);
						},400);*/
					},2300);
					ctx.restore();
					
			
					
					setTimeout(function(){
						ctx.save();
						ctx.translate(550,900);
						ctx.rotate(Math.PI/180*-176);
						ctx.font='100px 黑体';
						ctx.fillText("革镇堡镇",20,380);
						ctx.font='80px 黑体';
						ctx.fillText("甘井子开发区",50,500);
								
						mycanvas.style.webkitTransitionDuration='300ms';
						mycanvas.style.webkitTransform='translate(-350px,-500px) rotate(180deg)';
				
						setTimeout(function(){
								ctx.clearRect(50,430,1200,120);
								ctx.fillText("呃",50,500);
								setTimeout(function(){
									ctx.clearRect(50,430,900,90);
									ctx.fillText("甘井子区",50,500);
									ctx.restore();
								},700);
						},2500);
					},4500);
				
				setTimeout(function(){
						mycanvas.style.webkitTransitionDuration='500ms';
						mycanvas.style.webkitTransform='rotate(0deg)';
						ctx.clearRect(0,0,500,350);
						ctx.save();
						ctx.rotate(Math.PI/180*2);
						ctx.fillText("干",230,300);
						setTimeout(function(){
							mycanvas.style.webkitTransitionDuration='400ms';
							mycanvas.style.webkitTransform='translate(-150px,0)';
							
							ctx.save();
							ctx.translate(540,100);
							ctx.rotate(Math.PI/180*90);
							ctx.fillText('是吗',0,80);
							ctx.restore();
							
							setTimeout(function(){
								ctx.save();
								ctx.clearRect(350,30,300,200);
								ctx.translate(680,100);
								ctx.rotate(Math.PI/180*90);
								ctx.fillText('是吗',0,80);
								ctx.fillText('是吗',0,0);
								ctx.restore();
								
								setTimeout(function(){
									ctx.save();
									ctx.font='bold 120px 黑体';
									ctx.strokeStyle='white';
									ctx.shadowBlur=3;
									ctx.strokeText("对",400,200);
								//	ctx.restore();
								},650);
								
								setTimeout(function(){
									ctx.clearRect(320,40,200,200);
									ctx.font='120px 黑体';
									ctx.strokeText("对",400,250);
									ctx.restore();
									
									setTimeout(function(){
										ctx.clearRect(365,120,200,150);
									},400);
								},750);
							},900);

							
					
							ctx.fillText(" 警",300,300);
							setTimeout(function(){
								ctx.fillText(" 市",380,300);
								setTimeout(function(){
									ctx.fillText(" 区",460,300);
									ctx.restore();
								},200);
							},200);
							
						},700);
				},8200);
				
				
				setTimeout(function(){
					mycanvas.style.webkitTransitionDuration='500ms';
					mycanvas.style.webkitTransform='translate(-130px,-110px) rotate(15deg)';
					
					setTimeout(function(){
						ctx.save();
						ctx.translate(340,430);
						ctx.rotate(Math.PI/180*-82);
						ctx.font='130px 黑体';
						ctx.fillText('干',20,-90);
						
						ctx.moveTo(85,-80);
						ctx.lineWidth=10;
						ctx.strokeStyle='white';
						ctx.lineTo(85,-80);
						ctx.stroke();
						
						var y=-80;
						var ita1=setInterval(
							function(){
								if(y>=130){
									ctx.restore();
									clearInterval(ita1);
									return;
								}else{
									y=y+4
									ctx.lineTo(85,y);
									ctx.stroke();
								}
							},20);
					},500);
					
					setTimeout(function(){
						mycanvas.style.webkitTransitionDuration='500ms';
						mycanvas.style.webkitTransform='translate(-180px,-110px)  rotate(15deg)';
					},1000);
					
					setTimeout(function(){
						ctx.save();
						ctx.translate(90,140);

						ctx.font='bold 25px 黑体';
						ctx.fillStyle='white';
						ctx.shadowBlur=3;
						ctx.fillText("敬",-10,15);
						ctx.fillText("言",-7,40);
						ctx.restore();
					},600);
					
				},10950);
				
				
				setTimeout(function(){
						mycanvas.style.webkitTransitionDuration='500ms';
						mycanvas.style.webkitTransform='translate(-480px,-380px) rotate(82deg)';
						
						setTimeout(function(){
							ctx.save();
							ctx.translate(550,430);
							ctx.rotate(Math.PI/180*-82);
						//	ctx.globalCompositeOperation='destination-over';
							ctx.fillStyle='white';
							ctx.font='30px 黑体';
							ctx.fillText('对',10,10);
							ctx.font='40px 黑体';
							ctx.fillText('对',40,10);
							ctx.font='50px 黑体';
							ctx.fillText('对',80,10);
							ctx.restore();
						},500);
				},16000);
				
				setTimeout(function(){
					mycanvas.style.webkitTransitionDuration='200ms';
					mycanvas.style.webkitTransform='translate(-50px,-100px) rotate(-5deg)';
					
					
					ctx.save();
					ctx.rotate(Math.PI/180*2);
					ctx.clearRect(300,255,240,60);
					ctx.clearRect(547,260,60,200);

					ctx.rotate(Math.PI/180*3);
					ctx.fillStyle='rgba(255,255,255,0.2)';
					ctx.fillText(" 警 市 区",280,280);
					
					setTimeout(function(){
						ctx.clearRect(300,230,80,60);
						ctx.fillStyle='rgba(255,255,255,1.0)';
						ctx.fillText(" 警",280,280);
					},500);

					
					setTimeout(function(){
						ctx.clearRect(380,230,80,60);
						ctx.fillText(" 市",350,280);
					},700);
					
					
					setTimeout(function(){
						ctx.clearRect(440,230,80,60);
						ctx.fillText(" 区",420,280);
						ctx.restore();
						ctx.save();
						ctx.font='25px 黑体';
						ctx.translate(490,278);
						ctx.rotate(Math.PI/180*92);
						ctx.fillText("哪里",0,0);
						ctx.restore();
					},900);
				},17200);
				
				
				setTimeout(function(){
					mycanvas.style.webkitTransitionDuration='300ms';
					mycanvas.style.webkitTransform='translate(-350px,-500px) rotate(180deg)';
					
					/*setTimeout(function(){
						ctx.save();
						ctx.translate(550,900);
						ctx.rotate(Math.PI/180*-176);
						ctx.font='80px 黑体';
						ctx.clearRect(125,430,500,90);
						//ctx.fillText("井子开发区",130,500);
						setTimeout(function(){
							ctx.fillText("井子区",130,500);
							ctx.restore();
						},300);

					},500);*/
					
					setTimeout(function(){
						ctx.save();
						ctx.translate(550,900);
						ctx.rotate(Math.PI/180*-176)
						
						ctx.font='20px 黑体';
						
						ctx.fillText("就",32,460);
						ctx.fillText("是",32,490);

						setTimeout(function(){
						    ctx.clearRect(32,440,20,55);

							ctx.fillText("大",32,460);
							ctx.fillText("连",32,482);
							ctx.fillText("市",32,510);
							ctx.restore();
						},1200);
						setTimeout(function(){
							ctx.save();
							ctx.translate(550,900);
							ctx.rotate(Math.PI/180*-176);
							ctx.font='80px 黑体';
							ctx.clearRect(125,430,500,90);
							//ctx.fillText("井子开发区",130,500);
							ctx.fillText("井",130,500);
							setTimeout(function(){
								ctx.fillText("子区",210,500);
								ctx.restore();
							},300);
	
						},1600);
						setTimeout(function(){
							ctx.save();
							ctx.translate(550,900);
							ctx.rotate(Math.PI/180*-176);
							ctx.font='100px 黑体';
							ctx.clearRect(20,280,400,120);
	
							ctx.fillText("革镇",20,380);
							setTimeout(function(){
									ctx.fillText("堡镇",220,380);
									ctx.restore();
							},300);
						},2200);
						
					},1300);
					
				},18700);
				
				//革陈铺
				setTimeout(function(){
					mycanvas.style.webkitTransitionDuration='500ms';
					mycanvas.style.webkitTransform='translate(-140px,-70px) rotate(-2deg)';
					//ctx.clearRect(0,0,500,350);
					ctx.save();
					ctx.rotate(Math.PI/180*2);
					ctx.font='100px 黑体';
					ctx.fillStyle='rgba(255,255,255,0.3)';
					ctx.fillText("铺",150,160);
					ctx.fillText("陈",200,160);
					ctx.fillText("革",250,160);
					setTimeout(function(){
						ctx.clearRect(100,60,250,110);
						ctx.fillText("铺",150,160);
						ctx.fillText("陈",200,160);
						ctx.fillStyle='rgba(255,255,255,1)';
						ctx.fillText("革",270,160);
						
						setTimeout(function(){
							ctx.clearRect(100,60,250,110);
							ctx.fillStyle='rgba(255,255,255,0.3)';
							ctx.fillText("铺",150,160);
							
							ctx.fillStyle='rgba(255,255,255,1)';
							ctx.fillText("革陈",270,160);

							setTimeout(function(){
								ctx.clearRect(100,60,250,110);
								ctx.fillText("革陈铺",270,160);
							},500);
						},500);
						
						setTimeout(function(){
							ctx.clearRect(0,0,980,1200);
							ctx.font='150px 黑体';
							ctx.fillText("革镇堡",150,300);
							ctx.restore();
						},1600);
					},500);
				},23000)
		}
//第四段结束
		// 第六段开始 刘
		var canvas6 = document.getElementById("myCanvas6");
		var txtArray6=["先生","您好","是您的车在","直行","的时候","还是在","倒车","的 时 候","？","倒车","倒车","的时候","是吧","倒车的时候挂到哪个部位了？","车","對對對","底架","大架子","侧面大架子"];
			function startCanvals6(){
				/*
					初始化动画程序
				*/
				var context = canvas6.getContext("2d");
				var can = new CanFrames();
				var frameTime=0;
				var temp=0;
				
				setInterval(function(){
					frameTime=can.pam.time;
					$("#tim").append(frameTime+"<br/>");	
				},1);
				
				can.ctx=context;
				
				can.mainInter();//开始帧
				can.start();//开始渲染
				
				//first /---创建精灵this.x,165,80,40
				var ft1 = new FText(context,txtArray6[0],200,200,200,165,85,45);
				var ft2 = new FText(context,txtArray6[1],100,170,100,140,85,45);
				var ft3 = new FText(context,"",180,165,180,90,405,90); 
				can.addSprite(0,ft1);
				ft1.speed={x:-3,y:-2};
				ft2.speed={x:-3,y:-2};
				ft3.speed={x:-3,y:-2};
				ft3.config.font="bolder 60pt 黑体";
				var siv1 = setInterval(function(){
					if(ft1.x<=30){
						can.stoping(0);	
						can.stoping(1);		
					}else{
						ft1.move();	
					}
					if(ft1.x<=100){
						if(ft1.x>30){
							can.addSprite(1,ft2);
							ft2.move();
							can.addSprite(2,ft3);
							ft3.move();	
						}else{
							clearInterval(siv1);
							can.stoping(2);
							$("#myCanvas6").css("-webkit-transform","translateY(-150px)");
						}
					}
					
				},15);
				
				var siv2 = setInterval(function(){
					if(ft1.x<=100){
						clearInterval(siv2);
						var siv = setInterval(function(){
							if(temp<txtArray6[2].length){
								ft3.text+=txtArray6[2][temp++];
							}else{
								clearInterval(siv);
								temp=0;	
							}	
						},50);
					}	
				},1);
				
				//直行
				var stZX = new SText(context,txtArray6[3],-200,215,-220,127,210,100);
				stZX.speed={x:20,y:0};
				stZX.config.font="80pt 黑体";
				var siv3 = setInterval(function(){
					if(frameTime>=95){
						for(var i=2;i<=3;i++){
							clearInterval(eval("siv"+i));
						}
						can.addSprite(3,stZX);
						siv3 = setInterval(function(){
							can.sprites[3].move();
							if(stZX.x>=40){
								clearInterval(siv3);
								can.stoping(3);
								siv3=setInterval(function(){
									clearInterval(siv3);
									//的时候	
									var ftSH = new FText(context,txtArray6[4],280,180);
									ftSH.config.font="35pt 黑体";
									can.addSprite(4,ftSH);
									
									siv3 = setInterval(function(){
										clearInterval(siv3);
										can.stoping(4);
										var ftHS = new FText(context,txtArray6[5],280,220);
										can.addSprite(5,ftHS);
										
										siv3 = setInterval(function(){
											var stDC= new SText(context,txtArray6[6],250,320);
											stDC.config.font="bolder 80pt 幼圆";
											can.addSprite(6,stDC);
											clearInterval(siv3);
											var ft7 = new FText(context,"",45,280,45,245,170,50);
											ft7.speed={x:0,y:0};
											can.addSprite(7,ft7);
											siv3 = setInterval(function(){
												if(temp<txtArray6[7].length){
													ft7.text+=txtArray6[7][temp++];	
													ft7.move();
												}else{
													clearInterval(siv3);
													temp=0;
													can.stoping(7);
													for(var i=0;i<can.sprites.length;i++){
														can.stoping(i);	
													}
													context.save();
													var stFH = new SText(context,txtArray6[8],0,0);
													stFH.config.font="bold 100pt 隶书";
													stFH.ctx.translate(60,250);
													stFH.ctx.scale(2,1);
													stFH.ctx.rotate(Math.PI/2);
													can.addSprite(8,stFH);
												}
											},100);
										},100);
										
									},500);
									
								},500);	
							}		
						},20);				
					}	
				},20);
					
				//9倒车--旋转
				var siv4 = setInterval(function(){
					if(frameTime>=98){
						clearInterval(siv4);
						can.stoping(8);
						context.restore();
						var ftDC = new FText(context,txtArray6[9],0,0);
						ftDC.config.font="bold 40pt 黑体";
						ftDC.ctx.translate(350,400);
						ftDC.ctx.rotate(Math.PI/4);
						$("#myCanvas6").css({"-webkit-transform":"rotateZ(-20deg) translateY(-200px)","-webkit-transition-duration":"300ms"});
						can.addSprite(1,ftDC);
						siv4 = setInterval(function(){
							clearInterval(siv4);
							$("#myCanvas6").css({"-webkit-transform":"translateX(400px)","-webkit-transition-duration":"500ms"});	
							temp=10;
							siv4 = setInterval(function(){
								clearInterval(siv4);
								siv4 = setInterval(function(){
									$("#r_div").append(txtArray6[temp++]+"<br/>");	
									if(temp==13){
										temp=0;
										clearInterval(siv4);	
									}
								},200);	
							},200);	
						},1000);
					}	
				},10);
				
				//整体翻转
				var siv5 = setInterval(function(){
					if(frameTime>=100){
						clearInterval(siv5);		
						for(var i=0;i<can.sprites.length;i++){
							can.stoping(i);	
						}
						$("#myCanvas6").css({"-webkit-transform":"rotateZ(-50deg)"});
						$("#r_div").hide();
						siv5 = setInterval(function(){
							clearInterval(siv5);	
							$("#myCanvas6").css({"-webkit-transform":"rotateZ(90deg) translateY(600px)"});
						},500);
					}
				},20);
				
				//翻转后打字
				var siv6 = setInterval(function(){
					if(frameTime>=101){
						clearInterval(siv6);
						$("#bod6").append("<canvas id='can2' width='600px' height='400px' style='position:absolute;top:0px;left:10px;'></canvas>");
						var can2 = document.getElementById("can2");
						var ctx = can2.getContext("2d");
						var ftXZ = new FText(ctx,"",10,250,10,210,515,50);
						can.addSprite(1,ftXZ);
						ftXZ.speed={x:0,y:0};
						siv6 = setInterval(function(){
							if(temp<txtArray6[13].length){
								ftXZ.text+=txtArray6[13][temp++];
								ftXZ.move();	
							}else{
								temp=0;
								clearInterval(siv6);
								can.stoping(1);
								$("#myCanvas6").css("-webkit-transform","rotateZ(0deg) translateY(600px)");
								$("#can2").css({"-webkit-transform":"rotateZ(-90deg)","-webkit-transition-property":"transform","-webkit-transition-duration":"1s"});	
								siv6 = setInterval(function(){
									clearInterval(siv6);
									ctx.translate(450,180);
									ctx.rotate(Math.PI/180*90);
									ctx.fillText("就",0,0);	
									ctx.fillText("是",0,45);	
									ctx.font="20pt 宋体";
									var img = new Image();
									img.src="res/che.jpg";
									siv6 = setInterval(function(){
										clearInterval(siv6);
										ctx.drawImage(img,-45,60,80,90);	
										ctx.fillText("左",-80,75);
										ctx.fillText("侧",-80,105);
										siv6 = setInterval(function(){
											clearInterval(siv6);
											ctx.fillText("底",-80,135);
											ctx.fillText("盘",-80,165);	
											siv6 = setInterval(function(){
												clearInterval(siv6);
												ctx.clearRect(-80,110,30,70);
												ctx.fillText("大",-80,135);
												ctx.fillText("梁",-80,165);	
												siv6 = setInterval(function(){
													clearInterval(siv6);
													img.src="res/chedi.jpg";
													ctx.drawImage(img,-45,150,80,90);
													ctx.font="15pt 隶书";
													ctx.fillText("大",-100,165);
													ctx.fillText("架",-100,185);		
													ctx.fillText("子",-100,205);	
													$("#can2").css({"-webkit-transform":"rotateZ(-90deg) translateX(200px)","-webkit-transition-duration":"10s"});
													$("#myCanvas6").css({"-webkit-transform":"rotateZ(0deg) translateY(230px)","-webkit-transition-duration":"10s"});
													siv6 = setInterval(function(){
														clearInterval(siv6);
														ctx.font="10pt 黑体";
														ctx.fillText("左侧",-80,205);
														siv6 =setInterval(function(){
															clearInterval(siv6);
															ctx.font="20pt 黑体";
															ctx.fillText("是您的",-70,260);	
															siv6 = setInterval(function(){
																clearInterval(siv6);	
																ctx.fillText("车的左侧的",-140,290);
																siv6 = setInterval(function(){
																	clearInterval(siv6);
																	//ctx.strokeRect(-33,268,30,30);
																	ctx.clearRect(-33,268,30,30);
																	ctx.fillText("底盘",-33,290);
																	siv6 = setInterval(function(){
																		clearInterval(siv6);	
																		ctx.font="40pt 黑体";
																		ctx.fillText("受损了",-140,340);
																		siv6 = setInterval(function(){
																			clearInterval(siv6);	
																			ctx.font="20pt 黑体";
																			ctx.fillText("是吗？",-30,380);
																			var str ="";
																			siv6 = setInterval(function(){
																				clearInterval(siv6);
																				siv6 = setInterval(function(){
																					if(temp<txtArray6[15].length){
																						ctx.clearRect(-150,355,100,30);
																						str+=txtArray6[15][temp++];
																						ctx.fillText(str,-140,380);
																					}else{
																						clearInterval(siv6);
																						ctx.font="bolder 28pt 黑体";
																						temp=16;
																						siv6 = setInterval(function(){
																							if(temp==18){
																								clearInterval(siv6);	
																							}
																							ctx.clearRect(-150,388,150,40);
																							ctx.fillText(txtArray6[temp],-150,420);	
																							temp++;
																						},500);
																					}	
																				},100);
																			},1000);	
																		},500);	
																	},500);	
																},500);	
															},500);
														},1000);	
													},500);	
												},500);	
											},1700);
										},800);
									},900);
									
									
								},1100);
							}
						},80);
					}
				},500);
			}
			/*
				创建精灵
			*/
			var Sprite = function(){
				//速度
				this.speed={
					x:1,
					y:1	
				};
			};
			Sprite.prototype={
				//绘制图形
				draw:function(){},
				//图形移动
				move:function(){
					this.x+=this.speed.x;
					this.y+=this.speed.y;
					this.clsX+=this.speed.x;
					this.clsY+=this.speed.y;
					if(this.childs!=null&&this.childs.length>0){
						for(var i=0;i<this.childs.length;i++){
							this.childs[i].speed=this.speed;
							this.childs[i].move();
						}	
					}	
				},
				//添加子精灵
				appendChild:function(sprite){
					if(this.childs==null)this.childs=[];
					this.childs.push(sprite);	
				},
				//渲染子精灵
				drawChild:function(){
					if(this.childs!=null&&this.childs.length>0){
						for(var i=0;i<this.childs.length;i++){
							this.childs[i].draw();
						}	
					}	
				}
			};
			
			
			/*
				创建动画帧
			*/
			var CanFrames=function(x,y,w,h,time){
				this.siv=null;
				this.sprites=[];
			};
			CanFrames.prototype={
				pam:{
						x:0,
						y:0,
						w:0,
						h:0,
						time:0,
						siv:20
					},
				//开始动画
				start:function(){
					this.siv=setInterval((function(param){
						return function(){param.render();}
					})(this),this.pam.siv);	
				},
				//渲染动画
				render:function(){
					for(var i in this.sprites){
						if(typeof(this.sprites[i])=="function") continue;	
						this.ctx.clearRect(this.sprites[i].clsX, this.sprites[i].clsY,this.sprites[i].clsW, this.sprites[i].clsH);
						this.sprites[i].draw();
					}
				},
				//添加动画元素
				addSprite:function(name,sprite){
					this.sprites[name]=sprite;	
				},
				//停止动画
				stoping:function(sprite){
					if(typeof(this.sprites[sprite])=="function") return;
					delete this.sprites[sprite]			
				},
				mainInter:function(){
					var that = this;
					setInterval(function(){
						that.pam.time=parseInt($("audio")[0].currentTime);
						
					},1000);
				}	
			};
			
			
			/*
				创建模块动画
			*/
			// 创建文字对象
			var FText =function(ctx,text,x,y,clsX,clsY,clsW,clsH,config){
				this.ctx= ctx;
				this.text=text;
				this.x=	x;
				this.y= y;
				this.clsX=clsX;
				this.clsY=clsY;
				this.clsW=clsW;
				this.clsH=clsH;
				this.config={
					fillStyle:"#ffffff",
					font:"bold 30pt 黑体"
				}
			}
			
			FText.prototype = new Sprite();
			FText.prototype.draw=function(){
				this.ctx.beginPath();
				this.ctx.fillStyle=this.config.fillStyle;
				this.ctx.font=this.config.font;
				this.ctx.fillText(this.text,this.x,this.y);
				//this.ctx.strokeRect();
				this.drawChild();
			};
			
			var SText =function(ctx,text,x,y,clsX,clsY,clsW,clsH,config){
				this.ctx= ctx;
				this.text=text;
				this.x=	x;
				this.y= y;
				this.clsX=clsX;
				this.clsY=clsY;
				this.clsW=clsW;
				this.clsH=clsH;
				this.config={
					strokeStyle:"#ffffff",
					font:"bold 30pt 黑体"
				}
			}
			
			SText.prototype = new Sprite();
			SText.prototype.draw=function(){
				this.ctx.beginPath();
				this.ctx.strokeStyle=this.config.strokeStyle;
				this.ctx.font=this.config.font;
				this.ctx.strokeText(this.text,this.x,this.y);
				//this.ctx.strokeRect(200,127,210,100);
				this.drawChild();
			};
		// 第六段结束
		
//第七段开始
		function starcanvas7(){
			
			var mycanvas7=document.getElementById("mycanvas7");
			$(mycanvas7).show("normal",function(){

				mycanvas7.style.webkitTransitionDuration='1000ms';
				mycanvas7.style.webkitTransform='translate(-50px, 0px)';

				setTimeout(function(){
					$("#p701_1").show("normal",function(){
						mycanvas7.style.webkitTransitionDuration='300ms';
						mycanvas7.style.webkitTransform='skew(10deg) rotate(25deg)';
						
						setTimeout(function(){
							$("#p702").show();
						},300);
						
						setTimeout(function(){
							$("#p701_2").css({"width":"0px","display":"block"}).animate({"width":"300px"},1000);
						},500);
					});
				},1000);
			});
		
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='300ms';
					mycanvas7.style.webkitTransform='skew(0deg) rotate(0deg) translate(350px, 120px)';
					
					$("#p703").show();
					
					setTimeout(function(){
						$("#p703").text("那都是大道");
					},800);
					
					setTimeout(function(){
						$("#p703").text("那个道边");
					},1500);
					
					setTimeout(function(){
						$("#p703").text("那都不要紧");
					},2100);
	
			},4000);//2分45
			
					
			setTimeout(function(){
					mycanvas7.style.webkitTransitionTimingFunction='ease-out';
					mycanvas7.style.webkitTransitionDuration='300ms';
					mycanvas7.style.webkitTransform='translate(300px, 50px)';
				$("#p704").show();
			},7000);//2分47
					
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='300ms';
					mycanvas7.style.webkitTransform='translate(300px, 0px)';
				setTimeout(function(){$("#p705").show();},200);
			},8300);//2分48
					
			//不要求您赔的是吧？
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='300ms';
					mycanvas7.style.webkitTransform='translate(300px, -90px)';
				setTimeout(function(){$("#img706").show();},500);
				setTimeout(function(){
					$("#p707").show();
					setTimeout(function(){
						$("#p707_1").show();
					},300);
					setTimeout(function(){
						$("#p707_2").show();
					},500);
				},800);
			},9300);//2分49
			
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='300ms';
					mycanvas7.style.webkitTransform='rotate(2deg) translate(920px, 20px)';
					
					setTimeout(function(){
						mycanvas7.style.webkitTransitionDuration=0;
						mycanvas7.style.webkitTransform='scale(2)translate(920px, 0px)';
						$("#p709").css({"width":"0px","display":"block"}).animate({"width":"500px"},2000);
						mycanvas7.style.webkitTransitionDuration='2000ms';
						mycanvas7.style.webkitTransform='scale(1) skew(-20deg) rotate(2deg) translate(870px, 0px)';
					},800);
			},11000);//2分51 没有对方 就是我的车受损了
			
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='100ms';
					mycanvas7.style.webkitTransform='scale(2.5) skew(0deg) rotate(0deg) translate(860px, -100px)';
					
					$("#p710").show();
					setTimeout(function(){
						$("#p711").show();
						mycanvas7.style.webkitTransitionDuration='300ms';
						mycanvas7.style.webkitTransform='scale(2.5) skew(0deg) rotate(0deg) translate(820px, -125px)';
					},300);
					
			},14100);// 2分54  啊 就是您的车受损了
		 	
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='900ms';
					mycanvas7.style.webkitTransform='scale(1.6) skew(0deg) rotate(0deg) translate(600px, -125px)';
					
					setTimeout(function(){
						$("#p712").show();
						
						setTimeout(function(){
							$("#p712").text("对方");
						},300);
						
						setTimeout(function(){
							$("#p712").remove();
							$("#img713").show();
						},900);
					},300);
					
					$("#p707_0").hide();
					$("#p707_1").hide();
					$("#p707_2").hide();
					
					setTimeout(function(){
						$("#p707").css("left","-235px");
						$("#p707_0").text("的哪个").show();
						
						setTimeout(function(){
							$("#p707_0").text("不需要");
						},500);
						
						setTimeout(function(){
							$("#p707_1").show();
						},800);
						
						setTimeout(function(){
							$("#p707_2").show();
						},1000);
					},1400);
								
			},15200);//2分54  啊 就是您的车受损了
			
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='300ms';
					mycanvas7.style.webkitTransform='scale(1.5) skew(10deg) rotateY(-50deg) translate(720px, -160px)';
					
					$("#p714").show();
					
					setTimeout(function(){
						mycanvas7.style.webkitTransitionDuration='100ms';
						mycanvas7.style.webkitTransform='scale(1.5) skew(10deg) rotateY(-50deg) translate(720px, -190px)';
						$("#p715").show();
					},900);
					
					setTimeout(function(){
						mycanvas7.style.webkitTransitionDuration='100ms';
						mycanvas7.style.webkitTransform='scale(1.5) skew(10deg) rotateY(-50deg) translate(720px, -210px)';
						$("#p716").show();
					},1300);
						
					
					
			},18700);//3分01  啊 就是您的车受损了
			
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='300ms';
					mycanvas7.style.webkitTransform='scale(1.5) skew(0deg) rotateY(60deg) translate(400px, -250px)';
					
					$("#p717").show();
					
					setTimeout(function(){
						$("#p717_1").show();
					},600);
					
					setTimeout(function(){
						$("#p717_2").show();
					},1000);
					
					setTimeout(function(){
						$("#p717_3").show();
					},1500);
					
			},21000);//3分02  啊 就是您的车受损了
			
			setTimeout(function(){
					mycanvas7.style.webkitTransitionDuration='600ms';
					mycanvas7.style.webkitTransform='scale(0.5) skew(0deg) rotateY(0deg) translate(400px, 20px)';
			},23000);//3分04  你让过来看一下,
		}
		////第七段结束
		

		//最后一段
		var tui12 = "res/tui1.png",tui42 = "res/tui4.png";
		var showHide2 = [
			function(){
				$("#touDiv")[0].style.webkitTransform = "translate(0,80px) scale(0.6)";
				$("#touDiv")[0].style.webkitTransition = "all 1s ease-in-out";
				_slideFun10();
			},
			function(){
				$("#touDiv").delay(400).animate({"":""},function(){
					$("#touDiv")[0].style.webkitTransform = "translate(0,-60px) scale(0.6)";
					$("#touDiv")[0].style.webkitTransition = "all 0.3s ease-in-out";
				});
				_slideFun10();
			},
			function(){
				$("#touDiv").delay(10).animate({"":""},function(){
					$("#tou2").fadeIn(9000);
					$("#touDiv")[0].style.webkitTransform = "translate(0,-80px) scale(0.35)";
					$("#touDiv")[0].style.webkitTransition = "all 9s ease-in-out";
				});
				_slideFun10();
			},
			function(){
				$("#yabody").delay(8000).animate({"":""},function(){
					$("#yabody").fadeIn(1000);
					$("#tui1").fadeIn(1000);
					$("#tui2").fadeIn(1000);
				});
				_slideFun10();
			},
			function(){
				$("#main10_3").delay(9000).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(0,-40px) scale(0.8)";
					$("#main10_3")[0].style.webkitTransition = "all 9s ease-in-out";
				});
				_slideFun10();
			},
			//鸭子第一步
			function(){
				$("#main10_3").delay(8100).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(30px,-40px) scale(0.8)";
					$("#main10_3")[0].style.webkitTransition = "all .1s ease-in-out";
					$("#tui1 img").attr("src",tui42);
				});
				_slideFun10();
			},
			//鸭子第二步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(60px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui42);	
					$("#tui1 img").attr("src",tui12);
				});
				_slideFun10();
			},
			//鸭子第三步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(90px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui12);	
					$("#tui1 img").attr("src",tui42);
				});
				_slideFun10();
			},
			//鸭子第四步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(120px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui42);	
					$("#tui1 img").attr("src",tui12);
				});
				_slideFun10();
			},
			//鸭子第五步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(170px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui12);	
					$("#tui1 img").attr("src",tui42);
				});
				_slideFun10();
			},
			//鸭子第六步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(210px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui42);	
					$("#tui1 img").attr("src",tui12);
				});
				_slideFun10();
			},
			//鸭子第七步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(250px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui12);	
					$("#tui1 img").attr("src",tui42);
				});
				_slideFun10();
			},
			//鸭子第八步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransform = "translate(290px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui42);	
					$("#tui1 img").attr("src",tui12);
				});
				_slideFun10();
			},
			//鸭子第九步
			function(){
				$("#main10_3").delay(200).animate({"":""},function(){
					$("#main10_3")[0].style.webkitTransition = "all .5s ease-in-out";
					$("#main10_3")[0].style.webkitTransform = "translate(490px,-40px) scale(0.8)";
					$("#tui2 img").attr("src",tui12);	
					$("#tui1 img").attr("src",tui42);
				});
			}
		];
		//定义队列
		$("#touDiv").queue("slideList",showHide2);
		//定义队列执行函数
		var _slideFun10 = function(){
			$("#touDiv").dequeue("slideList");
		}
		
		//定义字幕的队列的数组
		var action10= [
			function(){
				$("#wenzi").delay(0).animate({"":""},function(){$("#wenzi").html("唉，X先生您好");});
				$("#wenzi").delay(100).animate({"":""},function(){$("#wenzi").html("我再跟您核对");});
				$("#wenzi").delay(100).animate({"":""},function(){$("#wenzi").html("一下当时的信息");});
				$("#wenzi").delay(800).animate({"":""},function(){$("#wenzi").html("是您的车在倒车的时候");});
				$("#wenzi").delay(1500).animate({"":""},function(){$("#wenzi").html("挂到了倒鸭子");});
				$("#wenzi").delay(1000).animate({"":""},function(){$("#wenzi").html("造成了您本车左侧底盘受损，");});
				$("#wenzi").delay(2200).animate({"":""},function(){$("#wenzi").html("对方没事是吧？");});
				$("#wenzi").delay(1700).animate({"":""},function(){$("#wenzi").html("对对对对....哼哼");});
				$("#wenzi").delay(1200).animate({"":""},function(){$("#wenzi").html("啊好了，那个麻烦您现在现场");});
				$("#wenzi").delay(1400).animate({"":""},function(){$("#wenzi").html("暂时不要移动好吗？");});
				$("#wenzi").delay(1300).animate({"":""},function(){$("#wenzi").html("啊，行");});
				$("#wenzi").delay(500).animate({"":""},function(){$("#wenzi").html("唉好，感谢您的配合再见！");});
				$("#wenzi").delay(2300).animate({"":""},function(){$("#wenzi").html("唉呀妈呀，这女的");});
				$("#wenzi").delay(2900).animate({"":""},function(){$("#wenzi").html("");});
			}
		];
		//定义队列
		$("#wenzi").queue("actionList",action10);
		//定义队列执行函数
		var _actionFun10 = function(){
			$("#wenzi").dequeue("actionList");
		}
		//最后一段完
	});//----------------load结束