

var _mouseLeaveEvent= "mouseleave";
var _mouseEnterEvent = "mouseenter";
var _mouseClickEvent = "click";

$(document).ready(function(e){
	if(window.location.href.indexOf("?sec") >= 1){
		var value = getParameterByName("sec");
		var baseUrl = window.location.href.split('?sec')[0];
		window.location.href = baseUrl + "#!" + value;
	}
	navigationHandler();
});
function navigationHandler(){
	// properties
	$(".mob_social").hide();
	
	// mobile nav bar handler
	var isMobileNavOpen = false;
	var mobileNavBtn = $('.side_nav_btn > a');
	var mobileNavWrapper = $(".mob_navigation_wrapper");
	var mobileNavBtnImgs = mobileNavBtn.children("img");
	mobileNavBtn.bind('click', function(){
		isMobileNavOpen = !isMobileNavOpen;
		mobileNavWrapper.stop(true, false);
		mobileNavBtnImgs.css({"display":"none"});
		if(isMobileNavOpen){
			mobileNavWrapper.fadeIn();
			mobileNavBtnImgs.eq(1).css({"display":"block"});
		}else{
			mobileNavWrapper.fadeOut();
			mobileNavBtnImgs.eq(0).css({"display":"block"});
		}
		return false;
	});
	
	var mobileNavMainLinks = $(".mob_navigation_main_links > ul > li");
	var mobileNavSubLinks = $(".mob_navigation_sub_links > ul");
	var mobileNavSubLinksList = $(".mob_navigation_sub_links > ul > li");
	mobileNavMainLinks.each(function(index, element) {
        var liTag = $(this);
		var aTag = liTag.children("a");
		aTag.bind("click", function(){
			mobileNavMainLinks.children("a").removeClass("active");
			aTag.addClass("active");
			mobileNavSubLinks.css({"display":"none"});
			mobileNavSubLinks.eq(index).css({"display":"block"});
			return false;
		});
    });
	mobileNavMainLinks.eq(0).children("a").trigger("click");
	mobileNavSubLinksList.each(function(index, element) {
        var liTag = $(this);
		var aTag = liTag.children("a");
		aTag.bind("click", function(){
			mobileNavBtn.trigger("click");
		});
    });
	
	// default
	mainMenusManagerHandler(".main_nav > ul", ".mainNavHover");
};
function mainMenusManagerHandler(id, hoverBlockID){
	var uTag = $(id);
	var aTags = uTag.children("li").children("a");
	var hoverFollowBlock = $(hoverBlockID);
	var hoverFollowTextBlock = hoverFollowBlock.children("div");
	aTags.each(function(index){
		var btn = $(this);
		var li = btn.parent();
		var subMenus = li.children("ul");
		var href = btn.attr("href");
		
		subMenus.slideUp(0);
		li.bind(_mouseLeaveEvent, mouseLeaveHandler);
		btn.bind(_mouseClickEvent, clickHandler);
		btn.bind(_mouseEnterEvent, mouseEnterHandler);
		function clickHandler(){
			if(href == "" || href == "#"){
				mouseLeaveHandler();
				return false;
			}
		}
		function mouseEnterHandler(){
			//mouseLeaveHandler();
			subMenus.stop(true, true);
			subMenus.slideDown(200);
			btn.addClass("main_menus_highlight");
			
			if(li.hasClass("home_icon") == false){
				var top = li.position().top;
				var left = li.position().left;
				var width = btn.width()
				var height = btn.height()
				hoverFollowBlock.css({"opacity":1, "left":left});
				hoverFollowTextBlock.css({"width":width, height:14});
			}
		}
		function mouseLeaveHandler(){
			subMenus.stop(true, true);
			subMenus.slideUp(200);
			btn.removeClass("main_menus_highlight");
			hoverFollowBlock.css({"opacity":0});
		}
		if(subMenus.length){
			mainMenusManagerHandler(subMenus[0]);
		}
		
	});
}
