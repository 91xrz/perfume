var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var xiangdiaoRouter = require('./routes/xiangdiao');
var tiaoxiangshiRouter = require('./routes/tiaoxiangshi'); // 添加新的路由
var filterRouter = require('./routes/xunxiang'); // 添加新的路由
var brandRouter = require('./routes/brand'); // 添加新的路由
var shalongRouter = require('./routes/rank'); // 添加新的路由
var perRouter=require('./routes/perfume');
 var slRouter=require('./routes/shalong');
 var syRouter=require('./routes/shangye');
var communityRouter = require('./routes/community'); // 添加新的路由
var searchRouter = require('./routes/search'); // 添加新的路由
var proRouter = require('./routes/profile'); // 添加新的路由
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/xiangdiao', xiangdiaoRouter);
app.use('/tiaoxiangshi', tiaoxiangshiRouter); // 添加新的路由
app.use('/api/filter', filterRouter); // 添加新的路由
app.use('/brand', brandRouter); // 添加新的路由
app.use('/rank', shalongRouter); // 添加新的路由
app.use('/perfumeDetail',perRouter); // 添加新的路由
app.use('/community', communityRouter); // 添加新的路由
app.use('/shalong', slRouter); 
app.use('/shangye', syRouter); 
app.use('/sousuo', searchRouter); // 添加新的路由
app.use('/profile', proRouter); // 添加新的路由




app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
