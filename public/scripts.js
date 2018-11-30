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
    if(!$(`.color-palette${i}`).hasClass(`new-class${i}`)){
      $(`.color-palette${i}`).css('background-color', getRandomColor());
      let color = getRandomColor();
      $(`.color-txt${i}`).text(color)
      console.log(color)
    }
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
      console.log('do u work')
      let color = $(this).css('background-color')
      $(`new-class${i}`).css('color', color)
      $(`.color-palette${i}`).toggleClass(`new-class${i}`, `.lock`)
    }
  }
}

function saveBtn(e) {
  e.preventDefault()
  createProject()
} 


const createProject = async () => {
  let projectName = document.querySelector('.project').value
  const url = '/api/v1/projects'

  const optionsObject = {
    method: "POST", 
    body: JSON.stringify({title: projectName}),
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    }
  }

  const response = await fetch(url, optionsObject);
  return await response.json();
}

document.querySelector('.save').addEventListener('click', saveBtn)

document.querySelector('.color-palette1').addEventListener('click', lockColor)
document.querySelector('.color-palette2').addEventListener('click', lockColor)
document.querySelector('.color-palette3').addEventListener('click', lockColor)
document.querySelector('.color-palette4').addEventListener('click', lockColor)
document.querySelector('.color-palette5').addEventListener('click', lockColor)

