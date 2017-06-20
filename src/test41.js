
var Test41Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var bg = new cc.Sprite(res.bg_png,cc.rect(0,0,512,192));// left up x=0,y=0 抓圖
        bg.attr({
            x: size.width/2,
            y: size.height/2
        });
        bg.scaleX =size.width / bg.width;
        bg.scaleY = size.height / bg.height;
      //  cc.log(bg.scaleY+" "+size.height+" "+bg.height);
        this.addChild(bg,0);

        var title = new cc.LabelTTF("4-1 Scene","",36);
        title.attr({
            x: size.width /2,
            y: size.height *9/10
        });
        this.addChild(title);

        this.initMenu();

        return true;
    },

    initMenu: function(){
        // var backItem = new cc.MenuItemImage(,,,,);
        var backItem = cc.MenuItemImage.create( //  選項
            res.back_normal,
            res.back_press,
            null,
            this.back,this);

        var home = new cc.MenuItemFont("Goto MainMenu",this.home,this);

        var menu = new cc.Menu(home,backItem);  //  選單
        menu.alignItemsVertically();
        this.addChild(menu);
    },

    home: function(){
        cc.director.popToRootScene();
    },

    back: function(){
        cc.director.popScene();
    },
});

var Test41Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test41Layer();
        this.addChild(layer);
    }
});

