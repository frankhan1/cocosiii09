var Play021Layer = cc.Layer.extend({
    sprite: null,
    counter: 0,
    ctor: function (data, vars) {
        this._super();
        var size = cc.winSize;
        var level = [];

        level[0] = "BASIC";
        level[1] = "JUNIOR";
        level[2] = "MIDDLE";
        level[3] = "SENIOR";

        var bg = new cc.Sprite(res.hj10);// ,cc.rect(0,192,512,172) left up x=0,y=192 抓圖
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        bg.scaleX = size.width / bg.width;
        bg.scaleY = size.height / bg.height;
        this.addChild(bg, 0);

        var title = new cc.LabelTTF(vars.var1 + " ~ Score :" + vars.var2, "", 50);
        title.attr({
            x: size.width / 2,
            y: size.height * 8 / 10
        });
        title.setColor(cc.color(0, 255, 0));
        this.addChild(title);

        var title1 = new cc.LabelTTF(level[data - 1] + " LEVEL", "", 50);
        title1.attr({
            x: size.width / 2,
            y: size.height * 9 / 10
        });
        title1.setColor(cc.color(255, 255, 0));
        this.addChild(title1);

        var j1 = new J1();
        j1.setTexture(res.jerry);
        j1.attr({
            x: 694,
            y: 416
        });
        this.addChild(j1, 0, "j1");
        //    this.initSprite();

        this.initMenu();

        //    this.myMouseListener(this);
        //    this.scheduleUpdate();
        //   this.unscheduleUpdate();
        return true;
    },

    initMenu: function () {
        cc.log("initMenu");
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
    back: function () {
        cc.director.popScene();
    },
    home: function () {
        cc.director.pushScene(new MainmenuScene());
    }
});

var J1 = cc.Sprite.extend({
    layer: null,
    counter: 0,
    ctor: function (layer) {
        this._super();
        this.layer = layer;
        this.scheduleUpdate();
        //     this.unscheduleUpdate();
    },
    update: function (dt) {
        this.counter++;
        //     if (this.j11 != null ) {
        //      this.j11 = this.getChildByName("j1");
        //      cc.log("j11 = " + this.j11);
        if (this.counter % 100 == 0) {
            cc.log("OK");
        //    this.removeChild(this);
            layer.j1.runAction(cc.fadeOut(2));
            this.unscheduleUpdate();


            //   this.unscheduleUpdate();
            //    this.layer.runAction(cc.scaleTo(1, cc.p(694, 412)));
            //     this.j1.runAction(cc.fadeOut(2));
            //   this.layer.removeChild(J1, true);
            //    Play021Layer.j1.removeChild(this, true);
            //   this.layer.j1.removeChild(this, true);
        }
        // } else {
        //     cc.log("j11=null");
        // }
    }

});

// this.jerry = new cc.Sprite(res.jerry);
// this.jerry.attr({
//    x:694 , y:416
// });
// this.addChild(this.jerry);


var Play021Scene = cc.Scene.extend({
    ctor: function (data, vars) {    //為傳替參數
        this._super();
        var layer = new Play021Layer(data, vars);
        this.addChild(layer);
    }
});

