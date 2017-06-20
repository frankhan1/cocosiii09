var Play01Layer = cc.Layer.extend({
 //   sprite: null,
 //   highScore: 0,
    colorScore: null,
    scoreTitle: " ",
    scoreString: " ",
    recDate : null,
    colorDate: " ",
    dateTitle : " ",
    dateString: " ",
    ctor: function (data, date, score) {
        this._super();
        var size = cc.winSize;
        this.data = data;
        this.recDate = date;
        this.highScore = score;
        cc.log("Play01 ctor data= " + this.data + " date = " + this.recDate + " score = " + this.highScore);

        //   cc.log("Play01 ctor data= " + this.data + " rec.Date = " + this.recDate + " score = " + this.highScore);
        var level = ["BASIC", "JUNIOR", "MIDDLE", "SENIOR"];
        var bg = new cc.Sprite(res.hj10);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bg, 0);

        this.scoreTitle = new cc.LabelTTF("High Score : " +this.highScore, "", 36);
        this.scoreTitle.attr({
            x: 650,
            y: size.height * 8 / 10
        });
        this.scoreTitle.setColor(cc.color(0, 255, 0));
        this.scoreTitle.ignoreAnchorPointForPosition(false);
        this.addChild(this.scoreTitle,"",1);

        var colorScore = new cc.LayerColor(
            cc.color(50, 255, 50,90),
            200, 50);
        colorScore.x = size.width / 4;
        colorScore.y = size.height * 75 / 100;
        this.addChild(colorScore, 0);

        this.dateTitle = new cc.LabelTTF("Record Date : " + this.recDate, "", 36);
        this.dateTitle.attr({
            x: 220,
            y: size.height * 8 / 10
        });
        this.dateTitle.setColor(cc.color(0, 255, 0));
        this.dateTitle.ignoreAnchorPointForPosition(false);
        this.addChild(this.dateTitle);

        var colorDate = new cc.LayerColor(
            cc.color(50, 255, 50,90),
            200, 50);
        colorDate.x = size.width *3 / 4;
        colorDate.y = size.height * 75 / 100;
        this.addChild(colorDate, 0);

        var gameLevel = new cc.LabelTTF(level[this.data - 1] + " LEVEL", "", 50);
        gameLevel.attr({
            x: size.width / 2,
            y: size.height * 9 / 10
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

    update: function (dt) {

            cc.log("Play01 update score= "+this.highScore)
            this.dateString = "Record Date : "+this.recDate;
            this.scoreString ="High Score : "+this.highScore;
            this.dateTitle.setString(this.dateString);
            this.scoreTitle.setString(this.scoreString);
            // this.dateString = this.recDate + " ";
            // this.scoreString = this.highScore + " ";
            // this.dateTitle.setString(this.dateString);
            // this.scoreTitle.setString(this.scoreString);

    },

    back: function () {
        //  cc.director.popScene();
        if (this.data>0) {
            cc.director.pushScene(new SettingScene(this.data, this.recDate, this.highScore)); //場景切換+變數傳遞
        } else {
        cc.director.pushScene(new MainmenuScene(this.data, this.recDate, this.highScore)); //場景切換+變數傳遞
    }
    },
    start: function () {
        cc.director.pushScene(new Play02Scene(this.data, this.recDate, this.highScore)); //場景切換+變數傳遞

    }
});

var Play01Scene = cc.Scene.extend({
    ctor: function (data, date, score) {    //為傳替參數
        this._super();
        var layer = new Play01Layer(data, date, score);
        cc.log("Play01 Scene data= " + this.data + " date = " + this.date + " score = " + this.score);

        this.addChild(layer);
    }
});

