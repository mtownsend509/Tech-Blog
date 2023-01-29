const Profile = require('./Profile');
const Blogpost = require('./Blogpost');
const Comments = require('./Comments');

Profile.hasMany(Blogpost, {
    foreignKey: 'profile_id',
    onDelete: 'CASCADE'
});
Blogpost.belongsTo(Profile, {
    foreignKey: 'profile_id'
});

Blogpost.hasMany(Comments, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
});
Comments.belongsTo(Blogpost, {
    foreignKey: 'blogpost_id'
});

module.exports = { Profile, Blogpost, Comments};