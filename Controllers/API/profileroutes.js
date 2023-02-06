const express = require('express');
const router = express.Router();

const withAuth = require('../../Utils/Auth');

const { Profile, Blogpost, Comments} = require('../../Models');

router.get('/', async (req, res) => {
    try {
      const profData = await Profile.findAll();
      res.json(profData);
    } catch (err) {
      res.json('somethings fucky');
    }
  });

router.post('/', async (req, res) => {
    try {
        const profileData = await Profile.create(req.body);
        req.session.save(() => {
            req.session.profile_id = profileData.id;
            req.session.logged_in = true;
            res.cookie('username', req.body.username);
            res.status(200).json(profileData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
      // check for existing username
      const profileData = await Profile.findOne({
        where: { username: req.body.username },
      });
      // if statement validating username
      if (!profileData) {
        res
          .status(400)
          .json({ message: "Incorrect username or password, please try again" });
        return;
      }
  
      const correctPassword = await profileData.checkPassword(req.body.password);
  
      // if statement validating password
      if (!correctPassword) {
        res
          .status(400)
          .json({
            message:
              "Incorrect username or password, please try again! (remember passwords are case sensitive)",
          });
        return;
      }
      // session for keeping profile logged in
      req.session.save(() => {
        req.session.profile_id = profileData.id;
        req.session.logged_in = true;
        res.cookie('username', req.body.username);
        console.log('we were here');
        res.json({
          profile: profileData,
          message: "Welcome back! You're now logged in."
        });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post("/logout", withAuth, (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;