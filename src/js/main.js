'use strict'

// ======================[ Header ]======================
import { componentHeader } from './modules/header.js';
import { componentHeaderScroll } from './modules/header.js';

// ======================[ Counter ]======================
import componentCounter from './modules/counter.js';

// ======================[ Modal Window ]======================
// import componentModal from './modules/modal.js';

// ======================[ Rippple Button ]======================
// import componentRippleButton from './modules/rippleButton.js';

// ======================[ Spoilers ]======================
import componentSpoilers from './modules/spoiler.js';

// ======================[ Switch ]======================
// import { componentIconsChangeTheme } from './modules/switch.js';
// import { componentSwitcherChangeTheme } from './modules/switch.js';

// ======================[ Tabs ]======================
// import componentTabs from './modules/tabs.js';

// ======================[ Dynamic Adaptive ]======================
import dynamicAdapt from './modules/dynamicAdapt.js';

// ======================[ Light Gallery ]======================
// import lightgallery from './modules/lightgallery.js';

// ======================[ Input Validate ]======================
import inputValidate from './modules/forms/inputValidate.js';

// ======================[ Select ]======================
import customSelect from './modules/forms/select.js';

// ======================[ Scroll Animation ]======================
import scrollAnimation from './modules/scrollAnimation.js';

// ======================[ Loader ]======================
// import componentLoader from './modules/loader.js';

// import AirDatepicker from 'air-datepicker';
// import localeEn from './modules/locale-en.js';


// ======================[ Header ]======================
componentHeader()
componentHeaderScroll()

// ======================[ Counter ]======================
componentCounter()

// ======================[ Modal Window ]======================
// componentModal()

// ======================[ Ripple Button ]======================
// componentRippleButton()

// ======================[ Spoilers ]======================
componentSpoilers();

// ======================[ Switch ]======================
// componentIconsChangeTheme()
// componentSwitcherChangeTheme()

// ======================[ Tabs ]======================
// componentTabs();

// ======================[ Dynamic Adaptive ]======================
dynamicAdapt()
/* Example: <div data-da=".content__column-garden,992,2" class="content__block">Example</div>
    for work with this component, you should write a data-attribute 'data-da' in element,
    which you want to adaptive. In data-da structure is data-da="where, when, which"
    where - class of element, where you want to move your element
    when - width of screen, when it should happen
    which - number of position after move or words "first" "last"
 */

// ======================[ Light Gallery ]======================
// lightgallery()

// ======================[ Input Validate ]======================
inputValidate();

// ======================[ Select ]======================
customSelect();

// ======================[ Scroll Animation ]======================
scrollAnimation();
/* ._active - element in viewport zone, start animation
    ._anim-items - for conect animationScroll for this element
    ._anim-no-hide - if you want only 1 animation, without repeat
    global class for examle ._anim-show, if one animation repeat
*/

// ======================[ Loader ]======================
// componentLoader();




// Header Background
window.onload = function () {
   const headerElement = document.querySelector('.header');

   const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
      } else {
         headerElement.classList.add('_scroll');
      }
   };

   const headerObserver = new IntersectionObserver(callback);
   headerObserver.observe(headerElement);
}


if (document.querySelector('.slider-hero__slider')) {
   const heroSlider = new Swiper('.slider-hero__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      watchOverflow: true,
      speed: 800,
      preloadImages: false,
      parallax: true,
      loop: true,
      effect: 'fade',
      autoplay: {
         delay: 5000,
      },
      on: {
         init: function () {
            updateHeroSliderPagination(this.realIndex);
         },
         slideChange: function () {
            updateHeroSliderPagination(this.realIndex);
         },
      },
   });
}

function updateHeroSliderPagination(activeIndex) {
   const lines = document.querySelectorAll('.hero__pagination .pagination-hero__line');
   lines.forEach((line, i) => {
      if (i === activeIndex && activeIndex < lines.length) {
         line.classList.add('visible');
      } else {
         line.classList.remove('visible');
      }
   });
}

if (document.querySelector('.slider-gallery__slider')) {
   const gallerySlider = new Swiper('.slider-gallery__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 2.3,
      spaceBetween: 32,
      watchOverflow: true,
      speed: 800,
      preloadImages: false,
      parallax: true,

      breakpoints: {
         // when window width is > 320px
         320: {
            slidesPerView: 1.5,
            spaceBetween: 10,
         },
         375: {
            slidesPerView: 2.5,
            spaceBetween: 10,
         },
         480: {
            slidesPerView: 3.1,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 1.5,
         },
         992: {
            slidesPerView: 2.3,
         },
      }
   });
}



// Calendar and Time Picker
// mobiscroll.datepicker('#calendar', {
//    controls: ['calendar']
// });
// mobiscroll.datepicker('#timePicker', {
//    controls: ['time'],
//    timeFormat: 'h:mm A',
//    touchUi: true
// });


