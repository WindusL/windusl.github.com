var ajaxhome = 'http://192.168.1.88/emlog/';
var ajaxcontent = 'contentleft';
var ajaxsearch_class = 'form-inline';
var ajaxignore_string = new String('#login,#share,#comment-,javascript:,.jpg,.png,.jpge,go.php,admin,.gif,.bmp,other,.zip,.rar,.code-render.php,#biao,#sidr');
var ajaxignore = ajaxignore_string.split(',');
var ajaxloading_code = '';
var ajaxloading_error_code = 'error';
var ajaxreloadDocumentReady = false;
var ajaxtrack_analytics = false;
var ajaxscroll_top = true;
var ajaxisLoad = false;
var ajaxstarted = false;
var ajaxsearchPath = 'http://192.168.1.88/emlog/index.php';
$(document).ready(function() {
	ajaxloadPageInit("")
});

function submitSearch(param) {
	if (!ajaxisLoad) {
		ajaxloadPage(ajaxsearchPath + "?" + param, 0, param)
	}
}
function ajaxcheck_ignore(url) {
	for (var i in ajaxignore) {
		if (url.indexOf(ajaxignore[i]) >= 0) {
			return false
		}
	}
	return true
}
function loadScript(url) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script)
}
function ajaxreload_code() {
	loadScript("http://192.168.1.88/emlog/content/templates/bowenxL/wolf/js/bowen.js");
	loadScript("http://192.168.1.88/emlog/content/templates/bowenxL/wolf/js/pinglunajax.js");
	$('pre').addClass('prettyprint linenums').attr('style', 'overflow:auto');
	window.prettyPrint && prettyPrint()
}
function ajaxclick_code(thiss) {
	$('nav ul').each(function() {
		$(this).removeClass('item')
	});
	$(thiss).parents('li').addClass('active')
}
function ajaxloadPage(url, push, getData) {
	if (!ajaxisLoad) {
		ajaxisLoad = true;
		ajaxstarted = true;
		nohttp = url.replace("http://", "").replace("https://", "");
		firstsla = nohttp.indexOf("/");
		pathpos = url.indexOf(nohttp);
		path = url.substring(pathpos + firstsla);
		if (push != 1) {
			if (typeof window.history.pushState == "function") {
				var stateObj = {
					foo: 1000 + Math.random() * 1001
				};
				history.pushState(stateObj, "ajax page loaded...", path)
			} else {}
		} if (!$('#' + ajaxcontent)) {}
		$("body").append('<div class="loading"><div class="loading2"><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>');
		$('#' + ajaxcontent).fadeTo("slow", 1, function() {
			$('#' + ajaxcontent).fadeIn("slow", 0.5, function() {
				$.ajax({
					type: "GET",
					url: url,
					data: getData,
					dataType: "html",
					success: function(data) {
						ajaxisLoad = false;
						datax = data.split('<title>');
						titlesx = data.split('</title>');
						if (datax.length == 2 || titlesx.length == 2) {
							data = data.split('<title>')[1];
							titles = data.split('</title>')[0];
							$(document).attr('title', ($("<div/>").html(titles).text()))
						} else {} if (ajaxtrack_analytics == true) {
							if (typeof _0 != "undefined") {
								if (typeof getData == "undefined") {
									getData = ""
								} else {
									getData = '?' + getData
								}
								_0.push(['_1', path + getData])
							}
						}
						data = data.split('id="' + ajaxcontent + '"')[1];
						data = data.substring(data.indexOf('>') + 1);
						var depth = 1;
						var output = '';
						while (depth > 0) {
							temp = data.split('</div>')[0];
							i = 0;
							pos = temp.indexOf("<div");
							while (pos != -1) {
								i++;
								pos = temp.indexOf("<div", pos + 1)
							}
							depth = depth + i - 1;
							output = output + data.split('</div>')[0] + '</div>';
							data = data.substring(data.indexOf('</div>') + 6)
						}
						document.getElementById(ajaxcontent).innerHTML = output;
						$('#' + ajaxcontent).css("position", "absolute");
						$('#' + ajaxcontent).css("left", "20000px");
						$(".loading").remove();
						if (ajaxscroll_top == true) {
							$('html,body').animate({
								scrollTop: 0
							}, 400)
						}
						$('#' + ajaxcontent).show();
						ajaxloadPageInit("#" + ajaxcontent + " ");
						if (ajaxreloadDocumentReady == true) {
							$(document).trigger("ready")
						}
						try {
							ajaxreload_code()
						} catch (err) {}
						$('#' + ajaxcontent).hide();
						$('#' + ajaxcontent).css("position", "");
						$('#' + ajaxcontent).css("left", "");
						$(".loading").remove();
						$('#' + ajaxcontent).fadeTo("slow", 1, function() {})
					},
					error: function(jqXHR, textStatus, errorThrown) {
						ajaxisLoad = false;
						$(".loading").remove();
						ajaxloadPage("http://192.168.1.88/emlog/404.html")
					}
				})
			})
		})
	}
}
window.onpopstate = function(event) {
	if (ajaxstarted === true && ajaxcheck_ignore(document.location.toString()) == true) {
		ajaxloadPage(document.location.toString(), 1)
	}
};

function ajaxloadPageInit(scope) {
	$(scope + "a").click(function(event) {
		if (this.href.indexOf(ajaxhome) >= 0 && ajaxcheck_ignore(this.href) == true) {
			event.preventDefault();
			this.blur();
			var caption = this.title || this.name || "";
			var group = this.rel || false;
			try {
				ajaxclick_code(this)
			} catch (err) {}
			ajaxloadPage(this.href)
		}
	});
	$('.' + ajaxsearch_class).each(function(index) {
		if ($(this).attr("action")) {
			ajaxsearchPath = $(this).attr("action");
			$(this).submit(function() {
				submitSearch($(this).serialize());
				return false
			})
		}
	});
	if ($('.' + ajaxsearch_class).attr("action")) {} else {}
}