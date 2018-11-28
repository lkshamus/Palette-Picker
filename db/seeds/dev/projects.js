
projectsData = [
  {
    title: 'Project1',
    colors: ['#fffff', '#12345', '#h6sn9a', '#823hss', '#l9a87s']
  },
  {
    title: 'Project2',
    colors: ['#ffafa', '#h2r45', '#76so9d', '#4o3hss', '#nja87s']   
  } 
]


const createProject = (knex, project) => {
  return knex('projects').insert({
    title: project.title,
  }, 'id')
  .then(projectIds => {
    let palettePromises = project.colors.map(palette => {
      return createPalette(knex, {
        title: palette.title, 
        colors: palette.colors,
        project_id: projectIds[0]
      })
    })

    return Promise.all(palettePromises)
  })
}

const createPalette = (knex, palette) => {
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
    .then(() => console.log('Successfully seeded db'))
    .catch(error => console.log(`Error seeding db: ${error.message}`))
};
