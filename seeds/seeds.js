const seedBlogpost = require('./blogpost-seed');
const seedProfiles = require('./profile-seed');
const seedComments = require('./comments-seeds');

// models
const { Blogpost } = require('../Models');
const { Profile } = require('../Models');
const { Comments } = require('../Models');

// db connection
const sequelize = require('../config/Connection');

// seed mysql
const seedTables = async () => {
    await sequelize.sync({force: true});
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedProfiles();
    console.log('\n----- PROFILES SEEDED -----\n')

    await seedBlogpost();
    console.log('\n----- POSTS SEEDED -----\n');

    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n')

    process.exit(0);
};

seedTables();