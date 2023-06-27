import { lock, unlock } from 'tua-body-scroll-lock';

// --- Мобильное меню
const burger = document.querySelector('#burger');
const side_menu = document.querySelector('.side-menu');
const side_menu_links = document.querySelectorAll('.side-menu__main-nav-link');
const main_content = document.querySelector('.main-content');

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

side_menu_links.forEach((link) => {
    link.addEventListener('click', () => {

        if (window.innerWidth <= 1023) {
            burger.classList.toggle('header-nav__burger--active');
            side_menu.classList.toggle('side-menu--active');
            main_content.classList.toggle('main-content--active');

            unlock(main_content);
        }
    })
})

function changeActive(element) {
    window.addEventListener('load', () => {
        if (document.querySelector(`.${element}`) === null) {
            return;
        }
        else {
            let target_elements = document.querySelectorAll(`.${element}`);

            target_elements.forEach((item) => {
                item.addEventListener('click', () => {
                    target_elements.forEach((value) => { value.classList.remove(`${element}--active`) });
                    item.classList.add(`${element}--active`);
                })
            })
        }
    })
}

function toggleByClick(element) {
    window.addEventListener('load', () => {
        if (document.querySelector(`.${element}`) === null) {
            return;
        }
        else {
            let target_elements = document.querySelectorAll(`.${element}`);

            document.addEventListener('click', (e) => {
                target_elements.forEach((item) => {
                    if (!item.contains(e.target)) {
                        item.classList.remove(`${element}--active`);
                    }
                })
            })
        }
    })
};

// --- Смена активного класса в блоке ссылок на всех страницах
changeActive('links__list-item');

// --- Смена активного класса в селектах в боковом меню
changeActive('side-menu__main-nav-select');

// --- Сброс активного класса при клике на пустое место в селектах в боковом меню
toggleByClick('side-menu__main-nav-select');

// --- Табы на странице категорий
window.addEventListener('load', () => {
    if (document.querySelector('#page-categories') === null) {
        return;
    }
    else {
        // - Переход к табам при загрузке на странице категорий, или при изменении хэша страница
        let tabs_buttons = document.querySelectorAll('.links__list-item');
        let tabs_content = document.querySelectorAll('.page-categories__tabs-content');

        function tabs() {
            function changeById(id, elements) {
                elements.forEach((item) => {
                    if (item.dataset.tab === id) {
                        elements.forEach((value) => {
                            value.classList.remove(`${value.classList[0]}--active`);
                        })
                        item.classList.add(`${item.classList[0]}--active`);
                    }
                })
            }

            (function () {
                changeById(window.location.hash.split('#')[1], tabs_buttons);
                changeById(window.location.hash.split('#')[1], tabs_content);
            }())
        }

        window.addEventListener('load', () => { tabs(); });
        window.addEventListener('hashchange', () => { tabs() });


        // - Смена табов по клику
        tabs_buttons.forEach((button_item) => {
            button_item.addEventListener('click', () => {
                tabs_buttons.forEach((button_value) => { button_value.classList.remove((`${button_value.classList[0]}--active`)) });
                button_item.classList.add(`${button_item.classList[0]}--active`);

                tabs_content.forEach((content_item) => {
                    if (button_item.dataset.tab === content_item.dataset.tab) {
                        tabs_content.forEach((content_value) => { content_value.classList.remove(`${content_value.classList[0]}--active`) });
                        content_item.classList.add(`${content_item.classList[0]}--active`);
                    }
                })

            })
        })
    }
})


// --- Модалка с формой
window.addEventListener('load', () => {
    if (document.querySelector('#modal_with_form') === null) {
        return;
    }
    else {
        let modal_with_form = document.getElementById('modal_with_form');
        let modal_with_form_close = document.getElementById('modal_with_form_close');
        let modal_with_form_buttons = document.querySelectorAll('.modal-with-form__button');
        let modal_with_form_formset = document.getElementById('modal_with_form_formset');

        function closeFormModal() {
            modal_with_form.classList.remove('modal-with-form--active');
            unlock(modal_with_form);
        }

        // - Открытие модалки на нажатие кнопки
        modal_with_form_buttons.forEach((button) => {
            button.addEventListener('click', () => {
                modal_with_form.classList.add('modal-with-form--active');
                lock(modal_with_form);
            })
        })

        // - Закрытие модалки по нажатию крестика
        modal_with_form_close.addEventListener('click', () => {
            closeFormModal();
            document.querySelector('.modal-with-form__inner').classList.remove('modal-with-form__inner--hidden');
            document.querySelector('.modal-with-form__success').classList.remove('modal-with-form__success--active');
        })

        // - Закрытие модалки по нажатию на пустое место
        modal_with_form.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            else {
                closeFormModal();
                document.querySelector('.modal-with-form__inner').classList.remove('modal-with-form__inner--hidden');
                document.querySelector('.modal-with-form__success').classList.remove('modal-with-form__success--active');
            }
        })

        // - Подтверждение отправки модалки
        modal_with_form_formset.addEventListener('submit', (e) => {
            e.preventDefault();
            document.querySelector('.modal-with-form__inner').classList.add('modal-with-form__inner--hidden');
            document.querySelector('.modal-with-form__success').classList.add('modal-with-form__success--active');
        })
    }
})

// --- Модалка без формы
window.addEventListener('load', () => {
    if (document.getElementById('modal_without_form') === null) {
        return;
    }
    else {
        const modal_without_form = document.getElementById('modal_without_form');
        const modal_without_form_close = document.getElementById('modal_without_form_close');
        const modal_without_form_formset = document.querySelectorAll('.modal-without-form__formset');

        function closeWithoutFormModal() {
            modal_without_form.classList.remove('modal-without-form--active');
            unlock(modal_without_form);
        }

        // - Появление модалки без формы на событие отправка формы
        modal_without_form_formset.forEach((form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                modal_without_form.classList.add('modal-without-form--active');
                lock(modal_without_form);
            })
        });

        // - Закрытие модалки без формы по нажатию крестика
        modal_without_form_close.addEventListener('click', () => {
            closeWithoutFormModal();
        })

        // - Закрытие модалки без формы по нажатию на пустое место
        modal_without_form.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            else {
                closeWithoutFormModal();
            }
        })
    }
})

// --- Отключение подсветки ошибок в инпутах
window.addEventListener('load', () => {
    if (document.querySelectorAll('input') === null) {
        return;
    }
    else {
        document.querySelectorAll('input').forEach((input) => {
            input.setAttribute('spellcheck', 'false');
        })
    }
})