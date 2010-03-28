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
(function($) {
  $.fn.presentation = function(options) {
    var config = {
			slide: '.slide',
			pagerClass: 'nav-pager',
			prevNextClass: 'nav-prev-next',
			prevText: 'Previous',
			nextText: 'Next',
			transition: "fade"
		};
    $(this).each(function() {
      
      
      var $presentation = $(this);
      $presentation.count = 1;

      //Control the changing of the slide
      $presentation.changeSlide = function(newSlide) {
      
      	$presentation.visibleSlide = $presentation.slides.filter(':visible');
        $presentation.slideToShow = $presentation.slides.filter(':nth-child('+newSlide+')')
      
      	switch ($presentation.options.transition) {
        	case 'show/hide':
						$presentation.visibleSlide.hide();
						$presentation.slideToShow.show();
						break;
					case 'slide':
						$presentation.visibleSlide.slideUp(500, function () {
						    $presentation.slideToShow.slideDown(1000)
						});
						break;
					default:
						$presentation.visibleSlide.fadeOut(500);
						$presentation.slideToShow.fadeIn(500)
				}
				        
        $presentation.find('.'+$presentation.options.pagerClass).children('.current').removeClass('current');
        $presentation.find('.'+$presentation.options.pagerClass).children(':nth-child('+newSlide+')').addClass('current');
      };
      
      //Handle clicking of a specific slide
      $presentation.pageClick = function($pager) {
        if(!$pager.parent().hasClass('current')) {
          $presentation.changeSlide($pager.parent().prevAll().length + 1);
          $presentation.count = $pager.parent().prevAll().length + 1;
        }
      };
      
      //Handle the previous and next functionality
      $presentation.prevNextClick = function(action) {
        if(action === 'prev') {
          $presentation.count === 1 ? $presentation.count = $presentation.slides.length : $presentation.count--;            
        } else {
          $presentation.count === $presentation.slides.length ? $presentation.count = 1 : $presentation.count++;
        }
        
        $presentation.changeSlide($presentation.count);
        window.location.hash = '#'+$presentation.count;
      };
      
      $presentation.addControls = function() {
        $presentation.numSlides = $presentation.slides.length;
        
        //Add in the pager
        var navPager = '<ol class="'+$presentation.options.pagerClass+'">';
        for(var i = 1; i < $presentation.numSlides+1; i++) {
          navPager += '<li><a href="#'+i+'">'+i+'</a></li>';
        }
        $presentation.append(navPager);
        
        if($presentation.currentHash) {
          $presentation.find('.'+$presentation.options.pagerClass).children(':nth-child('+$presentation.currentHash+')').addClass('current');
          $presentation.count = $presentation.currentHash;
        } else {
          $presentation.find('.'+$presentation.options.pagerClass).children(':first-child').addClass('current');
          $presentation.count = 1;
        }

        //Add in the previous/next links
        $presentation.append('<ul class="'+$presentation.options.prevNextClass+'"><li><a href="#prev" class="prev">'+$presentation.options.prevText+'</a></li><li><a href="#next" class="next">'+$presentation.options.nextText+'</a></li>');
        
        //When a specific page is clicked, go to that page
        $presentation.find('.'+$presentation.options.pagerClass).find('a').bind('click', function() {
          $presentation.pageClick($(this));
        });
        
        //When you click a previous/next link
        $presentation.find('.'+$presentation.options.prevNextClass).find('a').click(function() {
          $presentation.prevNextClick($(this).attr('class'));
          return false;
        });
        
        //When you hit the left arrow, go to previous slide
        //When you hit the right arrow, go to next slide
        $(document).keyup(function(e) {
          var action = '';
          if(e.keyCode === 37) {
            action = 'prev';
          } else if(e.keyCode === 39) {
            action = 'next';
          }
          
          if(action !== '') {
            $presentation.prevNextClick(action);
          }
        });
      };
      
      //Start this thing
      $presentation.init = function() {
        $presentation.options = $.extend(config, options);
        $presentation.slides = $presentation.find($presentation.options.slide);
        $presentation.currentHash = window.location.hash.substr(1);
        
        //Hide everything except the hash or the first
        if($presentation.currentHash) {
          $presentation.slides.filter(':not(:nth-child('+$presentation.currentHash+'))').hide();
        } else {
          $presentation.slides.filter(':not(:first)').hide();
        }

        $presentation.addControls();
      };
      $presentation.init();
    
      
    });
  };
})(jQuery);