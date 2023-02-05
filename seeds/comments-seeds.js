const { Comments } = require('../Models');

const commentSeeds = [
    {
        text: 'this is where the text goes',
        user: 'fakeuser',
        blogpost_id: 1
    },
    {
        text: 'coooooommmmmmmmmmmeeeeeeennnnnnntttt',
        user: 'realfakeuser',
        blogpost_id: 1
    }
];

const seedComments = () => Comments.bulkCreate(commentSeeds);

module.exports = seedComments;