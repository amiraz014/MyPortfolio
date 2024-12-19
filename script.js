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
    const dropdown = document.getElementById('cv-options');
    const downloadCvEn = document.getElementById('download-cv-en');
    const downloadCvFr = document.getElementById('download-cv-fr');

    downloadButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && event.target !== downloadButton) {
            dropdown.style.display = 'none';
        }
    });

    window.addEventListener('scroll', () => {
        dropdown.style.display = 'none';
    });

    downloadCvEn.addEventListener('click', () => {
        const cvUrl = 'source/ResumeStage.pdf';
        const newTab = window.open(cvUrl, '_blank');
        if (newTab) {
            newTab.focus();
        } else {
            alert('Please allow pop-ups for this website.');
        }
    });

    downloadCvFr.addEventListener('click', () => {
        const cvUrl = 'source/ResumeStage.pdf';
        const newTab = window.open(cvUrl, '_blank');
        if (newTab) {
            newTab.focus();
        } else {
            alert('Please allow pop-ups for this website.');
        }
    });
});



window.onload = typeWriter