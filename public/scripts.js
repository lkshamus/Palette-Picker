function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const setRandomColor = async (e) => {
  let colors = []
  e.preventDefault();
  for (let i = 0; i < 6; i++) { 
    if(!$(`.color-palette${i}`).hasClass(`new-class${i}`)){
      $(`.color-palette${i}`).css('background-color', getRandomColor());
      let color = getRandomColor();
      $(`.color-txt${i}`).text(color)
      colors.push(color)
    }
  }
  if (document.querySelector('.palette-input').value.length == 0) {
    return 
  } else {
    let paletteName = document.querySelector('.palette-input').value
    const url = 'api/v1/projects/palettes'
    projectName = document.querySelector('select').value
    let project_id = await GetTitleId(projectName)
    console.log(project_id)
    const optionsObject = {
      method: "POST", 
      body: JSON.stringify({title: paletteName, project_id: project_id, color1: colors[0], color2: colors[1], color3: colors[2], color4: colors[3], color5: colors[4]}),
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      }
    }
      const response = await fetch(url, optionsObject);
      return await response.json();
  }
}

const GetTitleId = async (title) => {
  let projectName = document.querySelector('select').value = title
  let projectNames = await getProjectsforPalettes()

  for (let i in projectNames) {
    if (projectNames[i].title === projectName) {
      let id = projectNames[i].id
      return id
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
      let color = $(this).css('background-color')
      $(`new-class${i}`).css('color', color)
      $(`.color-palette${i}`).toggleClass(`new-class${i}`, `.lock`)
    }
  }
}

function saveBtn(e) {
  e.preventDefault()
  createProject()
  fetchProjects()
} 

const createProject = async () => {
  let projectName = document.querySelector('.project').value
  const url = '/api/v1/projects'
  document.querySelector('.new-project').reset()
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

const fetchProjects = () => {
  fetch('/api/v1/projects')
    .then(function(response) {
      return response.json();
    })
    .then(function(projects) {
      projects.map(project => {
        let newProject = document.createElement('li')
        newProject.innerHTML =
          `<p>${project.title}</p>`
        let listProjects = document.querySelector('.list')
        listProjects.appendChild(newProject) 
        let displayProject = document.createElement('option')
        let displayList = document.querySelector('select')
        displayProject.innerHTML = 
          `<option>${project.title}<option>`
        displayList.appendChild(displayProject)
      })  
    });  
}

const fetchProjectsForPalettes = () => {
  fetch('/api/v1/projects')
    .then(function(response) {
      return response.json();
    })
    .then(function(projects) {
      console.log((projects));
    });  
}

const getProjectsforPalettes = async () => {
  const response = await fetch('/api/v1/projects');
  const json = await response.json();
  console.log(json);
  return json
}


document.addEventListener("DOMContentLoaded", fetchProjects);
document.querySelector('.save').addEventListener('click', saveBtn)

document.querySelector('.color-palette1').addEventListener('click', lockColor)
document.querySelector('.color-palette2').addEventListener('click', lockColor)
document.querySelector('.color-palette3').addEventListener('click', lockColor)
document.querySelector('.color-palette4').addEventListener('click', lockColor)
document.querySelector('.color-palette5').addEventListener('click', lockColor)

