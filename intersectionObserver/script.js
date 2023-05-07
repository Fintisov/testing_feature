document.addEventListener("DOMContentLoaded", () => {

    function checkSection() {
        const blocks = document.querySelectorAll(".feed__content .section");
        const links = document.querySelectorAll(".feed__nav-link");

        links.forEach(elem => elem.addEventListener("click", e => {
            e.preventDefault()
            const indexLink = Array.from(links).findIndex(link => link === e.target);


            window.scrollTo({
                top: `${blocks[indexLink].offsetTop}`,
                behavior: "smooth"
            })
        }));


        const observerCallback = function (entries, observer) {
            entries.forEach(elem => {
                if (elem.isIntersecting) {
                    const indexSection = Array.from(blocks)
                        .findIndex(block => block === elem.target);

                    links.forEach(link => link.classList.remove("active"));
                    links[indexSection].classList.add("active");
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        })

        blocks.forEach(elem => {
            observer.observe(elem);
        })
    }

    checkSection();

    function animateProgressBar() {
        const progressBarLine = document.querySelector(".progress-bar .progress-bar__line");
        const progressBarPercent = document.querySelector(".progress-bar .progress-bar__percent");

        let result = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;

        progressBarLine.style.width = `${result}%`;
        progressBarPercent.innerText = `${parseInt(result)}%`;
    }

    window.addEventListener("scroll", animateProgressBar);

})