/*
 * Presentation Plugin
 * http://www.viget.com/
 *
 * Copyright (c) 2010 Trevor Davis
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.2
 *
 * Example usage:
 * $('#slides').presentation({
 *   slide: '.slide',
 *   pagerClass: 'nav-pager',
 *   prevNextClass: 'nav-prev-next',
 *   prevText: 'Previous',
 *   nextText: 'Next',
 *   transition: 'fade'
 * });
 */
(function(c){c.fn.presentation=function(g){var h={slide:".slide",pagerClass:"nav-pager",prevNextClass:"nav-prev-next",prevText:"Previous",nextText:"Next",transition:"fade"};c(this).each(function(){var a=c(this);a.count=1;a.changeSlide=function(b){a.visibleSlide=a.slides.filter(":visible");a.slideToShow=a.slides.filter(":nth-child("+b+")");switch(a.options.transition){case "show/hide":a.visibleSlide.hide();a.slideToShow.show();break;case "slide":a.visibleSlide.slideUp(500,function(){a.slideToShow.slideDown(1E3)});
break;default:a.visibleSlide.fadeOut(500);a.slideToShow.fadeIn(500)}a.find("."+a.options.pagerClass).children(".current").removeClass("current");a.find("."+a.options.pagerClass).children(":nth-child("+b+")").addClass("current")};a.pageClick=function(b){if(!b.parent().hasClass("current")){a.changeSlide(b.parent().prevAll().length+1);a.count=b.parent().prevAll().length+1}};a.prevNextClick=function(b){if(b==="prev")a.count===1?(a.count=a.slides.length):a.count--;else a.count===a.slides.length?(a.count=
1):a.count++;a.changeSlide(a.count);window.location.hash="#"+a.count};a.addControls=function(){a.numSlides=a.slides.length;for(var b='<ol class="'+a.options.pagerClass+'">',d=1;d<a.numSlides+1;d++)b+='<li><a href="#'+d+'">'+d+"</a></li>";a.append(b);if(a.currentHash){a.find("."+a.options.pagerClass).children(":nth-child("+a.currentHash+")").addClass("current");a.count=a.currentHash}else{a.find("."+a.options.pagerClass).children(":first-child").addClass("current");a.count=1}a.append('<ul class="'+
a.options.prevNextClass+'"><li><a href="#prev" class="prev">'+a.options.prevText+'</a></li><li><a href="#next" class="next">'+a.options.nextText+"</a></li>");a.find("."+a.options.pagerClass).find("a").bind("click",function(){a.pageClick(c(this))});a.find("."+a.options.prevNextClass).find("a").click(function(){a.prevNextClick(c(this).attr("class"));return false});c(document).bind("keyup",function(f){var e="";if(f.keyCode===37)e="prev";else if(f.keyCode===39)e="next";e!==""&&a.prevNextClick(e)})};a.init=
function(){a.options=c.extend(h,g);a.slides=a.find(a.options.slide);a.currentHash=window.location.hash.substr(1);a.currentHash?a.slides.filter(":not(:nth-child("+a.currentHash+"))").hide():a.slides.filter(":not(:first)").hide();a.addControls()};a.init()})}})(jQuery);