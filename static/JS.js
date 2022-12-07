function changeBg(){

    const images = [
        'url("../static/pictures/frenchToast.jpg")',
        'url("../static/pictures/omelet.jpg")',
        'url("../static/pictures/pasta.jpg")',
        'url("../static/pictures/pizzapita.jpg")',
        'url("../static/pictures/shakshuka.jpg")',
    ]

    const section = document.querySelector('section');
    const bg = images[Math.floor(Math.random() *
    images.length)];
    section.style.backgroundImage = bg;
}

setInterval(changeBg, 2500);

