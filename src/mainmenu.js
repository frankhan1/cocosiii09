var MainMenuLayer = cc.Layer.extend({
    date: "",
    ks2 :"",
    kd2 :"",
    t3: null,
    t3c: null,
    t3s: "",
    t5: null,
    t5c: null,
    t5s: "",
    isFlipX: true,
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
        "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "=", ",", "-", ".", "/", "`"], // 176~192


    ctor: function () {
        this._super();
        var size = cc.winSize;
        this.d = new Date();
        this.ls = cc.sys.localStorage;
        this.data = 0;
        this.keyCode =  0;
        var description = this.ls.getItem("KING");
        var m1 = description.indexOf(":memo:") + 6;
        this.kn = description.slice(m1, description.length);
        var s1 = description.indexOf(":score:") + 7;
        var d1 = description.indexOf(":date:");
        this.ks = description.slice(s1, d1);
        this.kd = description.slice(d1 + 6, m1 - 6);
        var t1String = "KING : " + this.kn + "      SCORE : " + this.ks + "      DATE : " + this.kd;

        var bg = new cc.Sprite(res.hj00);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bg, 0);

        this.title = new cc.LabelTTF("WELCOME HAMSTER", "", 36);
        this.title.x = size.width / 2;
        this.title.y = size.height * 3 / 10;
        this.title.setColor(cc.color(255, 0, 0));
        this.title.ignoreAnchorPointForPosition(false);
        this.addChild(this.title);

        this.t1 = new cc.LabelTTF(t1String, "", 30);
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

        var t2 = new cc.LabelTTF("NAME : ", "", 30);
        t2.x = 100;
        t2.y = size.height * 8 / 10;
        t2.setColor(cc.color(255, 0, 0));
        t2.ignoreAnchorPointForPosition(false);
        this.addChild(t2, 0);

        this.t3 = new cc.LabelTTF(" ", "", 30);
        this.t3.attr({
            x: 220,
            y: size.height * 8 / 10
        });
        this.t3.setColor(cc.color(255, 0, 0));
        this.t3.ignoreAnchorPointForPosition(false);
        this.addChild(this.t3, 1);

        this.t3c = new cc.LayerColor(
            cc.color(255, 255, 255, 150),
            150, 60);
        this.t3c.x = 220;
        this.t3c.y = size.height * 8 / 10;
        this.t3c.ignoreAnchorPointForPosition(false);
        this.addChild(this.t3c, 0);

        var t4 = new cc.LabelTTF("PASSWORD : ", "", 30);
        t4.x = 500;
        t4.y = size.height * 8 / 10;
        t4.setColor(cc.color(255, 0, 0));
        t4.ignoreAnchorPointForPosition(false);
        this.addChild(t4, 0);

        this.t5 = new cc.LabelTTF(" ", "", 30);
        this.t5.attr({
            x: 650,
            y: size.height * 8 / 10
        });
        this.t5.setColor(cc.color(255, 0, 0));
        this.t5.ignoreAnchorPointForPosition(false);
        this.addChild(this.t5, 1);

        this.t5c = new cc.LayerColor(
            cc.color(255, 255, 255, 150),
            150, 60);
        this.t5c.x = 650;
        this.t5c.y = size.height * 8 / 10;
        this.t5c.ignoreAnchorPointForPosition(false);
        this.addChild(this.t5c, 0);

        this.initMenu();
        this.myKeyListener(this);
        return true;
    },
    // 產生文字選單...
    initMenu: function () {  // 選項..選單
        var play = cc.MenuItemImage.create( //  選項
            res.play,
            res.play,
            null,
            this.play, this);
        var setting = cc.MenuItemImage.create( //  選項
            res.setting,
            res.setting,
            null,
            this.setting, this);

        var menu = new cc.Menu(play, setting); //選單
        menu.alignItemsHorizontally(); //垂直排列
        menu.attr({
            x: menu.width / 2,
            y: menu.height / 8
        });
        this.addChild(menu);

        this.NodeGrid(250, 500);
    },

    myKeyListener: function (layer) {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                layer.keyCode = keyCode;
                switch (keyCode) {
                    case 8 :
                        if (layer.isFlipX) {
                            if (layer.t3s) {
                                layer.t3s = layer.t3s.substr(0, layer.t3s.length - 1);
                                layer.t3.setString(layer.t3s);
                            }
                        } else {
                            if (layer.t5s) {
                                layer.t5s = layer.t5s.substr(0, layer.t5s.length - 1);
                                layer.t5.setString(layer.t5s);
                            }
                        }
                        break;
                    case  9 :
                    case  13 :
                    case  39 :
                        if (layer.isFlipX) {
                            layer.t3s = layer.t3s.trim();
                            var dn2 = layer.ls.getItem(layer.t3s);
                            if (dn2) {
                                layer.tString = "WELCOME " + layer.t3s + " PLEASE INPUT PASSWORD " ;
                                layer.title.setString(layer.tString);

                            } else {
                                layer.tString = "WELCOME " + layer.t3s + " PLEASE SETTING PASSWORD " ;
                                layer.title.setString(layer.tString);
                            }
                            layer.NodeGrid(650, 500);
                            layer.isFlipX = !layer.isFlipX;
                        } else {
                            layer.t5s = layer.t5s.trim();
                            layer.t3s = layer.t3s.trim();
                            var dn3 = layer.ls.getItem(layer.t3s);
                            if (dn3) {
                                var m2 = dn3.indexOf(":memo:") + 6;
                                var s12 = dn3.indexOf(":score:") + 7;
                                var d12 = dn3.indexOf(":date:");
                                var pswd = dn3.slice(10, s12 - 7).trim();
                                layer.ks2 = dn3.slice(s12, d12);
                                layer.kd2 = dn3.slice(d12 + 6, m2 - 6);

                                if (layer.t5s == pswd) {
                                    layer.t1String = "NAME : " + layer.t3s + "      SCORE : " + layer.ks2 + "      DATE : " + layer.kd2;
                                    layer.t1.setString(layer.t1String);
                                    layer.tString = "WELCOME "+layer.t3s+" GOOD LUCK FOR YOU !";
                                    layer.title.setString(layer.tString);
                                } else {
                                    layer.tString = layer.t3s+" FORGOT YOUR PASSWORD ?";
                                    layer.title.setString(layer.tString);

                                }

                            } else {
                                layer.tString = "WELCOME NEW PLAYER " + layer.t3s;
                                layer.title.setString(layer.tString);
                                // **** get date *****
                                 var y = layer.d.getFullYear();
                                 var m = Number(layer.d.getMonth())+1;
                                 var d = layer.d.getDate();
                                 layer.date = y+"/"+m+"/"+d;
                                 cc.log("DATE = "+layer.date);
                                var lsString = ":password:"+layer.t5s+":score:0:date:"+layer.date+":memo:"+layer.t3s;
                                layer.ls.setItem(layer.t3s,lsString);

                            }
                            layer.isFlipX = !layer.isFlipX;
                            layer.NodeGrid(250, 500);
                        }

                        //    layer.ls.setItem(layer.nameString,":password:1234567890:score:200:date:2017/06/20:memo:FRANK HAN");
                        // cc.log("name : "+layer.nameString);
                        // cc.log("description : "+layer.ls.getItem(layer.nameString));
                        // var p1 = description.indexOf(":password:")+10;
                        // var p2 = description.indexOf(":score:");
                        // var pswd = description.slice(p1,p2);
                        // cc.log("p1 = "+p1+" p2 = "+p2+" password : "+pswd);
                        //   this.ls.setItem("KING","P@ssw0rd 800 2017/06/20 FRANKHAN");
                        //    cc.log("Name = "+this.ls.getItem("name"));
                        break;
                    case keyCode:
                        if (layer.isFlipX) {
                            layer.t3s = layer.t3s + layer.kb[keyCode];
                            layer.t3.setString(layer.t3s);
                        } else {
                            layer.t5s = layer.t5s + layer.kb[keyCode];
                            layer.t5.setString(layer.t5s);
                        }
                        break;
                }
            }
        }, this);
    },

    play: function () {
        if (this.t5s) {
            if ((this.keyCode == 9)  |  (this.keyCode == 13 ) | (this.keyCode == 39 )) {
                cc.director.pushScene(new Play01Scene(this.kn, this.ks, this.kd, this.t3s, this.t5s, this.ks2, this.kd2, this.data)); //場景切換 Test1Scene
            }
        }
    },
    setting: function () {
        if (this.t5s) {
            if ((this.keyCode == 9) | (this.keyCode == 13 ) | (this.keyCode == 39 )) {
                cc.director.pushScene(new SettingScene(this.kn, this.ks, this.kd, this.t3s, this.t5s, this.ks2, this.kd2, this.data)); //場景切換+變數傳遞test2Scene
            }
        }        },

    NodeGrid: function (a, b) {
        var nodeGrid = new cc.NodeGrid();
        this.addChild(nodeGrid);

        var bfly = new cc.Sprite(res.bfly);
        bfly.attr({
            x: a,
            y: b
        });
        bfly.scaleX = 0.3;
        bfly.scaleY = 0.3;
        nodeGrid.addChild(bfly, 0);

        var sbfly = bfly.getContentSize();   // return sprite size
        var shak = new cc.Shaky3D(10, sbfly, 5, false);
        nodeGrid.runAction(shak);
    }
});

var MainmenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
        this.focused = true;
    }
});

