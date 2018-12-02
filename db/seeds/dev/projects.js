let projectsData = [{
  title: 'Project1',
  palettes: [{
    title: 'palette1',
    color1: 'red',
    color2: 'blue',
    color3: 'green',
    color4: 'orange',
    color5: 'purple',
  }]
},
{
  title: 'Project2',
  palettes: [{
    title: 'palette2',
    color1: 'black',
    color2: 'white',
    color3: 'grey',
    color4: 'pink',
    color5: 'purple',
  }]
}
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    title: project.title,
  }, 'id')
  .then(projectIds => {
    let palettePromises = project.palettes.map(palette => {
      return createPalettes(knex, {
        title: palette.title,
        color1: palette.color1,
        color2: palette.color2,
        color3: palette.color3,
        color4: palette.color4,
        color5: palette.color5,
        project_id: projectIds[0]
      })
    })

    return Promise.all(palettePromises)
  })
}

const createPalettes = (knex, palette) => {
  return knex('palettes').insert(palette)
}


exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = projectsData.map(project => {
        return createProject(knex, project)
      })
      return Promise.all(projectPromises)
    })
    .then(() => console.log('Successfully seeded database'))
    .catch(error => console.log(`Error seeding database: ${error.message}`))
};