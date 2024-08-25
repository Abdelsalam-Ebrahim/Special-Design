// Check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null) {
    // documentElement => :root
    // document.documentElement.style.setProperty('--main-color', mainColors);
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"));

    // remove active class from all children
    document.querySelectorAll(".colors-list li").forEach(el => {
        el.classList.remove("active");
        
        // add active class on element with data-color === local storage item
        if(el.dataset.color === mainColors) {
            
            // Add active class
            el.classList.add("active");
        }
    });
}


// toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};



let backgroundOption = true;
let backgroundInterval;

// check if there is local strorage random background item
let backgroundLocalItem = localStorage.getItem("background_option"); 

// check if random backgoround local storage is not empty
if(backgroundLocalItem !== null) {
    if(backgroundLocalItem == "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // Remove active class from all children
    document.querySelectorAll(".option-box .random-background span").forEach(e => {
        e.classList.remove("active");
        if(e.dataset.background == backgroundOption.toString()) {   // type of backgroundOption is boolean
            e.classList.add("active");
        }
    });
}



// switch colors
let colorsLi = document.querySelectorAll(".colors-list li"); 

// loop on all list items
colorsLi.forEach(li => {
    
    // click on every list item
    li.addEventListener("click", (e) => {       
        
        // Set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set color on local storage (when we close or referse the website dont return to old color)
        localStorage.setItem("color_option", e.target.dataset.color);   // color_option -> any other name is fine

        handleActive(e);
    });
});


// switch random background option
let randomBackElement = document.querySelectorAll(".option-box .random-background span");

// loop on all span
randomBackElement.forEach(spans => {

    // remove active class from all children
    spans.addEventListener("click", e => {      // spans.onclick = function(e){};

        handleActive(e);

        if(e.target.dataset.background == "true") {
            backgroundOption = true;
            randomImage();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});


// Select landing page element 
let landingPage = document.querySelector(".landing-page");

// Get array od images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomImage() {
    if(backgroundOption == true) {
        // Change background image url every 2 seconds
        backgroundInterval = setInterval(() => {
            let randomNumbers = Math.floor((Math.random() * imgsArray.length) % 5);
            landingPage.style.backgroundImage = `url("imgs/0${randomNumbers}.jpg")`;
        }, 2000);
    }
}

randomImage();


// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {

    /* the height measure by the top of the page not to the bottom
    if the all pages is 1000 and the window is 200
    if i scrolled to the last page the height will be 800 not 1000  */
    
    // Skills offset top
    let skillsOffSetTop = ourSkills.offsetTop;  // the height of all upper part (photo and about us)

    // Skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight; // the height of ourskills section inculding padding and border (all height)

    // Window height
    let windowHeight = window.innerHeight;  // the height of the page or height of the window

    // Window scrollTop
    let windowScrollTop = window.pageYOffset + 20;   // the height of the window that i scroll to it
    // (when i scroll down it count from 0 the first page or the window dont count)
    
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    // (windowScrollTop + windowHeight - skillsOuterHeight > skillsOffSetTop)
    if(windowScrollTop + windowHeight - skillsOuterHeight > skillsOffSetTop - 225) {
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }

    if((windowScrollTop <= skillsOffSetTop - windowHeight) || (windowScrollTop > skillsOffSetTop + skillsOuterHeight - 125)) {
        allSkills.forEach(skill => {
            skill.style.width = 0;
        });
    }
};

// Create popup with the image
let ourGallary = document.querySelectorAll(".gallary .images-box img");

ourGallary.forEach(image => {
    
    image.addEventListener("click", el => {

        // create overlay element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        document.body.appendChild(popupBox);
        
        // add title (alt name) to popup box
        let imgHeading = document.createElement("h3");
        let imgText = document.createTextNode(image.alt);
        imgHeading.appendChild(imgText);
        popupBox.appendChild(imgHeading);
        
        // add image to popup box
        let popupImage = document.createElement("img");
        popupImage.src = image.src;
        popupBox.appendChild(popupImage);

        // create close button
        let closeButton = document.createElement("span");
        let closeButtonName = document.createTextNode("X");
        closeButton.className = "close-button";
        closeButton.appendChild(closeButtonName);
        popupBox.appendChild(closeButton);
        
    });
});

// Close popup box
document.addEventListener("click", e => {
    if(e.target.className == "close-button"){
        
        // Remove popup box
        e.target.parentNode.remove();

        // Remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});


// Select all links and bullets
let allLinks = document.querySelectorAll(".links a");
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSomeWhere(element) {
    element.forEach(el => {
        el.onclick = function(e) {
            e.preventDefault(); // to prevent the event it should do like link should open new page, it prevent that to happen
            document.querySelector(el.dataset.section).scrollIntoView({
                behavior: "smooth" // when you click the bullet it go to the section you click on it
                // and smooth to go with transition .3s (go smoothly y3ny)
            });
        };
    });
}

scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);


// Handle active state
function handleActive(ev) {
    // remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add active class on the element that i clicked
    ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if(bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", e => {
        if(span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        
        handleActive(e);
    });
});


// Reset Button
document.querySelector(".reset-options").onclick = function() {
    // localStorage.clear();   // clear all of the data in storage (including all data outside the website or the page)
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("bullets_option");

    // reload window
    window.location.reload();
};

// when click toggle menu toggle it and when press outside the box close the menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
let cnt1 = 0, cnt2 = 0;
    
toggleBtn.addEventListener("click", e => {
    toggleBtn.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
    cnt2--;
});

tLinks.addEventListener("click", e => {
    cnt1++;
});

document.documentElement.addEventListener("click", e => {
    cnt2++;
    if(cnt2 > cnt1) {
        toggleBtn.classList.remove("menu-active");
        tLinks.classList.remove("open");
        cnt1 = 0, cnt2 = 0;
    }
});



// Add on setting box (button yes and no to scroll nav bar)