import Swiper from 'swiper/bundle';

let projects_slider = new Swiper(".projects__slider", {
  direction: "horizontal",
  spaceBetween: 0,
  speed: 1500,

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
    nextEl: '.projects__slider-arrow--next',
    prevEl: '.projects__slider-arrow--prev',
  },

  pagination: {
    el: ".projects__slider-pagination",
    clickable: true,
  },
});

var partners_slider_init = false;

function partners_slider() {
  if (window.innerWidth <= 1279) {
    if (!partners_slider_init) {
      partners_slider_init = true;
      var partners_slider = new Swiper(".partners__slider", {
        direction: "horizontal",
        spaceBetween: 40,

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

        pagination: {
          el: ".partners-slider__pagination",
          clickable: true,
        },
      });
    }
  } else if (partners_slider_init) {
    partners_slider.destroy();
    partners_slider_init = false;
  }
}
partners_slider();
window.addEventListener("resize", partners_slider);

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