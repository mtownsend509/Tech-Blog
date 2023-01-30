const { Blogpost } = require('../Models');

const blogSeeds = [
    {
        title: 'Here is the title',
        post: 'this is where the post goes',
        profile_id: 1
    },
    {
        title: 'tiitttttttlllllllleeeeee',
        post: 'pooooooossssssssstttttttt',
        profile_id: 1
    }
];

const seedBlogpost = () => Blogpost.bulkCreate(blogSeeds);

module.exports = seedBlogpost;