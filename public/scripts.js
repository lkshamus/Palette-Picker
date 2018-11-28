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

function lockColor(e) {
  for (let i = 0; i < 6; i ++) {
    if (e.target.classList.contains(`color-palette${i}`)) {
      console.log(i)
      console.log(`color-palette${i}`)
      let color = $(this).css('background-color')
      console.log(color)
      $(`.color-palette${i}`).addClass(`new-class${i}`)
      $(`new-class${i}`).css('color', color)
      // $(`.color-palette${i}`).toggle(`new-class${i}`)
      // $(`.new-class${i}`).toggle(`color-palette${i}`)
      // if (e.target.classList.contains(`new-class${i}`)){
      //   $(`.color-palette${i}`).removeClass(`new-class${i}`)
      // }
    }
  }
}

function unlockColor(e) {
    if (e.target.classList.contains(`new-class1`)) {
      for (let i = 0; i < 6; i ++) {
        console.log('is this WORKING')
      let color = $(this).css('background-color')
      console.log(color)
      $(`color-palette${i}`).removeClass(`new-class${i}`)
      // if (e.target.classList.contains(`new-class${i}`)){
      //   $(`.color-palette${i}`).removeClass(`new-class${i}`)
      }
    }
  }


document.querySelector('.color-palette1').addEventListener('click', lockColor)
document.querySelector('.color-palette2').addEventListener('click', lockColor)
document.querySelector('.color-palette3').addEventListener('click', lockColor)
document.querySelector('.color-palette4').addEventListener('click', lockColor)
document.querySelector('.color-palette5').addEventListener('click', lockColor)
// document.querySelector('.color-palette1').addEventListener('click', unlockColor)
// document.querySelector('.color-palette2').addEventListener('click', unlockColor)
// document.querySelector('.color-palette3').addEventListener('click', unlockColor)
// document.querySelector('.color-palette4').addEventListener('click', unlockColor)
// document.querySelector('.color-palette5').addEventListener('click', unlockColor)


function toggleLock() {

}

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
