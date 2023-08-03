/*!
 * Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector("#mainNav");
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove("navbar-shrink");
        } else {
            navbarCollapsible.classList.add("navbar-shrink");
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener("scroll", navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector("#mainNav");
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#mainNav",
            offset: 72,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll("#navbarResponsive .nav-link")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }
        });
    });

    // Add event listener to "Read More" links
    const readMoreLinks = document.querySelectorAll(".read-more-link");
    readMoreLinks.forEach((link) => {
        link.addEventListener("click", function () {
            const projectDescription = this.previousElementSibling;
            const truncateParagraph =
                projectDescription.querySelector(".truncate");
            const fullParagraph = projectDescription.querySelector(".full");

            if (projectDescription.classList.contains("expanded")) {
                truncateParagraph.style.display = "block";
                fullParagraph.style.display = "none";
                this.textContent = "Read More";
            } else {
                truncateParagraph.style.display = "none";
                fullParagraph.style.display = "block";
                this.textContent = "Read Less";
            }

            projectDescription.classList.toggle("expanded");
        });
    });
});

function showExtraTextOnLoad() {
    var cardCount = 4; // Change this to the number of cards you have
    for (var i = 1; i <= cardCount; i++) {
        showLessText(i); // Show less text on load
    }
}

function showLessText(cardNumber) {
    var dots = document.getElementById("dots" + cardNumber);
    var moreText = document.getElementById("more" + cardNumber);
    var btnText = document.getElementById("myBtn" + cardNumber);

    dots.style.display = "inline";
    btnText.innerHTML = "Read More >";
    moreText.style.display = "none";
}

function myFunction(cardNumber) {
    var dots = document.getElementById("dots" + cardNumber);
    var moreText = document.getElementById("more" + cardNumber);
    var btnText = document.getElementById("myBtn" + cardNumber);

    if (dots.style.display === "none") {
        showLessText(cardNumber);
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read Less <";
        moreText.style.display = "inline";
    }
}

// Execute the function when the page is loaded
window.onload = showExtraTextOnLoad;
