var wenkmList;
if ((navigator.userAgent.match(/(iPhone|iPod|Ipad|Android|ios)/i))) {wenkmTips.show('不支持播放器.');} else {var audio=new Audio(),
	$player=$('#wenkmPlayer'),
	$btns=$('.status',$player),
	$songName=$('.song',$player),
	$cover=$('.cover',$player),
    $songTime = $(".time", $player),
	$songFrom=$('.player .artist',$player),
    $songFrom1=$('.player .artist1',$player),
	roundcolor='#6c6971',
	lightcolor='#81c300',
	resourcePath='../music/',
	playListFile=resourcePath+'info.json',
	lrcFile=resourcePath+'lrc/',
	kscFile=resourcePath+'ksc/',
	volume=.65,
	albumId=0,
	songId=0,
	songTotal=0,
	showLrc=true,
	random=true,
	musicfirsttip=false,
	randomlist=new Array(),
	randomlist2=new Array();
function wenkmCicle(){
$songTime.text(formatSecond(audio.currentTime) + " / " + formatSecond(audio.duration));
	if(audio.currentTime<audio.duration/2){
		$btns.css('background-image','linear-gradient(90deg, '+ roundcolor +' 50%, transparent 50%, transparent), linear-gradient('+ (90+(270-90)/(audio.duration/2)*audio.currentTime) +'deg, '+ lightcolor +' 50%, '+ roundcolor +' 50%, '+ roundcolor +')');
	}else{
		$btns.css('background-image','linear-gradient('+ (90+(270-90)/(audio.duration/2)*audio.currentTime) +'deg, '+ lightcolor +' 50%, transparent 50%, transparent), linear-gradient(270deg, '+ lightcolor +' 50%, '+ roundcolor +' 50%, '+ roundcolor +')')
	}
}
	function formatSecond(t) {
		return ("00" + Math.floor(t / 60)).substr(-2) + ":" + ("00" + Math.floor(t % 60)).substr(-2)
	}
var cicleTime=null;
var wenkmMedia={
	play:function(){
		audio.ontimeupdate=function(){
			wenkmLrc.lrc.play();
			wenkmLrc.ksc.play();
		}
		$player.addClass('playing');
		cicleTime=setInterval(wenkmCicle,800);
		wenkmTips.show('开始播放：'+wenkmList[albumId].song_name[songId] + ' - ' + wenkmList[albumId].artist_name[songId]);
		
		if(hasLrc){
			//lrcTime=setInterval(wenkmLrc.lrc.play,500);
			$('#wenkmLrc').addClass('show');
			$(".fa-word").addClass("current");
		};
		if(hasKsc){
			//kscTime=setInterval(wenkmLrc.ksc.play,95);
			$('#wenkmKsc').addClass('show');
		};
	},
	pause:function(){
		clearInterval(cicleTime);
		$player.removeClass('playing');
		wenkmTips.show('暂停播放');
		
		if(hasLrc){
			//clearTimeout(lrcTime);
			$('#wenkmLrc').removeClass('show');
		};
		if(hasKsc){
			//clearTimeout(kscTime);
			$('#wenkmKsc').removeClass('show');
		};
	},
	error:function(){
		clearInterval(cicleTime);
		$player.removeClass('playing');
		wenkmTips.show('加载歌曲时遇到错误');
	},
	seeking:function(){
		clearInterval(cicleTime);
		$player.removeClass('playing');
		wenkmTips.show('加载中...');
	},
	volumechange:function(){
		var vol=parseInt(audio.volume*100);
		$('.volume-on',$player).width(vol+'%');
		wenkmTips.show('音量：'+ vol +'%');
	},
	getInfos:function(id){
		songId=id;
		audio.src=wenkmList[albumId].song_url[songId];
		//歌曲名称
		$songName.text(wenkmList[albumId].song_name[songId]);
		console.log("开始播放："+wenkmList[albumId].song_name[songId]);
		//歌手及专辑
		$songFrom.text(wenkmList[albumId].artist_name[songId]);
		//$songFrom1.text(infos.album_name);
		$songFrom1.text(wenkmList[albumId].song_album);
		//封面图案
		$cover.addClass('changing');
		var coverImg=new Image();
		coverImg.onload=function(){
					setTimeout(function(){
						$cover.html(coverImg);
					},500)
					setTimeout(function(){
						$cover.removeClass('changing');
					},800)
				};
		coverImg.error=function(){
					$cover.html('').removeClass('changing');
				};
		coverImg.src=wenkmList[albumId].song_img[songId];
		//列表高亮当前播放项
		$('.list li',$player).eq(songId).addClass('current').find('.artist').html('正在播放&nbsp;>&nbsp;').parent().siblings().removeClass('current');
		//设置音量
		audio.volume=volume;
		//开始播放
		audio.play();
		//获取LRC
		wenkmLrc.load();
	},
	getSongId:function(n){
		return n>=songTotal ? 0 : n<0 ? songTotal-1 : n;
	},
	next:function(){
		if(random){
			var temp=songId;
			if(randomlist.length==0){
				randomlist=randomlist2;
				randomlist2=new Array();
				randomlist.sort(function(){return Math.random()>0.5?-1:1;}); 
			}
			songId=randomlist.shift();
			randomlist2.unshift(songId);
			if(temp==songId && songTotal>1){
				wenkmMedia.next();
			}else{
				wenkmMedia.getInfos(songId);
			}
		}else{
			wenkmMedia.getInfos(wenkmMedia.getSongId(songId+1))
		}
	},
	prev:function(){
		if(random){
			var temp=songId;
			if(randomlist2.length==0){
				randomlist2=randomlist;
				randomlist=new Array();
				randomlist2.sort(function(){return Math.random()>0.5?-1:1;}); 
			}
			songId=randomlist2.shift();
			randomlist.unshift(songId);
			if(temp==songId && songTotal>1){
				wenkmMedia.prev();
			}else{
				wenkmMedia.getInfos(songId);
			}
		}else{
			wenkmMedia.getInfos(wenkmMedia.getSongId(songId-1))
		}
	}
};

var wenkmTipsTime=null;
var wenkmTips={
	show:function(cont){
		clearTimeout(wenkmTipsTime);
		$('#wenkmTips').text(cont).addClass('show');
		this.hide();
	},
	hide:function(){
		wenkmTipsTime=setTimeout(function(){
			$('#wenkmTips').removeClass('show');
			if(musicfirsttip==false){
				musicfirsttip=true;
				wenkmTips.show("~键：播放/暂停，左右键：上/下歌曲！");
			}
		},4000)
	}
};
audio.addEventListener('play',wenkmMedia.play,false);
audio.addEventListener('pause',wenkmMedia.pause,false);
audio.addEventListener('ended',wenkmMedia.next,false);
audio.addEventListener('playing',wenkmMedia.playing,false);
audio.addEventListener('volumechange',wenkmMedia.volumechange,false);
audio.addEventListener('error',wenkmMedia.error,false);
audio.addEventListener('seeking',wenkmMedia.seeking,false);

//播放器开关
$('.switch-player',$player).click(function(){
	$player.toggleClass('show');
	$('#wenkmKsc,#wenkmLrc').toggleClass('showPlayer')
});

//播放交互
$('.pause',$player).click(function(){
	audio.pause()
});
$('.play',$player).click(function(){
	audio.play()
});
$('.prev',$player).click(function(){
	wenkmMedia.prev()
});
$('.next',$player).click(function(){
	wenkmMedia.next()
});
$('.random',$player).click(function(){
	$(this).addClass('current');
	$('.loop',$player).removeClass('current');
	random=true;
	wenkmTips.show('随机播放');
});
$('.loop',$player).click(function(){
	$(this).addClass('current');
	$('.random',$player).removeClass('current');
	random=false;
	wenkmTips.show('顺序播放');
});
//音量交互
var $progress=$('.progress',$player);
$progress.click(function(e){
	var progressWidth=$progress.width(),
		progressOffsetLeft=$progress.offset().left;
	volume=(e.clientX-progressOffsetLeft)/progressWidth;
	audio.volume=volume;
});
var isDown=false;
$('.drag',$progress).mousedown(function(){
	isDown=true;
	$('.volume-on',$progress).removeClass('ts5');
});
$(window).on({
	mousemove:function(e){
		if(isDown){
			var progressWidth=$progress.width(),
				progressOffsetLeft=$progress.offset().left,
				eClientX=e.clientX;
			if(eClientX>=progressOffsetLeft && eClientX<=progressOffsetLeft+progressWidth){
				$('.volume-on',$progress).width((eClientX-progressOffsetLeft)/progressWidth*100+'%');
				volume=(eClientX-progressOffsetLeft)/progressWidth;
				audio.volume=volume;
			}
		}
	},
	mouseup:function(){
		isDown=false;
		$('.volume-on',$progress).addClass('ts5');
	}
});
//播放列表交互
$('.switch-playlist').click(function(){
	$player.toggleClass('showList')
});
//载入歌曲列表
$.ajax({
	url:playListFile,
	type:'GET',
	dataType:'json',
	success:function(data){
		wenkmList=data;
		$('.header',$player).text(wenkmList[albumId].song_album);
		songTotal=wenkmList[albumId].song_id.length;
		var li='';
		for(var i=0; i<songTotal; i++){
			randomlist.push(i);
			li+='<li><span class="index">'+ (i+1) +'</span>'+'<span class="artist"></span>' + wenkmList[albumId].song_name[i] + '&nbsp;-&nbsp;' + wenkmList[albumId].artist_name[i] +'</li>';
		};
		randomlist.sort(function(){return Math.random()>0.5?-1:1;}); 
		$('.list',$player).html('<ul>'+ li +'</ul>').mCustomScrollbar();
		songId=randomlist.shift();
		randomlist2.unshift(songId);
		wenkmMedia.getInfos(songId);
		$('.list li',$player).click(function(){
			if($(this).hasClass('current')==false){
				 wenkmMedia.getInfos($(this).index());
			}
		});
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
		wenkmTips.show('歌曲列表获取失败.')
	}
});


//歌词
var hasLrc=false,//是否有lrc歌词
	hasKsc=false,//是否有ksc歌词
	isHideLrc=false,//lrc歌词是否隐藏
	isCloseLrc=false,//lrc歌词是否关闭
	isHideKsc=false,//ksc歌词是否隐藏
	kscLineNow1=false,//是否执行到第1行
	kscLineNow2=false,//是否执行到第2行
	lrcTimeLine=[],
	lrcHeight=$('#wenkmLrc').height(),
	lrcTime=null,
	kscTime=null,
	letterTime1=null,
	letterTime2=null,
	tempNum1=0,
	tempNum2=0;
var wenkmLrc={
	load:function(){
		wenkmLrc.lrc.hide();
		wenkmLrc.ksc.hide();
        $('#wenkmLrc,#wenkmKsc').html('');
		hasLrc=false;
		hasKsc=false;
		//载入LRC歌词
		if(wenkmList[albumId].song_lrc[songId]!=null && wenkmList[albumId].song_lrc[songId]!=''&&isHideLrc==false&&isCloseLrc==false){
			$.ajax({
				url:wenkmList[albumId].song_lrc[songId],
				cache:true,
				dataType:'text',
				success:function(cont){	
					setTimeout(function(){
						wenkmLrc.lrc.format(cont);
					},500);
					$(".fa-word").addClass("current");
				},
				error:function(){
					setTimeout(function(){
						$('#wenkmLrc,#wenkmKsc').html('');
					},500);
				}
			})
			/*
			$.ajax({
				url:wenkmList[albumId].song_lrc[songId],
				cache:false,
				dataType:'text',
				success:function(cont){	
					setTimeout(function(){
						wenkmLrc.lrc.format(cont);
					},500);
				},
				error:function(){
					setTimeout(function(){
						$('#wenkmLrc,#wenkmKsc').html('');
					},500);
				}
			})
			*/
		}
	},
	lrc:{
		format:function(cont){
			hasLrc=true;
			function formatTime(t){
				var sp=t.split(':'),
					min=+sp[0],
					sec=+sp[1].split('.')[0],
					ksec=+sp[1].split('.')[1];
				return min*60+sec+Math.round(ksec/100);
			};
			var lrcCont=cont.replace(/\[[A-Za-z]+:(.*?)]/g,'').split(/[\]\[]/g),
				lrcLine='';
			lrcTimeLine=[];
			for(var i=1; i<lrcCont.length; i+=2){
				var timer=formatTime(lrcCont[i]);
				lrcTimeLine.push(timer);
				if(i==1){
					lrcLine+='<li class="wenkmLrc'+ timer +' current"><table><tr><td>'+ lrcCont[i+1] +'</table></td></tr></li>'
				}else{
					lrcLine+='<li class="wenkmLrc'+ timer +'"><table><tr><td>'+ lrcCont[i+1] +'</table></td></tr></li>'
				}
			}
			$('#wenkmLrc').html('<ul>'+ lrcLine +'</ul>');
			setTimeout(function(){
				$('#wenkmLrc').addClass('show');
			},500);
			//lrcTime=setInterval(wenkmLrc.lrc.play,500)
		},
		play:function(){
			var timeNow=Math.round(audio.currentTime);
			if($.inArray(timeNow, lrcTimeLine)>0){
				var $lineNow=$('.wenkmLrc'+timeNow);
				if(!$lineNow.hasClass('current')){
					$lineNow.addClass('current').siblings().removeClass('current');
					$('#wenkmLrc').animate({scrollTop:lrcHeight*$lineNow.index()});
				}
			}
		},
		hide:function(){
			//clearInterval(lrcTime);
			$('#wenkmLrc').removeClass('show');
			$(".fa-word").removeClass("current");
			wenkmTips.show("歌词显示已关闭");
		}
	},
	ksc:{
		format:function(cont){
			hasKsc=true;
			var kscStartTimeLine=[],
				kscEndTimeLine=[],
				kscCont=[],
				kscTimePer=[],
				kscMain='',
				lineNow=0,
				sex='b';
			cont.replace(/\'(\d*):(\d*).(\d*)\',\s\'(\d*):(\d*).(\d*)\',\s\'(.*)\',\s\'(.*)\'/g,function(){
				var startMin=arguments[1] | 0,
					startSec=arguments[2] | 0,
					startKsec=arguments[3] | 0,
					endMin=arguments[4] | 0,
					endSec=arguments[5] | 0,
					endKsec=arguments[6] | 0;
				kscStartTimeLine.push(startMin*600+startSec*10+Math.round(startKsec/100));
				kscEndTimeLine.push(endMin*600+endSec*10+Math.round(endKsec/100));
				kscCont.push(arguments[7]);
				kscTimePer.push(arguments[8]);
			});
			for(var i=0; i<kscStartTimeLine.length; i++){
				var kscText='',
					kscTextPerTime=kscTimePer[i].split(',');
				if(kscCont[i].indexOf('(男:)')>=0){
					sex='b';
					kscCont[i]=kscCont[i].replace('(男:)','');
				};
				if(kscCont[i].indexOf('(女:)')>=0){
					sex='g';
					kscCont[i]=kscCont[i].replace('(女:)','');
				};
				if(kscCont[i].indexOf('(合:)')>=0){
					sex='t';
					kscCont[i]=kscCont[i].replace('(合:)','');
				};
				for(var j=0; j<kscCont[i].length; j++){
					if(kscCont[i][j]=='，'){
						kscText+='<span class="blank"><em dir="'+ kscTextPerTime[j] +'"></em></span>'
					}else{
						kscText+='<span><em dir="'+ kscTextPerTime[j] +'">'+ kscCont[i][j] +'</em></span>'
					}
				}
				kscMain+='<div id="wenkmKsc'+ kscEndTimeLine[i] +'" class="wenkmKsc'+ kscStartTimeLine[i] +' line line'+ (i%2==0 ? 1 : 2) +' '+ sex +'"><div class="bg">'+ kscText +'</div><div class="lighter">'+ kscText +'</div></div>'
			}
			$('#wenkmKsc').html(kscMain);
			setTimeout(function(){
				$('#wenkmKsc').addClass('show');
			},500);
			//kscTime=setInterval(wenkmLrc.ksc.play,80);
		},
		play:function(){
			var timeNow=Math.round(audio.currentTime*10);
			//提前1s显示某行歌词
			if($('.wenkmKsc'+(timeNow+10)).length && !$('.wenkmKsc'+(timeNow+10)).hasClass('current')){
				var $kscId=$('.wenkmKsc'+(timeNow+10));
				$kscId.addClass('current');
				//间隔时间短的话，还未到隐藏时间，防止歌词交叉重叠
				$kscId.hasClass('line1') ? $kscId.siblings('.line1').removeClass('current') : $kscId.siblings('.line2').removeClass('current');
				//1s后执行每个字幕
				setTimeout(function(){
					if($kscId.hasClass('line1')){
						wenkmLrc.ksc.showLetters.line1($kscId);
						kscLineNow1=true;
					}else{
						wenkmLrc.ksc.showLetters.line2($kscId);
						kscLineNow2=true;
					}
				}, 1000);
			};
			//3s后自动隐藏某行歌词
			if($('#wenkmKsc'+(timeNow-30)).length){
				$('#wenkmKsc'+(timeNow-30)).removeClass('current')
			}
		},
		//显示每个字幕
		showLetters:{
			//第一行（分开的目的是为了避免多行同时显示出错）
			line1:function(id){
				var $span=$('.lighter span',id),
					$spanNow=$span.eq(tempNum1++),
					$em=$('em',$spanNow),
					spanT=+$em.attr('dir');
				$em.animate({width:'100%'}, spanT);
				if(tempNum1<$span.length){
					letterTime1=setTimeout(function(){
						wenkmLrc.ksc.showLetters.line1(id)
					}, spanT);
				}else{
					tempNum1=0;
					kscLineNow1=false;
				}
			},
			//第二行
			line2:function(id){
				var $span=$('.lighter span',id),
					$spanNow=$span.eq(tempNum2++),
					$em=$('em',$spanNow),
					spanT=+$em.attr('dir');
				$em.animate({width:'100%'}, spanT);
				if(tempNum2<$span.length){
					letterTime2=setTimeout(function(){
						wenkmLrc.ksc.showLetters.line2(id)
					}, spanT);
				}else{
					tempNum2=0;
					kscLineNow2=false;
				}
			}
		},
		hide:function(){
			//clearInterval(kscTime);
			$('#wenkmKsc').removeClass('show');
		}
	}
}}
$(document).ready(function(){
	$(window).keydown(function(event){ 
		var key = event.keyCode;
		if(key==192){
			if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
		}else if(key==37){
			wenkmMedia.prev();
		}else if(key==39){
			wenkmMedia.next();
		}
	});

	$(".fa-word").click(function(){
		if($(this).attr("class").indexOf("current")!=-1){
			if(hasLrc){
				wenkmLrc.lrc.hide();
				isCloseLrc=true;
			}
		}else{
			isCloseLrc=false;
			isHideLrc=false;
			wenkmLrc.load();
			wenkmLrc.lrc.play();
			$(this).addClass("current");
			wenkmTips.show("歌词显示已开启");
		}
		
	});	
});
//滚动条在Y轴上的滚动距离
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
//文档的总高度
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}
window.onscroll = function(){
　　if(getScrollTop() + getWindowHeight() == getScrollHeight()){
　　　　if(hasLrc){
			wenkmLrc.lrc.hide();
			isHideLrc=true;
		}
　　}else{
		if(isHideLrc){
			isHideLrc=false;
			wenkmLrc.load();
			wenkmLrc.lrc.play();
			$(".fa-word").addClass("current");
			wenkmTips.show("歌词显示已开启");
		}
	}
};