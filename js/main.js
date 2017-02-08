// scroll page
$(function(){
    var menu = $('.header-menu-item');
    var hmenu = $('.header').height();
    var item = menu.find('a');
    var budget = $('.btn-budget');
    item.click(function(){
        var goto = $(this).attr("href");
        var gooo = $(goto).position().top - hmenu;
        $('html, body').animate({scrollTop: gooo}, 1000);
        return false;
    });
    budget.click(function(){
        var goto = $(this).attr("href");
        var gooo = $(goto).position().top - hmenu;
        $('html, body').animate({scrollTop: gooo}, 1000);
        return false;
    });
    var nav = item.map(function(){
        var este = $($(this).attr('href'));
        if (este.length) {
            return este;
        }
    });
    $(window).scroll(function(){
        var topo = $(this).scrollTop() + (hmenu + 150);
        var atual = nav.map(function(){
            var pos = $(this).position().top;
            if (pos < topo) {
                return this;
            }
        });
        var atual = atual[atual.length - 1];
        var div = atual && atual.length ? atual[0].id : "";
        $(".header-menu-item a").removeClass('active');
        $(".header-menu-item a[href='#" + div + "']").addClass('active');
    });
});

/*
 * Smoothbox
 * http://kthornbloom.com/smoothbox.php
 *
 * Copyright 2013, Kevin Thornbloom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
$(document).ready(function(){

    $('.sb').click(function(event) {
        // which was clicked?
        var clicked = $(this).index('.sb');

        // create smoothbox
        $('body').append('<div class="smoothbox sb-load"><div class="smoothbox-table"><div class="smoothbox-centering"><div class="smoothbox-sizing"><div class="sb-nav"><a href="#" class="sb-prev sb-prev-on" alt="Previous">«</a><a href="#" class="sb-cancel" alt="Close">&times;</a><a href="#" class="sb-next sb-next-on" alt="Next">»</a></div><ul class="sb-items"></ul></div></div></div></div>');

        $.fn.reverse = [].reverse;
        // get each picture, put them in the box
        $('.sb').reverse().each(function(){
            var href = $(this).attr('href');
            if ($(this).attr('title')) {
                var caption = $(this).attr('title');
                $('.sb-items').append('<div class="sb-item"><div class="sb-caption">' + caption + '</div><img src="' + href + '"/></div>');
            } else {
                $('.sb-items').append('<div class="sb-item"><img src="' + href + '"/></div>');

            }
        });

        $('.sb-item').slice(0, -(clicked)).appendTo('.sb-items');
        $('.sb-item').not(':last').hide();
        $('.sb-item img:last').load(function(){
            $('.smoothbox-sizing').fadeIn('slow', function(){
                $('.sb-nav').fadeIn();
                $('.sb-load').removeClass('sb-load');
            });
        });
        event.preventDefault();
    });

    $(document).on('click', ".sb-cancel", function(event) {
        $('.smoothbox').fadeOut('slow', function(){
            $('.smoothbox').remove();
        });
        event.preventDefault();
    });

    $(document).on('click', ".sb-next-on", function(event) {
        $(this).removeClass('sb-next-on');

        $('.sb-item:last').addClass('sb-item-ani');
        // after animation, move order & remove class

        $(".sb-item:last").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            $('.sb-item').eq(-2).addClass('no-trans').fadeIn('fast');
            $(this).removeClass('sb-item-ani').prependTo('.sb-items').hide();
            $('.sb-item:last').removeClass('no-trans');
            $('.sb-next').addClass('sb-next-on');
            $('.sb-item').unbind();
        });

        event.preventDefault();
    });

    $(document).on('click', ".sb-prev-on", function(event) {
        $(this).removeClass('sb-prev-on');
        $('.sb-item:last').hide();
        $(".sb-item:first").addClass('sb-item-ani2 no-trans').appendTo('.sb-items');
        $('.sb-item:last').show().removeClass('no-trans').delay(1).queue(function(next) {
        $('.sb-item:last').removeClass('sb-item-ani2');
            next();
        });
        $(this).addClass('sb-prev-on');
        event.preventDefault();
    });
});

// form ajax send 
$(function(){
    $('.form-send-contact').submit(function(){
        $.ajax({
            url: 'send-mail.php',
            type: 'POST',
            data: $('.form-send-contact').serialize(),
            success: function(dados) {
                $('.alert-ajax').html(dados);
            },
            beforeSend: function(){
                $('.alert-ajax').slideUp('fast');
                $('.btn-form').html('enviando...');
                $('.btn-form').attr('disabled', 'disabled');
                $('.loading-ajax').fadeIn('fast');
            },
            complete: function(){
                $('.alert-ajax').slideDown('fast');
                $('.btn-form').html('Enviar');
                $('.btn-form').removeAttr('disabled');
                $('.loading-ajax').fadeOut('fast');
            }
        });
        return false;
    });
});

// WheelOff
$(function(){
    $('.google-map').click(function(){
        $('.google-map iframe').css('pointer-events', 'auto');
    });
    $('.google-map').mouseleave(function(){
        $('.google-map iframe').css('pointer-events', 'none');
    });
});

// Show more testemonies
$(function(){
	$('.testimonies-show-more').click(function(){
		$('.testimony-invisible').slideDown();
		$('.testimonies-show-more').hide();	
		$('.testimonies-show-less').show();	
        return false;
    });
    
    $('.testimonies-show-less').click(function(){
        $('.testimony-invisible').slideUp();
        $('.testimonies-show-more').show(); 
        $('.testimonies-show-less').hide(); 
        return false;
    });
});

// Back-to-top
$(function(){
    $('.cd-top').click(function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, 700);
    });
});