// Coming Soon Timer
function startCountdown(timerElement) {
   const timeParts = timerElement.getAttribute("data-timer").split("-").map(Number);
   let [months, days, hours, minutes, seconds] = timeParts;

   const now = new Date();
   const targetDate = new Date(
      now.getFullYear(),
      now.getMonth() + months,
      now.getDate() + days,
      now.getHours() + hours,
      now.getMinutes() + minutes,
      now.getSeconds() + seconds
   );

   function updateTimer() {
      const now = new Date();
      let diff = targetDate - now;

      if (diff <= 0) {
         diff = 0;
         clearInterval(interval);
      }

      const s = Math.floor((diff / 1000) % 60);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const h = Math.floor((diff / 1000 / 60 / 60) % 24);
      const d = Math.floor((diff / 1000 / 60 / 60 / 24) % 30);
      const mo = Math.floor((diff / 1000 / 60 / 60 / 24 / 30));

      const map = {
         'data-timer-sec': s,
         'data-timer-min': m,
         'data-timer-hours': h,
         'data-timer-days': d,
         'data-timer-month': mo,
      };

      for (let key in map) {
         const value = String(map[key]).padStart(2, '0');
         const wrapper = timerElement.querySelector(`[${key}]`);
         if (wrapper) {
            const innerDiv = wrapper.querySelector("div");
            if (innerDiv) innerDiv.textContent = value;
         }
      }
   }

   updateTimer();
   const interval = setInterval(updateTimer, 1000);
}

document.querySelectorAll('[data-timer]').forEach(startCountdown);


// Load more products
const moreBlogsBtn = document.querySelector('#moreBlogsBtn');

if (moreBlogsBtn) {
   moreBlogsBtn.addEventListener('click', function (event) {
      getProducts(event.target);
      event.preventDefault();
   })
}


async function getProducts(button) {
   if (!button.classList.contains('_hold')) {
      button.classList.add('_hold');
      const file = '../json/blogs.json';
      let response = await fetch(file, {
         method: 'GET'
      });
      if (response.ok) {
         let result = await response.json();
         loadProducts(result);
         button.classList.remove('_hold');
         button.remove();
      } else {
         console.log('Error');
      }
   }
}

function loadProducts(data) {
   const blogsItems = document.querySelector('.main-blogs__items');

   data.blogs.forEach(item => {
      const blogId = item.id;
      const blogDate = item.date;
      const blogAuthor = item.author;
      const blogImage = item.image;
      const blogTitle = item.title;
      const blogText = item.text;
      const blogUrl = item.url;

      let blogTemplateStart = `<article data-bid="${blogId}" class="main-blogs__item item-blogs _load">`;
      let blogTemplateEnd = `</article>`;

      let blogTemplateLabels = '';

      let blogTemplateImage = `
         <a href="${blogUrl}" class="item-blogs__image">
            <img src="img/BlogsPage/blogs/${blogImage}" alt="Image">
         </a>
      `;
      let blogTemplateInfoStart = `<div class="item-blogs__info">`;
      let blogTemplateInfoEnd = `</div>`;

      let blogInfoContent = `
         <div class="item-blogs__date">${blogDate}</div>
         <div class="item-blogs__author"><a href="#">${blogAuthor}</a></div>
      `;

      let blogContent = `
         <h3 class="item-blogs__title"><a href="${blogUrl}">${blogTitle}</a></h3>
         <div class="item-blogs__text">
            <p>${blogText}</p>
         </div>
         <a href="${blogUrl}" class="item-blogs__link">Read More</a>
      `;




      let blogTemplateInfo = '';
      blogTemplateInfo += blogTemplateInfoStart;
      blogTemplateInfo += blogInfoContent;
      blogTemplateInfo += blogTemplateInfoEnd;


      let blogTemplate = '';
      blogTemplate += blogTemplateStart;
      blogTemplate += blogTemplateImage;
      blogTemplate += blogTemplateInfo;
      blogTemplate += blogContent;
      blogTemplate += blogTemplateEnd;

      blogsItems.insertAdjacentHTML('beforeend', blogTemplate);

   });
}

// Reply to Comment
const blogComments = document.querySelector('.main-blog-comment__items');
const cancelReplyBtn = document.querySelector('#cancelReplyBtn');

if (blogComments) {
   blogComments.addEventListener('click', function (event) {
      if (event.target.closest('.item-blog-comment__reply')) {
         const comment = event.target.closest('.item-blog-comment');
         const commentUser = comment.querySelector('.item-blog-comment__title a').textContent;

         replyToComment(commentUser)
      }
   });
}

if (cancelReplyBtn) {
   cancelReplyBtn.addEventListener('click', function () {
      stopReplyToComment()
   })
}

function replyToComment(userName) {
   const reply = document.querySelector('.main-blog-comment__reply');
   const replyUserName = document.querySelector('#replyUserName');
   const replyFormTextarea = document.querySelector('.reply-form-blog__textarea');

   reply.classList.add('_show');
   replyUserName.textContent = userName;
   replyFormTextarea.focus();
}

function stopReplyToComment() {
   const reply = document.querySelector('.main-blog-comment__reply');
   const replyFormTextarea = document.querySelector('.reply-form-blog__textarea');

   reply.classList.remove('_show');
   replyFormTextarea.value = '';
}