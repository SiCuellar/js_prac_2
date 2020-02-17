exports.seed = function(knex) {
  return knex('footnotes').del() // delete all footnotes first
    .then(() => knex('papers').del()) // delete all papers
    .then(() => {
      return Promise.all([
        knex('papers').insert({
          title: 'Fooo', author: 'Bob', publisher: 'Minnesota'
        }, 'id')
        .then(paper => {
          return knex('footnotes').insert([
            { note: 'Lorem', paper_id: paper[0] },
            { note: 'Dolor', paper_id: paper[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
