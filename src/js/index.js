import { lock, unlock } from 'tua-body-scroll-lock'

function changeActive(element) {
    window.addEventListener('load', () => {
        if (document.querySelector(`.${element}`) === null) {
            return;
        }
        else {
            const target_elements = document.querySelectorAll(`.${element}`);
            target_elements.forEach((item) => {
                item.addEventListener('click', () => {
                    target_elements.forEach((value) => { value.classList.remove(`${element}--active`) });
                    item.classList.add(`${element}--active`);
                })
            })
        }
    })
}

changeActive('links__list-item');

// --- Мобильное меню
const burger = document.querySelector('#burger');
const side_menu = document.querySelector('.side-menu');
const main_content = document.querySelector('.main-content');

const body = document.body;

burger.addEventListener('click', () => {
    burger.classList.toggle('header-nav__burger--active');
    side_menu.classList.toggle('side-menu--active');
    main_content.classList.toggle('main-content--active');

    (function () {
        !main_content.classList.contains('main-content--active') ?
            lock(main_content) :
            unlock(main_content);
    }())
})



// --- Модалка с формой

// window.addEventListener('load', () => {
//   if (document.querySelector('#modal_with_form') === null) {
//     return;
//   }
//   else {
//     let modal_with_form = document.getElementById('modal_with_form');
//     let modal_with_form_close = document.getElementById('modal_with_form_close');
//     let modal_with_form_buttons = document.querySelectorAll('.page-button');
//     let modal_with_form_formset = document.getElementById('modal_with_form_formset');

//     function closeFormModal() {
//       modal_with_form.classList.remove('modal-form--active');
//       unlock(modal_with_form);
//     }

    // - Открытие модалки на нажатие кнопки

    // modal_with_form_buttons.forEach((button) => {
    //   button.addEventListener('click', () => {
    //     modal_with_form.classList.add('modal-form--active');
    //     lock(modal_with_form);
    //   })
    // })

    // - Закрытие модалки по нажатию крестика

    // modal_with_form_close.addEventListener('click', () => {
    //   closeFormModal();
    // })

    // - Закрытие модалки по нажатию на пустое место

    // modal_with_form.addEventListener('click', (e) => {
    //   if (e.target !== e.currentTarget) {
    //     return;
    //   }
    //   else {
    //     closeFormModal();
    //   }
    // })

    // - Подтверждение отправки модалки

//     modal_with_form_formset.addEventListener('submit', (e) => {
//       e.preventDefault();
//       document.querySelector('.modal-form__inner').classList.add('modal-form__inner--hidden');
//       document.querySelector('.modal-form__success').classList.add('modal-form__success--active');
//     })
//   }
// })