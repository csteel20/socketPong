// Generated by CoffeeScript 1.3.1
(function() {
  var Ball, GameObject, Paddle, SocketPong,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  SocketPong = (function() {

    SocketPong.name = 'SocketPong';

    function SocketPong() {
      this.createCanvas();
      this.objects = [];
    }

    SocketPong.prototype.start = function() {
      this.gameloop();
      return this.loop = true;
    };

    SocketPong.prototype.createCanvas = function() {
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      this.canvas.width = $('body').width();
      return this.canvas.height = $('body').height();
    };

    SocketPong.prototype.clearCanvas = function() {
      return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    SocketPong.prototype.context = function() {
      return this.context;
    };

    SocketPong.prototype.gameloop = function(_objects, _clear) {
      var _this = this;
      return setTimeout(function() {
        _this.clearCanvas();
        _this.objects.forEach(function(e) {
          return e.draw();
        });
        if (_this.loop) {
          return _this.gameloop();
        }
      });
    };

    SocketPong.prototype.addObject = function(_item) {
      this.objects.push(_item);
      return _item.draw();
    };

    return SocketPong;

  })();

  GameObject = (function() {

    GameObject.name = 'GameObject';

    GameObject.prototype.x = 0;

    GameObject.prototype.y = 0;

    GameObject.prototype.w = 10;

    GameObject.prototype.h = 10;

    function GameObject(context, x, y) {
      this.context = context;
      this.x = x;
      this.y = y;
    }

    GameObject.prototype.init = function() {};

    GameObject.prototype.draw = function() {
      this.context.fillStyle = 'rgba(0,0,0,1)';
      return this.context.fillRect(this.x, this.y, this.w, this.h);
    };

    return GameObject;

  })();

  Paddle = (function(_super) {

    __extends(Paddle, _super);

    Paddle.name = 'Paddle';

    function Paddle() {
      return Paddle.__super__.constructor.apply(this, arguments);
    }

    Paddle.prototype.w = 30;

    Paddle.prototype.h = 120;

    return Paddle;

  })(GameObject);

  Ball = (function(_super) {

    __extends(Ball, _super);

    Ball.name = 'Ball';

    function Ball() {
      return Ball.__super__.constructor.apply(this, arguments);
    }

    Ball.prototype.w = 20;

    Ball.prototype.h = 20;

    return Ball;

  })(GameObject);

  $(function() {
    var ball, paddle1, paddle2, pong;
    pong = new SocketPong;
    paddle1 = new Paddle(pong.context, 10, 10);
    pong.addObject(paddle1);
    paddle2 = new Paddle(pong.context, $('body').width() - 40, 10);
    pong.addObject(paddle2);
    ball = new Ball(pong.context, $('body').width() / 2 - 10, $('body').height() / 2 - 10);
    pong.addObject(ball);
    return pong.start();
  });

}).call(this);