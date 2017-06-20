var SettingLayer = cc.Layer.extend({
    sprite: null,
    nameTitle: null,
    colorName: null,
    nameString: " ",
    // vars : {"name":"Name","score":0}, // 傳遞屬性物件
    ls: null,
    kb: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "->", "?", "?", "?", "<-|", "?", "?",  // 0~15
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?",  // 16~31
        " ", "?", "?", "?", "?", "<-", "^", "->", "v", "?", "?", "?", "?", "?", "?", "?",  // 32~47
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "?", "?", "?", "?", "?", "?",  // 48~63
        "?", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",  // 64~79
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "?", "?", "?", "?", "?",  // 80~95
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?",  // 96~111
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?",  // 112~127
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?",  // 128~143
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?",  // 144~159
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?",  // 160~175
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "=",",", "-", ".", "/", "`"], // 176~192


        ctor: function (data, name, score) {
        this._super();
        var size = cc.winSize;
        this.data = data;
        this.name = name;
        this.score = score;
        this.ls = cc.sys.localStorage;
    //    cc.log("Setting ctor data= " + this.data + " name = " + this.name + " score = " + this.score);
   //   this.ls.setItem("KING",":password:P@ssw0rd:score:800:date:2017/06/20:memo:FRANKHAN");
            // cc.log("Name = "+this.ls.getItem("name"));
            // cc.log("score"+this.ls.getItem("score"));
            // cc.log("date"+this.ls.getItem("date"));
        var bg = new cc.Sprite(res.hj10);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bg, 0);

        var title = new cc.LabelTTF("PLEASE KEY IN YOUR NAME & SELECT ONE LEVEL", "", 30);
        title.attr({
            x: size.width / 2,
            y: size.height * 9 / 10
        });
        title.setColor(cc.color(255, 0, 0));
        this.addChild(title, 1);

        var colorTitle = new cc.LayerColor(
            cc.color(255, 255, 255, 150),
            900, 60);
        colorTitle.x = size.width / 2;
        colorTitle.y = size.height * 9 / 10;
        colorTitle.ignoreAnchorPointForPosition(false);
        this.addChild(colorTitle, 0);

        this.nameTitle = new cc.LabelTTF("YOUR NAME : ", "", 36);
        this.nameTitle.attr({
            x: 220,
            y: size.height * 8 / 10
        });
        this.nameTitle.setColor(cc.color(255, 0, 0));
        this.nameTitle.ignoreAnchorPointForPosition(false);
        this.addChild(this.nameTitle);

        this.inputName = new cc.LabelTTF(" ", "", 36);
        this.inputName.attr({
            x: 350,
            y: size.height * 75 / 100
        });
        this.inputName.setColor(cc.color(255,0, 0));
        this.inputName.ignoreAnchorPointForPosition(false);
        this.addChild(this.inputName, 0);

        this.initMenu();
        this.myKeyListener(this);
        return true;
    },

    initMenu: function () {
        // 產生文字選單...
        var level1 = new cc.MenuItemFont("BASIC LEVEL", this.menuLevel1, this);
        var level2 = new cc.MenuItemFont("JUNIOR LEVEL", this.menuLevel2, this);
        var level3 = new cc.MenuItemFont("MIDDLE LEVEL", this.menuLevel3, this);
        var level4 = new cc.MenuItemFont("SENIOR LEVEL", this.menuLevel4, this);

        var menuLevel = new cc.Menu(level1, level2, level3, level4); //選單
        menuLevel.alignItemsVertically(); //垂直排列
        menuLevel.attr({
            x: menuLevel.width / 2,
            y: menuLevel.height * 4 / 8
        });
        menuLevel.setColor(cc.color(255, 0, 0));
        this.addChild(menuLevel);

        var back = cc.MenuItemImage.create(
            res.back_normal,
            res.back_press,
            null,
            this.back, this);

        var menu = new cc.Menu(back); //  ,start
        menu.attr({
            x: menu.width / 2,
            y: menu.height / 8
        });
        menu.alignItemsHorizontally(); //垂直排列
        this.addChild(menu);
    },

    myKeyListener: function (layer) {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
          //      cc.log("keyCode= " + keyCode);
                switch (keyCode) {
                    case 39:
                        layer.nameString = layer.nameString.trim();
                        layer.ls.setItem(layer.nameString,":password:1234567890:score:200:date:2017/06/20:memo:FRANK HAN");
                        // cc.log("name : "+layer.nameString);
                        // cc.log("description : "+layer.ls.getItem(layer.nameString));
                         var description = layer.ls.getItem(layer.nameString);
                        // cc.log("description : "+description);
                        // var p1 = description.indexOf(":password:")+10;
                        // var p2 = description.indexOf(":score:");
                         var pswd = description.slice(p1,p2);
                         cc.log("p1 = "+p1+" p2 = "+p2+" password : "+pswd);
                        //   this.ls.setItem("KING","P@ssw0rd 800 2017/06/20 FRANKHAN");
                    //    cc.log("Name = "+this.ls.getItem("name"));
                        break;
                    case keyCode:
                        layer.nameString = layer.nameString + layer.kb[keyCode];
                        layer.inputName.setString(layer.nameString);
                        break;
                     }
                }
            }, this);
    },


    menuLevel1: function () {
        cc.director.pushScene(new Play01Scene(1, this.name, this.score));
    },
    menuLevel2: function () {
        cc.director.pushScene(new Play01Scene(2, this.name, this.score));
    },
    menuLevel3: function () {
        cc.director.pushScene(new Play01Scene(3, this.name, this.score));
    },
    menuLevel4: function () {
        cc.director.pushScene(new Play01Scene(4, this.name, this.score));
    },

    back: function () {
        //   cc.director.popScene();
        cc.director.pushScene(new MainmenuScene());
    },
});

var SettingScene = cc.Scene.extend({
    ctor: function (data, name, score) {    //為傳替參數
        this._super();
        var layer = new SettingLayer(data, name, score);
        cc.log("Setting data= " + data + " name = " + name + " score = " + score);

        this.addChild(layer);
        this.focused = true;
    }
});
