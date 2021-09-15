$(document).ready(function () {
  // Simple scroll handling without throt
  var navHeight = 80 + 1
  var scrollTrigger = $(window).height() - navHeight
  var header = $('.header')

  function handleHeaderClass() {
    if ($(window).scrollTop() > navHeight) {
      header.addClass('scrolled')
    } else {
      header.removeClass('scrolled')
    }

    if ($(window).scrollTop() > scrollTrigger) {
      header.addClass('fixed')
    } else {
      header.removeClass('fixed')
    }
  }

  handleHeaderClass()

  $(window).bind('scroll', handleHeaderClass)
  // end of simple scroll bind - see other examples below

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash)

        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault()
          $('html, body').animate(
            {
              scrollTop: target.offset().top - 80,
            },
            200,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target)
              $target.focus()
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false
              } else {
                $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
                $target.focus() // Set focus again
              }
            }
          )
        }
      }
    })

  // Initialize variable on zero, will be used to reference the scrolled position from top
  var scrolledPosition = 0

  // Boolean, Scrolling Flag initialized as False
  var scrolling = false

  // Get a reference to our predefined back to top button
  var goTopBtn = document.querySelector('.back-top')

  // Determines window scroll position and shows button only if needed
  function handleScrollButton() {
    // Current Scroll Position detection - could also use: document.documentElement.scrollTop
    scrolledPosition = window.pageYOffset
    console.log('trackscroll', scrolledPosition)

    // If we subtract scrollHeight by clientHeight, we get the total amount of pixels that we can scroll
    var scrollableHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    if (scrolledPosition / scrollableHeight > 0.2) {
      // 1. By dividing the amount scrolled by the total amount of pixels we can scroll, we get a ratio between 0 and 1
      // 2. Then we compare to 0.2, so the button only shows if the user has scrolled 20% of the page,
      // the 0.2 (20%) represents how much the user needs to scroll before the button shows

      if (!goTopBtn.classList.contains('show')) {
        // If the button does NOT contain class 'show', add it (note the exclamation mark)
        goTopBtn.classList.add('show')
      }
    } else {
      // Removes the "show" CSS Class on ELSE (scroll position less than 20%)

      if (goTopBtn.classList.contains('show')) {
        // Checks if CSS class is added, if it then removes it
        goTopBtn.classList.remove('show')
      }
    }
  }

  // scrollToTop: Moves window scroll position back to the top (executed on click event)
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // This code executes ONLY once every N milliseconds
  setInterval(function () {
    // Check if Scrolling flag is set to true, so it only executes IF true, do nothing otherwise
    if (scrolling) {
      // Change the scrolling flag to false again
      scrolling = false
      handleScrollButton()
    }
  }, 1000) // This is called event throttling. More on this later.

  // Scroll event listener on document
  document.addEventListener('scroll', function () {
    // Sets Scrolling Flag to true when user is scrolling
    scrolling = true
  })

  // Click event listener on button, executes callback function "scrollToTop"
  goTopBtn.addEventListener('click', scrollToTop)
})
