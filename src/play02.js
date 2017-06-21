var Play02Layer = cc.Layer.extend({
    counter: 0,
    date: "",
    hammer: null,
    bee: null, bee1: null,
    bfly: null, bfly1: null,
    dx: 3, dx1: 2.5,
    dy: 3, dy1: 2.5,
    bx: 1.5, bx1: 1,
    by: 1.5, by1: 1,
    isRight: true,
    isRight2: true,
    isRight3: true,
    isRight1: true,
    isRight0: true,
    title: null,
    titleString: " ",
    highScore: 0,
    colorScore: null,
    scoreTitle: " ",
    scoreString: " ",
    recDate: null,
    colorDate: " ",
    dateTitle: " ",
    dateString: " ",
    ctor: function (kn, ks, kd, yn, yp, ys, yd, data) {
        this._super();
        var size = cc.winSize;
        this.d = new Date();
        this.data = data;
        this.kn = kn;
        this.ks = ks;
        this.kd = kd;
        this.yn = yn;
        this.yp = yp;
        this.ys = ys;
        this.yd = yd;
        this.ls = cc.sys.localStorage;
        var t1s = "KING : " + this.kn + "      SCORE : " + this.ks + "      DATE : " + this.kd;
        var t2s = "YOUR : " + this.yn + "      SCORE : " + this.ys + "      DATE : " + this.yd;
        var level = ["BASIC", "JUNIOR", "MIDDLE", "SENIOR"];

        var bg = new cc.Sprite(res.hj10);// ,cc.rect(0,192,512,172) left up x=0,y=192 抓圖
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bg, 0);

        this.t1 = new cc.LabelTTF(t1s, "", 30);
        this.t1.attr({
            x: size.width / 2,
            y: size.height * 9 / 10
        });
        this.t1.setColor(cc.color(255, 0, 0));
        this.addChild(this.t1, 1);

        var t1c = new cc.LayerColor(
            cc.color(255, 255, 255, 150),
            900, 60);
        t1c.x = size.width / 2;
        t1c.y = size.height * 9 / 10;
        t1c.ignoreAnchorPointForPosition(false);
        this.addChild(t1c, 0);

        this.t2 = new cc.LabelTTF(t2s, "", 30);
        this.t2.attr({
            x: size.width / 2,
            y: size.height * 8 / 10
        });
        this.t2.setColor(cc.color(255, 0, 0));
        this.addChild(this.t2, 1);

        var t2c = new cc.LayerColor(
            cc.color(255, 255, 255, 150),
            900, 60);
        t2c.x = size.width / 2;
        t2c.y = size.height * 8 / 10;
        t2c.ignoreAnchorPointForPosition(false);
        this.addChild(t2c, 0);

        this.scoreTitle = new cc.LabelTTF(" Score : " + this.highScore, "", 36);
        this.scoreTitle.attr({
            x: 650,
            y: size.height * 7 / 10
        });
        this.scoreTitle.setColor(cc.color(0, 255, 0));
        this.scoreTitle.ignoreAnchorPointForPosition(false);
        this.addChild(this.scoreTitle, "", 1);

        var colorScore = new cc.LayerColor(
            cc.color(50, 255, 50, 90),
            200, 50);
        colorScore.x = size.width / 4;
        colorScore.y = size.height * 75 / 100;
        this.addChild(colorScore, 0);

        var gameLevel = new cc.LabelTTF(level[this.data - 1] + " LEVEL", "", 36);
        gameLevel.attr({
            x: size.width / 4,
            y: size.height * 7 / 10
        });
        gameLevel.setColor(cc.color(255, 255, 0));
        this.addChild(gameLevel);

        // **** get date *****
        var y = this.d.getFullYear();
        var m = Number(this.d.getMonth()) + 1;
        var d = this.d.getDate();
        this.date = y + "/" + m + "/" + d;
     //   cc.log("DATE = " + this.date);

        this.initMenu();
        this.initSprite();
        this.mymouseListener(this);
        this.scheduleUpdate();
        //   this.unscheduleUpdate();
        return true;
    },

    initMenu: function () {
        var back = cc.MenuItemImage.create( //  選項
            res.back_normal,
            res.back_press,
            null, this.back, this);

        var home = new cc.MenuItemFont("GOTO MAIN MENU", this.home, this);
        home.setColor(cc.color(255, 0, 0));

        var menu = new cc.Menu(home, back);  //  選單
        menu.alignItemsVertically(); //垂直排列
        menu.attr({
            x: menu.width / 2,
            y: menu.height / 8
        });
        menu.setColor(cc.color(255, 255, 0));
        this.addChild(menu);
    },

    initSprite: function () {
        this.bee = new cc.Sprite(res.bee);
        this.bee.attr({
            x: 960,
            y: 640
        });
        this.addChild(this.bee, 2, "bee");

        this.bee1 = new cc.Sprite(res.bee);
        this.bee1.attr({
            x: 480,
            y: 320
        });
        this.bee1.scaleX = 0.75;
        this.bee1.scaleY = 0.75;
        this.addChild(this.bee1, 2, "bee1");

        this.bfly = new cc.Sprite(res.bfly);
        this.bfly.attr({
            x: 960,
            y: 150
        });
        this.bfly.scaleX = 1;
        this.bfly.scaleY = 1;
        this.addChild(this.bfly, 2, "bfly");

        this.bfly1 = new cc.Sprite(res.bfly);
        this.bfly1.attr({
            x: 380,
            y: 350
        });
        this.bfly1.scaleX = 0.5;
        this.bfly1.scaleY = 0.5;
        this.addChild(this.bfly1, 2, "bfly1");

        this.j1 = new cc.Sprite(res.jerry);
        this.j1.attr({
            x: 694, y: 416
        });
        this.addChild(this.j1, 0, "j1");

        this.hammer = new cc.Sprite(res.hammer);
        this.hammer.attr({
            x: 50, // this.j1.x
            y: 600
        });
        this.hammer.scaleX = 2;
        this.hammer.scaleY = 2;
        this.addChild(this.hammer);

        //     this.j2 = new cc.Sprite(res.jerry);
        //     this.j2.attr({
        //         x: 457, y: 416
        //     });
        //     this.addChild(this.j2, 0, "j2");
        //   //  this.removeChild(this.j2, true);
        //
        //     this.j3 = new cc.Sprite(res.jerry);
        //     this.j3.attr({
        //         x: 230, y: 418
        //     });
        //     this.addChild(this.j3, 0, "j3");
        //  //   this.removeChild(this.j3, true);
    },

    update: function (dt) {
        if (this.bee.x - 80 >= cc.winSize.width || this.bee.x + 80 <= 0) {
            this.dx *= -1;
            this.isRight = !this.isRight;
            this.bee.runAction(cc.flipX(this.isRight));
        }
        if (this.bee.y - 80 >= cc.winSize.height || this.bee.y + 80 <= 0) {
            this.dy *= -1;
        }
        this.bee.x += this.dx;
        this.bee.y += this.dy + 2;

        if (this.bee1.x - 30 >= cc.winSize.width || this.bee1.x + 30 <= 0) {
            this.dx1 *= -1;
            this.isRight2 = !this.isRight2;
            this.bee1.runAction(cc.flipX(this.isRight2));
        }
        if (this.bee1.y - 30 >= cc.winSize.height || this.bee1.y + 30 <= 0) {
            this.dy1 *= -1;
        }
        this.bee1.x += this.dx1;
        this.bee1.y += this.dy1;

        if (this.bfly.x - 60 >= cc.winSize.width || this.bfly.x + 60 <= 0) {
            this.bx *= -1;
            this.isRight1 = !this.isRight1;
            this.bfly.runAction(cc.flipX(this.isRight1));
        }
        if (this.bfly.y - 60 >= cc.winSize.height || this.bfly.y + 60 <= 0) {
            this.by *= -1;
        }
        this.bfly.x += this.bx;
        this.bfly.y += this.by;

        if (this.bfly1.x - 50 >= cc.winSize.width || this.bfly1.x + 50 <= 0) {
            this.bx1 *= -1;
            this.isRight3 = !this.isRight3;
            this.bfly1.runAction(cc.flipX(this.isRight3));
        }
        if (this.bfly1.y - 50 >= cc.winSize.height || this.bfly1.y + 50 <= 0) {
            this.by1 *= -1;
        }
        this.bfly1.x += this.bx1;
        this.bfly1.y += this.by1;

        // 1 =  200
        // 2 = 175
        // 3 = 150
        // 4 = 125
        // 0 = 225 (200 - 25*(this.data-1))

        if (this.bee1.x % (200 - 50 * (this.data - 1)) == 0) {
            var t = parseInt(Math.random() * 9 + 1);
            switch (t) {
                case 1:
                    x1 = 457;
                    y1 = 416;
                    break;
                case 2:
                    x1 = 230;
                    y1 = 418;
                    break;
                case 3:
                    x1 = 694;
                    y1 = 416;
                    break;
                case 4:
                    x1 = 201;
                    y1 = 301;
                    break;
                case 5:
                    x1 = 457;
                    y1 = 287;
                    break;
                case 6:
                    x1 = 700;
                    y1 = 294;
                    break;
                case 7:
                    x1 = 457;
                    y1 = 152;
                    break;
                case 8:
                    x1 = 723;
                    y1 = 151;
                    break;
                case 9:
                    x1 = 187;
                    y1 = 167;
                    break;
            }
            this.j1.runAction(cc.moveTo(0, cc.p(x1, y1)));
        }
    },

    mymouseListener: function (layer) {
        if ('mouse' in cc.sys.capabilities) {
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    var x = event.getLocationX();
                    var y = event.getLocationY();
                    var point = new cc.Point(x, y);
                    var rectjerry = new cc.Rect(
                        layer.j1.x - layer.j1.width / 2,
                        layer.j1.y - layer.j1.height / 2,
                        layer.j1.width,
                        layer.j1.height
                    );

                    if (cc.rectContainsPoint(rectjerry, point)) {
                        layer.counter++;
                        layer.highScore = layer.counter;
                        layer.hammer.runAction(cc.moveTo(0, cc.p(x, y)));
                        layer.isRight = !layer.isRight;
                        layer.hammer.runAction(cc.flipX(layer.isRight));
                        layer.scoreString = "High Score : " + layer.highScore;
                        layer.scoreTitle.setString(layer.scoreString);

                    }
                }
            };
            cc.eventManager.addListener(mouseListener, this);
        }
    },


    back: function () {
        //    cc.log(this.kn+" "+this.ks+" "+this.kd+" "+this.yn+" "+this.ys+" "+this.yd+" "+this.data);
        if (this.highScore > this.ys) {
            this.ys = this.highScore;
            this.yd = this.date;
            var lsString = ":password:" + this.yp + ":score:" + this.ys + ":date:" + this.yd + ":memo:" + this.yn;
            this.ls.setItem(this.yn, lsString);
        }
        if (this.ys > this.ks) {
            var lsString = ":password:P@ssw0rd:score:" + this.ys + ":date:" + this.yd + ":memo:" + this.yn;
            this.ls.setItem("KING", lsString);
        }
        cc.director.pushScene(new Play01Scene(this.kn, this.ks, this.kd, this.yn, this.yp, this.ys, this.yd, this.data));
        //    cc.director.popScene(this.data,this.recDate,this.highScore);
    },
    home: function () {
        if (this.highScore > this.ys) {
            this.ys = this.highScore;
            this.yd = this.date;
            var lsString = ":password:" + this.yp + ":score:" + this.ys + ":date:" + this.yd + ":memo:" + this.yn;
            this.ls.setItem(this.yn, lsString);
        }
        if (this.ys > this.ks) {
            var lsString = ":password:P@ssw0rd:score:" + this.ys + ":date:" + this.yd + ":memo:" + this.yn;
            this.ls.setItem("KING", lsString);
        }
        cc.director.pushScene(new MainmenuScene());
    }
});

var Play02Scene = cc.Scene.extend({
    ctor: function (kn, ks, kd, yn, yp, ys, yd, data) {    //為傳替參數
        this._super();
        var layer = new Play02Layer(kn, ks, kd, yn, yp, ys, yd, data);
        this.addChild(layer);
    }
});

