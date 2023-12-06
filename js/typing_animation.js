const texts = [
    "Bonjour, je suis",
    "Hello, i'm",
    "Здравствуйте, я"
];

const helloText = document.querySelector('.hello-text');
const placeholder = document.createElement('span');
placeholder.classList.add('placeholder');
helloText.insertBefore(placeholder, helloText.firstChild);

let text = 0;
let char = 0;


let typeDelay = 100;
function type() {
    if (char < texts[text].length) {
        placeholder.textContent += texts[text].charAt(char);
        char++;
        setTimeout(type, typeDelay);
    } else {
        setTimeout(erase, typeDelay * 10);
    };
};


let deleteDelay = 40;
function erase() {
    if (char > 0) {
        placeholder.textContent = texts[text].substring(0, char - 1);
        char--;
        setTimeout(erase, deleteDelay);
    } else {
        text++;
        if (text >= texts.length) {
            text = 0;
        };
        setTimeout(type, typeDelay);
    };
};

type();