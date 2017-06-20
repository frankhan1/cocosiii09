
var Test4Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("ctor");

        var bg = new cc.Sprite(res.bg_png,cc.rect(0,192,512,172));// left up x=0,y=192 抓圖

        bg.attr({
            x: size.width/2,
            y: size.height/2
        });
        bg.scaleX =size.width / bg.width;
        bg.scaleY = size.height / bg.height;
     //   cc.log(bg.scaleY+" "+size.height+" "+bg.height);
        this.addChild(bg,0);

        var title = new cc.LabelTTF("Change Menu4","",36);
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

        var next1 = new cc.MenuItemFont("Goto Scene 4-1(1)",this.next1,this);
        var next2 = new cc.MenuItemFont("Goto Scene 4-1(2)",this.next2,this);
        var next3 = new cc.MenuItemFont("Goto Scene 4-1(3)",this.next3,this);
        var next4 = new cc.MenuItemFont("Goto Scene 4-1(4)",this.next4,this);

        var menu = new cc.Menu(next1,next2,next3,next4,backItem);  //  選單
        menu.alignItemsVertically();
        this.addChild(menu);
    },

    back: function(){
        cc.director.popScene();
    },
    next1: function(){
        cc.director.pushScene(new cc.TransitionFadeTR(2,new Test41Scene()));
    },
    next2: function(){
        cc.director.pushScene(new cc.TransitionJumpZoom(2,new Test41Scene()));
    },
    next3: function(){
        cc.director.pushScene(new cc.TransitionCrossFade(2,new Test41Scene()));
    },
    next4: function(){
        cc.director.pushScene(new cc.TransitionMoveInT(2,new Test41Scene()));
    },
    onEnter : function(){ // life cycle
        cc.log("onEnter");
    },
    onEnterTransitionDidFinish: function() {
        cc.log("onEnterTransFinish");

    },
    onExitTransitionDidStart: function(){
        cc.log("onExittrans...");

    },
});

var Test4Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test4Layer();
        this.addChild(layer);
    }
});

