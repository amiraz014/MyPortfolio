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
    "a Future IS Engineer",
    "New Tech Enthusiast",
    "Available for Internship/Apprenticeship",
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

  

    downloadCvFr.addEventListener('click', () => {
        const cvUrl = 'source/cv-amir-adjaz-vm.pdf';
        const newTab = window.open(cvUrl, '_blank');
        if (newTab) {
            newTab.focus();
        } else {
            alert('Please allow pop-ups for this website.');
        }
    });
});

/*document.addEventListener('DOMContentLoaded', () => {
    const blogPosts = [
        {
            title: "My First Blog Post",
            date: "January 1, 2024",
            content: "This is the content of my first blog post. It's a great introduction to my blog.",
            image: "source/blog1.jpg",
            tags: ["Introduction", "Personal"],
            link: "blog-post-1.html"
        },
        {
            title: "Learning JavaScript",
            date: "February 15, 2024",
            content: "In this post, I share my journey of learning JavaScript and some tips for beginners.",
            image: "source/blog2.jpg",
            tags: ["JavaScript", "Learning"],
            link: "blog-post-2.html"
        },
        {
            title: "Exploring DevOps",
            date: "March 10, 2024",
            content: "DevOps is a fascinating field. Here, I discuss some key concepts and tools.",
            image: "source/blog3.jpg",
            tags: ["DevOps", "Tools"],
            link: "blog-post-3.html"
        }
    ];

    const blogContainer = document.getElementById('blog-posts');

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        const imageElement = document.createElement('img');
        imageElement.src = post.image;
        imageElement.alt = post.title;

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const dateElement = document.createElement('div');
        dateElement.classList.add('date');
        dateElement.textContent = post.date;

        const contentElement = document.createElement('p');
        contentElement.textContent = post.content;

        const tagsElement = document.createElement('div');
        tagsElement.classList.add('tags');
        post.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            tagsElement.appendChild(tagElement);
        });

        const readMoreElement = document.createElement('a');
        readMoreElement.href = post.link;
        readMoreElement.textContent = "Read More";
        readMoreElement.classList.add('read-more');

        postElement.appendChild(imageElement);
        postElement.appendChild(titleElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(tagsElement);
        postElement.appendChild(readMoreElement);

        blogContainer.appendChild(postElement);
    });
});
*/

window.onload = typeWriter