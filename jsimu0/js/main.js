/**
 * Portfolio Website - Main JavaScript
 * Vanilla JS - No dependencies
 */

(function() {
  'use strict';

  // ==========================================================================
  // Mobile Navigation Toggle
  // ==========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // Active Navigation Highlighting
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // ==========================================================================
  // Scroll Animations
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const animationObserverOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation
        // animationObserver.unobserve(entry.target);
      }
    });
  }, animationObserverOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });

  // ==========================================================================
  // Smooth Scroll for Safari (fallback)
  // ==========================================================================
  // Modern browsers support CSS scroll-behavior: smooth
  // This is a fallback for older browsers
  if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Navigation Background on Scroll
  // ==========================================================================
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  const updateNavBackground = () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(24, 24, 27, 0.95)';
    } else {
      nav.style.background = 'rgba(24, 24, 27, 0.85)';
    }
    lastScrollY = window.scrollY;
  };

  // Throttle scroll events for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavBackground();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  updateNavBackground();

})();
