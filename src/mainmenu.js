
var MainmenuLayer = cc.Layer.extend({
    sprite:null,
   //  vars : {"var1":"NOBADY","var2":0}, // 傳遞屬性物件
    date : "",
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.d    = new Date();

        var bg = new cc.Sprite(res.hj00);
        bg.attr({
            x: size.width/2,
            y: size.height/2
        });
        this.addChild(bg,0);

        var title = new cc.LabelTTF("WELCOME HAMSTER","",60);
        title.attr({
            x: size.width /2,
            y: size.height *3/10
        });
        title.setColor(cc.color(255, 0, 0));
       // get date
        var y = this.d.getFullYear();
        var m = Number(this.d.getMonth())+1;
        var d = this.d.getDate();
        this.date = y+"/"+m+"/"+d;
        cc.log("DATE = "+this.date);

        this.addChild(title);
        this.initMenu();
        return true;
    },
    // 產生文字選單...
    initMenu : function() {  // 選項..選單
        var play = cc.MenuItemImage.create( //  選項
            res.play,
            res.play,
            null,
            this.play,this);
        var setting = cc.MenuItemImage.create( //  選項
            res.setting,
            res.setting,
            null,
            this.setting,this);

        var menu = new cc.Menu(play,setting); //選單
        menu.alignItemsHorizontally(); //垂直排列
        menu.attr({
            x: menu.width/2,
            y: menu.height/8
        });
        this.addChild(menu);
    },


    play : function() {
        cc.director.pushScene(new Play01Scene(0,this.date,0)); //場景切換 Test1Scene

    },
    setting : function() {
        cc.director.pushScene(new SettingScene(1,this.date,0)); //場景切換+變數傳遞test2Scene
    },
});

var MainmenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainmenuLayer();
        this.addChild(layer);
    }
});

