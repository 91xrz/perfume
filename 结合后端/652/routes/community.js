

const express = require('express');
const Community = require('../Models/comm');
const router = express.Router();
const authenticate = require('./authenticate');
// 发布新帖子
router.post('/publish', authenticate, async (req, res) => {
  try {
    const post = await Community.create({
      name: req.user.name, // 使用JWT中的用户名
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
