exports.seed = function(knex, Promise) {
  return knex('footnotes').del() // delete all footnotes first
    .then(() => knex('papers').del()) // delete all papers
    .then(() => {
      return Promise.all([
        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('papers').insert({
          title: 'Something', author: 'Silver', publisher: 'Aspen'
        }, 'id')
        .then(paper => {
          return knex('footnotes').insert([
            { note: 'meh', paper_id: paper[0] },
            { note: 'bleh', paper_id: paper[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
