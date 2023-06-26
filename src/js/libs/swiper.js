import Swiper from 'swiper/bundle';

let projects_slider = new Swiper(".projects__slider", {
  direction: "horizontal",

  navigation: {
    nextEl: '.projects__slider-arrow--next',
    prevEl: '.projects__slider-arrow--prev',
  },
});

let index_catalogue_slider = new Swiper(".index-catalogue__slider", {
  direction: "horizontal",
  spaceBetween: 20,
  speed: 500,

  breakpoints: {
    320: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: "auto",
    }
  },

  navigation: {
    nextEl: '.index-catalogue__slider-arrow--next',
    prevEl: '.index-catalogue__slider-arrow--prev',
  },

  pagination: {
    el: ".index-catalogue__slider-pagination",
    type: "progressbar",
    clickable: true,
  },
});

// let partners_slider = new Swiper(".partners__slider", {
//   direction: "horizontal",
//   spaceBetween: 40,

//   breakpoints: {
//     320: {
//       slidesPerView: 1
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: "auto",
//     }
//   },

//   pagination: {
//     el: ".partners__slider-pagination",
//     type: "progressbar",
//   },
// });

var letters_slider_init = false;

function letters_slider() {
  if (window.innerWidth <= 1599) {
    if (!letters_slider_init) {
      letters_slider_init = true;
      var letters_slider = new Swiper(".about-page-letters__slider", {
        direction: "horizontal",
        spaceBetween: 46,
        slidesPerView: "auto",

        breakpoints: {
          320: {
            slidesPerView: "auto",
          },
          1439: {
            slidesPerView: 4,
          }
        },

        pagination: {
          el: ".about-page-letters__slider-pagination",
          type: "progressbar",
          clickable: true,
        },
      });
    }
  } else if (letters_slider_init) {
    letters_slider.destroy();
    letters_slider_init = false;
  }
}
letters_slider();
window.addEventListener("resize", letters_slider);

let thumb_page_project_slider = new Swiper(".page-projects__thumb-slider", {
  spaceBetween: 15,
  freeMode: true,
  watchSlidesProgress: true,

  breakpoints: {
    320: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4,
    }
  },
});

let page_project_slider = new Swiper(".page-projects__slider", {
  spaceBetween: 0,

  thumbs: {
    swiper: thumb_page_project_slider,
  },
});

// --- Оставшееся количество слайдов на странице проектов
window.addEventListener('load', () => {
  if (document.querySelector('.page-projects__slider') === null) {
    return;
  }
  else {
    function changeNumSlide() {
      let visible_thumb_slides = document.querySelector('.page-projects__thumb-slider-wrapper').querySelectorAll('.swiper-slide-visible');
      let last_visible_thumb = Array.from(visible_thumb_slides).slice(-1)[0];
      let thumb_result = last_visible_thumb.getAttribute('aria-label').split(' / ')[1] - last_visible_thumb.getAttribute('aria-label').split(' / ')[0];

      if (thumb_result) {
        visible_thumb_slides.forEach((slide) => {
          slide.classList.remove('page-projects__thumb-slider-slide--num');
        })
        last_visible_thumb.classList.add('page-projects__thumb-slider-slide--num');
        last_visible_thumb.querySelector('.page-projects__slide-num').textContent = `+${thumb_result}`;
      }
      else {
        visible_thumb_slides.forEach((slide) => {
          slide.classList.remove('page-projects__thumb-slider-slide--num');
        })
      }
    }

    window.addEventListener('load', changeNumSlide());

    page_project_slider.on('slideChange', () => {
      changeNumSlide();
    });
    thumb_page_project_slider.on('slideChange', () => {
      changeNumSlide();
    });

  }
})

// var mobile_slider_init = false;

// function mobile_slider() {
//   if (window.innerWidth <= 1279) {
//     if (!mobile_slider_init) {
//       mobile_slider_init = true;
//       var mobile_slider = new Swiper(".mobile-slider", {
//         direction: "horizontal",
//         spaceBetween: 10,

//         breakpoints: {
//           320: {
//             slidesPerView: 1
//           },
//           768: {
//             slidesPerView: 2,
//           },
//           1024: {
//             slidesPerView: "auto",
//           }
//         },

//         pagination: {
//           el: ".mobile-slider__pagination",
//           clickable: true,
//         },
//       });
//     }
//   } else if (mobile_slider_init) {
//     mobile_slider.destroy();
//     mobile_slider_init = false;
//   }
// }
// mobile_slider();
// window.addEventListener("resize", mobile_slider);

// page - projects__thumb - slider - slide
// swiper - slide
// swiper - slide - visible
// swiper - slide - active
// swiper - slide - thumb - active

// page-projects__thumb-slider-slide
// swiper-slide
// swiper-slide-visible
// swiper-slide-next