function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}
// Typewriter Effect
const texts = [
    "Software Engineering Student",
    "New Tech Enthusiast",
    "DevOps Learner",
]
let speed  =100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;
function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000)
    }
}
function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-cv-button');

    downloadButton.addEventListener('click', () => {

        const cvUrl = 'source/cv-Ayoub.pdf';

        // Open the CV in a new tab.
        const newTab = window.open(cvUrl, '_blank');

        // Ensure the new tab is opened successfully.
        if (newTab) {
            newTab.focus();
        } else {
            alert('Please allow pop-ups for this website.');
        }
    });
});



window.onload = typeWriter