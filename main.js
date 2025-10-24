/**
* Template Name: Personal Portfolio - Main JS
* Author: Lakshya Khetan
* License: MIT
*/

!(function($) {
  "use strict";

  // Smooth scrolling and section navigation
  $(document).ready(function() {
    // Navigation Menu
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var hash = this.hash;
        var target = $(hash);
        if (target.length) {
          e.preventDefault();

          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }

          if (hash == '#header') {
            $('#header').removeClass('header-top');
            $("section").removeClass('section-show');
            return;
          }

          if (!$('#header').hasClass('header-top')) {
            $('#header').addClass('header-top');
            setTimeout(function() {
              $("section").removeClass('section-show');
              $(hash).addClass('section-show');
            }, 350);
          } else {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }

          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('ri-menu-line ri-close-line');
            $('.mobile-nav-overly').fadeOut();
          }

          return false;
        }
      }
    });

    // Activate/show sections on load with hash links
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        $('#header').addClass('header-top');
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
        setTimeout(function() {
          $("section").removeClass('section-show');
          $(initial_nav).addClass('section-show');
        }, 350);
      }
    }

    // Mobile Navigation
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="ri-menu-line"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');

      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('ri-menu-line ri-close-line');
        $('.mobile-nav-overly').toggle();
      });

      $(document).click(function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('ri-menu-line ri-close-line');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Typing Animation
    if ($('.typing').length) {
      var typed = new Typed('.typing', {
        strings: [
          "Machine Learning Engineer", 
          "Data Scientist",
          "Mobile App Developer",
          "AI Enthusiast",
          "Software Developer"
        ],
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }

    // Portfolio filtering
    if ($('.portfolio-container').length) {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
    }

    // Smooth scroll for anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 90
          }, 1000, "easeInOutExpo");
        }
      }
    });

    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });

  // Project Modal Functions
  window.openProjectModal = function(projectId) {
    $('#' + projectId + '-modal').css('display', 'block');
    $('body').css('overflow', 'hidden');
  };

  window.closeProjectModal = function(projectId) {
    $('#' + projectId + '-modal').css('display', 'none');
    $('body').css('overflow', 'auto');
  };

  // Close modal when clicking outside
  $(window).click(function(event) {
    if ($(event.target).hasClass('modal')) {
      $('.modal').css('display', 'none');
      $('body').css('overflow', 'auto');
    }
  });

  // Close modal with Escape key
  $(document).keydown(function(event) {
    if (event.keyCode == 27) {
      $('.modal').css('display', 'none');
      $('body').css('overflow', 'auto');
    }
  });

  // Resume download function
  window.downloadResume = function() {
    // Create a temporary link to download the resume
    var link = document.createElement('a');
    link.href = 'resume.pdf'; // Make sure you have this file
    link.download = 'Lakshya_Khetan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Contact form submission
  $('.php-email-form').on('submit', function(e) {
    e.preventDefault();
    
    var form = $(this);
    var formData = {
      name: form.find('input[name="name"]').val(),
      email: form.find('input[name="email"]').val(),
      subject: form.find('input[name="subject"]').val(),
      message: form.find('textarea[name="message"]').val()
    };
    
    // Show loading
    form.find('.loading').show();
    form.find('.error-message').hide();
    form.find('.sent-message').hide();
    
    // Submit form to server
    $.ajax({
      url: '/api/contact',
      method: 'POST',
      data: formData,
      success: function(response) {
        form.find('.loading').hide();
        form.find('.sent-message').show();
        form[0].reset();
        
        // Hide success message after 5 seconds
        setTimeout(function() {
          form.find('.sent-message').hide();
        }, 5000);
      },
      error: function(xhr, status, error) {
        form.find('.loading').hide();
        var errorMessage = 'Sorry, there was an error sending your message. Please try again.';
        
        // Try to get specific error message from server
        if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMessage = xhr.responseJSON.message;
        }
        
        form.find('.error-message').text(errorMessage).show();
        
        // Hide error message after 5 seconds
        setTimeout(function() {
          form.find('.error-message').hide();
        }, 5000);
      }
    });
  });

  // Add scroll effect to header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  // Counter animation
  $('.count-box').each(function() {
    var $this = $(this);
    var countTo = $this.find('span').text();
    
    $({ countNum: 0 }).animate({
      countNum: countTo
    }, {
      duration: 2000,
      easing: 'linear',
      step: function() {
        $this.find('span').text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.find('span').text(this.countNum);
      }
    });
  });

  // Add smooth animations
  $('.portfolio-item').hover(function() {
    $(this).find('.portfolio-wrap').addClass('hover-effect');
  }, function() {
    $(this).find('.portfolio-wrap').removeClass('hover-effect');
  });

  // Navbar active state on scroll
  var navbarlinks = $('.nav-menu a');
  var navbarlinksActive = function() {
    var position = $(window).scrollTop() + 200;
    navbarlinks.each(function() {
      var $this = $(this);
      var hash = $this.attr('href');
      if ($(hash).length) {
        if (position >= $(hash).offset().top && position <= ($(hash).offset().top + $(hash).outerHeight())) {
          navbarlinks.parent().removeClass('active');
          $this.parent().addClass('active');
        }
      }
    });
  };
  $(window).on('scroll', navbarlinksActive);

})(jQuery);

// Vanilla JavaScript for additional functionality
document.addEventListener('DOMContentLoaded', function() {
  // Loading Screen Animation
  let progress = 0;
  const progressBar = document.querySelector('.progress-fill');
  const progressPercent = document.querySelector('.progress-percent');
  const loadingScreen = document.getElementById('loading-screen');
  
  // Animate progress bar
  const progressInterval = setInterval(() => {
    progress += Math.random() * 8 + 3; // Random increment between 3-11 (slower)
    if (progress > 100) progress = 100;
    
    if (progressBar && progressPercent) {
      progressBar.style.width = progress + '%';
      progressPercent.textContent = Math.floor(progress) + '%';
    }
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      
      // Wait longer then fade out loading screen
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.classList.add('fade-out');
          
          // Remove loading screen after fade out animation
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }
      }, 1000); // Increased from 500ms to 1000ms
    }
  }, 150); // Increased from 100ms to 150ms

  // Add loading animation
  const body = document.body;
  body.classList.add('loaded');
  
  // Preload images
  const images = ['images/my photo.jpg', 'images/travel-planner.jpg', 'images/aiml.jpg'];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // Add intersection observer for animations
  const animatedElements = document.querySelectorAll('.portfolio-item, .icon-box, .resume-item');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});