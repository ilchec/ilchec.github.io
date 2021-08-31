window.addEventListener('load', fn, false)
function fn() {
    const search_button = document.querySelector(".search-btn")
    const search_field = document.querySelector(".search-field")

    search_button.addEventListener('click', () => {
        search_field.classList.add('visible');
    })
}