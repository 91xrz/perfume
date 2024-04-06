

const express = require('express');
const Community = require('../Models/comm');
const router = express.Router();
// 发布新帖子
router.post('/publish', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: '请先登录' });
  }

  try {
    const post = await Community.create({
      name: req.session.user.name,
      content: req.body.content,
      time: new Date()
    });
    res.json({ success: true, post: post });
  } catch (error) {
    res.status(500).json({ message: '发布失败', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Community.findAll({
      order: [['time', 'DESC']]
    });
    res.render('community', { posts: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
