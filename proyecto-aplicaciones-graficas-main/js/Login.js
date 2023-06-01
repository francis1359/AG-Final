const signUpButton = document.getElementById('OverUp');
const signInButton = document.getElementById('OverIn');
const main = document.getElementById('main');

signUpButton.addEventListener ('click', () => {
    main.classList.add("right-panel-active")
});
signInButton.addEventListener ('click', () => {
    main.classList.remove("right-panel-active")
});