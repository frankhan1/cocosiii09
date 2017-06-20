
var Test31Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var title = new cc.LabelTTF("3-1 Scene","",36);
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

var Test31Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test31Layer();
        this.addChild(layer);
    }
});

