var Play01Layer = cc.Layer.extend({
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
        var bg = new cc.Sprite(res.hj10);
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

        this.scoreTitle = new cc.LabelTTF(" Score : 0", "", 36);
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

        this.initMenu();
        //    this.scheduleUpdate();
        return true;
    },

    initMenu: function () {
        var back = cc.MenuItemImage.create( //  選項
            res.back_normal,
            res.back_press,
            null,
            this.back, this);

        var start = cc.MenuItemImage.create( //  選項
            res.start,
            res.start,
            null,
            this.start, this);
        var menu = new cc.Menu(start, back);  //  選單
        menu.attr({
            x: menu.width / 2,
            y: menu.height / 8
        });
        menu.alignItemsHorizontally(); //垂直排列
        this.addChild(menu);
    },

    back: function () {
        //  cc.director.popScene();
        if (this.data > 0) {
         //   cc.log(this.kn + " " + this.ks + " " + this.kd + " " + this.yn + " " + this.ys + " " + this.yd + " " + this.data);
            cc.director.pushScene(new SettingScene(this.kn, this.ks, this.kd, this.yn, this.yp, this.ys, this.yd, this.data)); //場景切換+變數傳遞
        } else {
            cc.director.pushScene(new MainmenuScene(this.kn, this.ks, this.kd, this.yn, this.yp, this.ys, this.yd, this.data)); //場景切換+變數傳遞
        }
    },
    start: function () {
        cc.director.pushScene(new Play02Scene(this.kn, this.ks, this.kd, this.yn, this.yp, this.ys, this.yd, this.data)); //場景切換+變數傳遞

    }
});

var Play01Scene = cc.Scene.extend({
    ctor: function (kn, ks, kd, yn, yp, ys, yd, data) {    //為傳替參數
        this._super();
        var layer = new Play01Layer(kn, ks, kd, yn, yp, ys, yd, data);
        //    cc.log("Play01 Scene data= " + this.data + " date = " + this.date + " score = " + this.score);
        this.addChild(layer);
    }
});

