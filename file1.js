"use strict";
var pool = null;
API.onServerEventTrigger.connect(function (eventName, args) {
    if (eventName == "dealerMenu") {
        pool = API.getMenuPool();
        let menu = API.createMenu("Dealer Choice - ", 0, 0, 6);
        API.setMenuTitle(menu, "Dealer");
        let item1 = API.createMenuItem("Deal to Player", "NOT WORKING CORRECTLY, USE COMMANDS.");
        let item2 = API.createMenuItem("Invite Player", "NOT WORKING CORRECTLY, USE COMMANDS!");
        let item3 = API.createMenuItem("Shuffle", "Bring back all the cards into the deck.");
        let item4 = API.createMenuItem("Reveal", "Reveal all players hands!");
        item1.Activated.connect(function (menu, item) {
            API.triggerServerEvent("dealList");
            menu.Visible = false;
        });
        item2.Activated.connect(function (menu, item) {
            API.triggerServerEvent("inviteList");
            menu.Visible = false;
        });
        item3.Activated.connect(function (menu, item) {
            API.triggerServerEvent("shuffle");
            menu.Visible = false;
        });
        item4.Activated.connect(function (menu, item) {
            API.triggerServerEvent("revealCards");
            menu.Visible = false;
        });
        menu.AddItem(item1);
        menu.AddItem(item2);
        menu.AddItem(item3);
        menu.AddItem(item4);
        pool.Add(menu);
        API.setMenuBannerRectangle(menu, 100, 0, 0, 255);
        menu.Visible = true;
    }
    else if (eventName == "listedPlayers") {
        pool = API.getMenuPool();
        let menu1 = API.createMenu("Player List - ", 0, 0, 6);
        API.setMenuTitle(menu1, "Dealer");
        let list = args[0];
        for (var p in list) {
            let item = API.createMenuItem(p, " Choose a player.");
            item.Activated.connect(function (menu1, item) {
                API.triggerServerEvent("dealCard", p);
            });
            menu1.AddItem(item);
        }
        pool.Add(menu1);
        API.setMenuBannerRectangle(menu1, 100, 0, 0, 255);
        menu1.Visible = true;
    }
    else if (eventName == "possiblePlayers") {
        pool = API.getMenuPool();
        let menu2 = API.createMenu("Player List - ", 0, 0, 6);
        API.setMenuTitle(menu2, "Dealer");
        for (var p in API.getAllPlayers()) {
            let item = API.createMenuItem(p.toString(), " Choose a player to invite to the game.");
            item.Activated.connect(function (menu1, item) {
                API.triggerServerEvent("sendInvite", p);
            });
            menu2.AddItem(item);
        }
        pool.Add(menu2);
        API.setMenuBannerRectangle(menu2, 100, 0, 0, 255);
        menu2.Visible = true;
    }
    else if (eventName == "invite") {
        pool = API.getMenuPool();
        let menu = API.createMenu("Invite Alert! - ", 0, 0, 6);
        API.setMenuTitle(menu, "Invite Recieved ");
        let item1 = API.createMenuItem("Accept", "Accept the invite");
        let item2 = API.createMenuItem("Decline", "Decline the invite.");
        item1.Activated.connect(function (menu, item) {
            API.triggerServerEvent("invite", true, args[0]);
            menu.Visible = false;
        });
        item2.Activated.connect(function (menu, item) {
            API.triggerServerEvent("invite", false, args[0]);
            menu.Visible = false;
        });
        pool.Add(menu);
        menu.AddItem(item1);
        menu.AddItem(item2);
        API.setMenuBannerRectangle(menu, 100, 0, 0, 255);
        menu.Visible = true;
    }
    else if (eventName == "playerMenu") {
        pool = API.getMenuPool();
        let menu = API.createMenu("Player Menu - ", 0, 0, 6);
        API.setMenuTitle(menu, "Player");
        let item1 = API.createMenuItem("Peek at Cards", "Have a glance at your cards.");
        let item2 = API.createMenuItem("Leave the game", "Throw away your cards, leave the game.");
        item1.Activated.connect(function (menu, item) {
            API.triggerServerEvent("peek");
            menu.Visible = false;
        });
        item2.Activated.connect(function (menu, item) {
            API.triggerServerEvent("leave");
            menu.Visible = false;
        });
        pool.Add(menu);
        menu.AddItem(item1);
        menu.AddItem(item2);
        API.setMenuBannerRectangle(menu, 100, 0, 0, 255);
        menu.Visible = true;
    }
});
API.onUpdate.connect(function () {
    if (pool != null) {
        pool.ProcessMenus();
    }
});
