function initMenu(menu) {
    document.querySelectorAll(".hamburger").forEach(item => {
        item.addEventListener("click", () => {
            menu.classList.add("active");
        });
    });

    document.querySelector(".menu__close").addEventListener("click", () => {
        menu.classList.remove("active");
    });
}

export default initMenu;