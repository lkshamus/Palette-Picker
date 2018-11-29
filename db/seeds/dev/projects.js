
paletteData = [
  {
    title: 'Project1',
    colors: ['#ffafa', '#h2r45', '#76so9d', '#4o3hss', '#nja87s']
  }
  // {
  //   title: 'Project2',
  //   colors: ['red', 'blue', 'green', 'yellow', 'orange'] 
  // } 
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    title: project.title,
  }, 'id')
  .then(projectIds => {
    let palettePromises = project.colors.map(palette => {
      console.log('look here', project.palette)
      return createPalette(knex, {
        title: project.title, 
        colors: [palette, palette, palette, palette, palette],
        color1: palette,
        color2: palette, 
        color2: palette, 
        color3: palette,
        color4: palette,
        color5: palette,
        project_id: projectIds[0]
      })
    })

    return Promise.all(palettePromises)
  })
}

// const createPalette = (knex, palettes) => {
//   Object.values(palettes).map(palette => {
//     console.log(palette)
//     return knex('palettes').insert(palettes.palette)
//   })
// }

// const createPalette = (knex, palettes) => {
//   console.log('before the loop', palettes)
//   for (let i in palettes) {
//     // console.log(palettes)
//     return knex('palettes').insert(palettes.palette)
//   }
// }

const createPalette = (knex, color) => {
  // let palette = Object.values(color)[3]
  console.log(color.color1)
  return knex('palettes').insert(color)
}

exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = paletteData.map(project => {
        // console.log(project)
        return createProject(knex, project)
      })

      return Promise.all(projectPromises)
    })
    .then(() => console.log('Successfully seeded db'))
    .catch(error => console.log(`Error seeding db: ${error.message}`))
};
