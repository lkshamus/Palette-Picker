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
  }
}

document.querySelector('.generate-btn').addEventListener('click', setRandomColor)