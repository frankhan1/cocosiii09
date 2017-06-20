var Play01Layer = cc.Layer.extend({
    sprite: null,
    highScore: null,
    colorScore: null,
    player: null,
    colorPlayer: " ",
    titleString: " ",
    //  vars:[],
    ctor: function (data, name, score) {
        this._super();
        var size = cc.winSize;
        this.data = data;
        this.name = name;
        this.score = score;
        cc.log("Play01 ctor data= " + this.data + " name = " + this.name + " score = " + this.score);

        var level = ["BASIC", "JUNIOR", "MIDDLE", "SENIOR"];
        var bg = new cc.Sprite(res.hj10);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bg, 0);

        this.nameTitle = new cc.LabelTTF("Name : " + this.name, "", 50);
        this.nameTitle.attr({
            x: size.width / 4,
            y: size.height * 8 / 10
        });
        this.nameTitle.setColor(cc.color(0, 255, 0));
        this.addChild(this.nameTitle);

        var colorName = new cc.LayerColor(
            cc.color(255, 255, 255),
            100, 24);
        colorName.x = size.width / 4;
        colorName.y = size.height * 8 / 10;
        colorName.ignoreAnchorPointForPosition(false);
        this.addChild(colorName, 0);

        this.scoreTitle = new cc.LabelTTF("Score :" + this.score, "", 50);
        this.scoreTitle.attr({
            x: size.width * 3 / 4,
            y: size.height * 8 / 10
        });
        this.scoreTitle.setColor(cc.color(0, 255, 0));
        this.addChild(this.scoreTitle);

        var highScore = new cc.LabelTTF(level[this.data - 1] + " LEVEL", "", 50);
        highScore.attr({
            x: size.width / 2,
            y: size.height * 9 / 10
        });
        highScore.setColor(cc.color(255, 255, 0));
        this.addChild(highScore);

        this.initMenu();
        this.scheduleUpdate(this);
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

    update: function () {

        cc.log("Play01 update data= " + Play01Scene.data + " name = " + Play01Scene.name + " score = " + Play01Scene.score);

        this.titleString = this.name + " ~ Score :" + this.score;
        this.title.setString(this.titleString);

    },

    back: function () {
        //  cc.director.popScene();
        cc.director.pushScene(new MainmenuScene());
    },
    start: function () {
        cc.director.pushScene(new Play02Scene(this.data, this.name, this.score)); //場景切換+變數傳遞

    },
});

var Play01Scene = cc.Scene.extend({
    ctor: function (data, name, score) {    //為傳替參數
        this._super();
        cc.log("Play01 Scene data= " + this.data + " name = " + this.name + " score = " + this.score);
        var layer = new Play01Layer(data, name, score);
        this.addChild(layer);
    }
});

