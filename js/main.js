$(document).ready(function () {
  var navHeight = 80 + 1
  var scrollTrigger = $(window).height() - navHeight

  $(window).bind('scroll', function () {


    if ($(window).scrollTop() > (navHeight)) {
      $('.header').addClass('scrolled')
    } else {
      $('.header').removeClass('scrolled')
    }


    if ($(window).scrollTop() > scrollTrigger) {
      $('.header').addClass('fixed')
    } else {
      $('.header').removeClass('fixed')
    }
  })
})
