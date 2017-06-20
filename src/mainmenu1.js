
var Mainmenu1Layer = cc.Layer.extend({

    ctor:function () {
        this._super();
        var size = cc.winSize;

        var bg = new cc.Sprite("res/hj101.jpg");
        bg.attr({
            x: size.width/2,
            y: size.height/2
        });
        this.addChild(bg,0);

        var bg1 = new cc.Sprite("res/hj1011.jpg");
        bg.attr({
            x: size.width/2,
            y: size.height/2
        });
        this.addChild(bg1,1);


        return true;
    },


});

var Mainmenu1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Mainmenu1Layer();
        this.addChild(layer);
    }
});

