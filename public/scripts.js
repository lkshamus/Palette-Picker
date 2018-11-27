function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomColor(e) {
  e.preventDefault();
  for (let i = 0; i < 6; i++) {
    $(`.color-palette${i}`).css('background-color', getRandomColor());
    let color = i + ' ' + getRandomColor();
    console.log(color)
  }
}

function setRandomColorText(e) {
  e.preventDefault();
  for (let i = 0; i < 10; i++) {
    $(`.color${i}`).css('color', getRandomColor());
  }
}

document.querySelector('.generate-btn').addEventListener('click', setRandomColor)
document.querySelector('.generate-btn').addEventListener('click', setRandomColorText)
document.addEventListener("DOMContentLoaded", setRandomColor);
document.addEventListener("DOMContentLoaded", setRandomColorText);

function lockColor() {
  document.querySelector('.color-palette').style.backgroundImage ='url(css/images/locked.svg)'
}

document.querySelector('.color-palette').addEventListener('click', lockColor)

// document.querySelector('.color-palette').addEventListener('click', function() {
//     let color = $(this).css('background-color')
//     console.log(color)
// })

// function lockColor() {
//   for (let i = 0; i < 6; i++) {
//     let color = $(`.color-palette${i}`).css('background-color')
//     console.log(color)
//   }
// }

// document.querySelector('.color-palette').addEventListener('click', lockColor)
