const { Comments } = require('../Models');

const commentSeeds = [
    {
        text: 'this is where the text goes',
        blogpost_id: 1
    },
    {
        text: 'coooooommmmmmmmmmmeeeeeeennnnnnntttt',
        blogpost_id: 1
    }
];

const seedComments = () => Comments.bulkCreate(commentSeeds);

module.exports = seedComments;