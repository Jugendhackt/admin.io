var names = ["Webseite", "Terminal", "Daten", "Cloud", "Internet", "Gameserver", "Kundendaten", "Telefonserver", "Backups", "E-Mail"];

const ServerStatus = {
    STOPPED: 0,
    STARTING: 1,
    STARTED: 2,
    STOPPING: 3,
    CRASHED: 4,
    INFESTED: 5
};

class File {
    constructor(name, virus, deletable) {
        this.name = name;
        this.virus = virus;
        this.deletable = deletable;
    }

    isDeletable() {
        return this.deletable;
    }

    isVirus() {
        return this.virus;
    }

    getName() {
        return this.name;
    }
}

var default_files = [];
default_files[0] = new File("system", false, false);
default_files[1] = new File("terminal.exe", false, true);
default_files[2] = new File("paint.exe", false, true);
default_files[3] = new File("windoof.exe", false, false);
default_files[4] = new File("ntkernel.exe", false, false);
default_files[5] = new File("explorer.exe", false, false);
default_files[6] = new File("music.exe", false, true);
default_files[7] = new File("audio.exe", false, true);

var viruses = [];
viruses[0] = new File("virus.exe", true, true);
viruses[1] = new File("meterpreter.exe", true, true);
viruses[2] = new File("chip_installer.exe", true, true);
viruses[3] = new File("bugofen.exe", true, true);
viruses[4] = new File("internet_exploder.exe", true, true);
viruses[5] = new File("feedbackhub.exe", true, true);
viruses[6] = new File("memz.exe", true, true);
viruses[7] = new File("wannacry.exe", true, true);
viruses[8] = new File("petya.exe", true, true);
viruses[9] = new File("notpetya.exe", true, true);
viruses[10] = new File("membership.exe", true, true);
viruses[11] = new File("goodasnew.exe", true, true);
viruses[12] = new File("computerrona.exe", true, true);
viruses[13] = new File("infinity.exe", true, true);
viruses[14] = new File("exe.exe", true, true);
viruses[15] = new File("wlanpassword.bat", true, true);


var random_files = [];
random_files[0] = new File("editor", false, true);
random_files[1] = new File("paint.exe", false, true);
random_files[2] = new File("spotify.exe", false, true);
random_files[3] = new File("youtube.exe", false, true);
random_files[4] = new File("firefox.exe", false, true);
random_files[5] = new File("chrome.exe", false, true);
random_files[6] = new File("opera.exe", false, true);
random_files[7] = new File("notes.exe", false, true);
random_files[8] = new File("vlc.exe", false, true);
random_files[9] = new File("iexplorer.exe", false, true);
random_files[10] = new File("math.exe", false, true);
random_files[11] = new File("wordpad.exe", false, true);
random_files[12] = new File("media-player.exe", false, true);
random_files[13] = new File("printer.exe", false, true);
random_files[14] = new File("editor.exe", false, true);
random_files[15] = new File("notepad++.exe", false, true);
random_files[16] = new File("csgo.exe", false, true);
random_files[17] = new File("cmd.exe", false, true);
random_files[18] = new File("ksysguard.exe", false, true);
random_files[19] = new File("snipping-tool.exe", false, true);
random_files[20] = new File("xbox.exe", false, true);
random_files[21] = new File("memehub.exe", false, true);
random_files[22] = new File("steam.exe", false, true);
random_files[23] = new File("minecraftserver.jar", false, true);
random_files[24] = new File("minecrat.exe", false, true);
random_files[25] = new File("admin.io", false, true);
random_files[26] = new File("jugenthackt.exe", false, false);
random_files[27] = new File("powerpoint.exe", false, true);
random_files[28] = new File("word.exe", false, true);
random_files[29] = new File("excel.exe", false, true);
random_files[30] = new File("onenote.exe", false, true);


function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

class Server {
    constructor(id, name) {
        this.infected = 0;
        this.id = id;
        this.status = ServerStatus.STARTED;
        this.name = name;
        this.files = default_files;
        for (var i = 0; i < Math.random() * 5; i++) {
            this.files.push(random_files[Math.round(Math.random() * random_files.length)]);
        }
    }

    getID() {
        return this.id;
    }

    getFiles() {
        var ret = "";
        this.files.forEach(function (file) {
            if (file != "undefined")
                ret += file.getName() + ",";
        });
        return ret;
    }

    getRawFiles() {
        return this.files;
    }

    getStatusString() {
        switch (this.status) {
            case ServerStatus.STOPPED:
                return "Gestoppt";
            case ServerStatus.STARTING:
                return "Startet...";
            case ServerStatus.STARTED:
                return "Gestartet";
            case ServerStatus.STOPPING:
                return "Stoppt...";
            case ServerStatus.CRASHED:
                return "Gecrasht";
            case ServerStatus.INFESTED:
                return "Infiziert";
        }
    }

    checkHTML() {
        //dirty way
        var html = "";
        var id = this.id;
        $(".single-server").each(function (index) {
            if (index === id) {
                html = this;
            }
        });
        this.html = html;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
        $(this.html).children(".server-status").text(this.getStatusString());

    }

    shutdown() {
        this.setStatus(ServerStatus.STOPPING);
        $(this.html).children(".server-actions").children(".server-actions-shutdown").prop('disabled', true);
        $(this.html).children(".server-actions").children(".server-actions-terminal").prop('disabled', true);
        var server = this;

        setTimeout(function () {
            $(server.html).children(".server-actions").children(".server-actions-start").prop('disabled', false);
            server.setStatus(ServerStatus.STOPPED);
        }, 5000);
    }

    start() {
        this.setStatus(ServerStatus.STARTING);
        $(this.html).children(".server-actions").children(".server-actions-start").prop('disabled', true);
        var server = this;
        setTimeout(function () {
            $(server.html).children(".server-actions").children(".server-actions-shutdown").prop('disabled', false);
            $(server.html).children(".server-actions").children(".server-actions-terminal").prop('disabled', false);
            server.setStatus(ServerStatus.STARTED);
            if (server.infected === 5) {
                server.setStatus(ServerStatus.INFESTED);
                $.growl.warning({message: "Einer deiner Server ist immer noch infiziert!"});
            }
        }, 5000);
    }

    getName() {
        return this.name;
    }

    getPing() {
        if (this.status === ServerStatus.STOPPED || this.status === ServerStatus.CRASHED || this.status === ServerStatus.STARTING)
            return "-";
        switch (this.infected) {
            case 0:
            case 1:
            case 2: {
                //normal
                return Math.round(Math.random() * 10 + 1) + "ms";
            }
            case 3: {
                //minimal
                return Math.round(Math.random() * 50 + 10) + "ms";
            }
            case 4: {
                //attack is running, minimal higher
                return Math.round(Math.random() * 100 + 50) + "ms";
            }
            case 5: {
                //big attack, responses slow
                return Math.round(Math.random() * 1000 + 300) + "ms";
            }
        }
    }

    getUsage() {
        if (this.status === ServerStatus.STOPPED || this.status === ServerStatus.CRASHED || this.status === ServerStatus.STARTING)
            return "-";
        if (this.infected > 0) {
            switch (this.infected) {
                case 1: {
                    //idle
                    return Math.round(Math.random() * 20 + 20) + "%";
                }
                case 2: {
                    //normal
                    return Math.round(Math.random() * 20 + 30) + "%";
                }
                case 3: {
                    //minimal attack
                    return Math.round(Math.random() * 20 + 50) + "%";
                }
                case 4: {
                    //attack / heavy load
                    return Math.round(Math.random() * 20 + 80) + "%";
                }
                case 5: {
                    //attack / max load
                    return "100%";
                }
            }
        }
        //not infested
        return Math.round(Math.random() * 20) + "%";
    }

    setInfectionLevel(lvl) {
        console.log("InfectionLevel changed:" + this.getID() + ": " + this.infected + " => " + lvl);
        if (lvl === 5) {
            this.setStatus(ServerStatus.INFESTED);
            $.growl.warning({message: "Einer deiner Server ist zu 100% infiziert!"});
        } else
            this.setStatus(ServerStatus.STARTED);

        if (lvl !== 0) {
            var virus_loaded = false;
            for (var ii = 0; ii < this.files.length; ii++) {
                if (this.files[ii].isVirus()) {
                    virus_loaded = true;
                }
            }
            if (!virus_loaded) {
                this.files.push(viruses[Math.round(Math.random() * viruses.length)]);
                this.files = shuffle(this.files);
            }
        } else {
            for (var i2 = 0; i2 < this.files.length; i2++) {
                if (this.files[i2].isVirus()) {
                    this.files.splice(i2, 1);
                    this.files = shuffle(this.files);
                }
            }
        }
        this.infected = lvl;

    }

    getInfectionLevel() {
        return this.infected;
    }
}

var servers = [];

function addServer() {
    addServerWithType(Math.floor(Math.random() * names.length));
}

function addServerWithType(type) {
    if (servers.length >= 100)
        return;
    servers[servers.length] = new Server(servers.length, names[type]);
    var row = document.getElementById("dashboard-servers").insertRow(servers.length);
    row.classList.add("single-server");
    var cell = row.insertCell(0);
    cell.innerText = servers.length;
    cell.classList.add("server-id");

    cell = row.insertCell(1);
    cell.innerText = servers[servers.length - 1].getName();
    cell.classList.add("server-name");
    cell = row.insertCell(2);
    cell.innerText = servers[servers.length - 1].getUsage();
    cell.classList.add("server-usage");
    cell = row.insertCell(3);
    cell.innerText = servers[servers.length - 1].getPing();
    cell.classList.add("server-ping");
    cell = row.insertCell(4);
    cell.innerHTML = '<td class="server-actions"><button class="server-button btn-danger btn server-actions-shutdown" onclick="servers[' + (servers.length - 1) + '].shutdown();">Herunterfahren</button><button disabled class="server-button btn-success btn server-actions-start" onclick="servers[' + (servers.length - 1) + '].start();">Starten</button><button onclick="showTerminal(' + (servers.length - 1) + ');" class="server-button btn-primary btn server-actions-terminal">Terminal</button></td>';
    cell.classList.add("server-actions");
    servers[servers.length - 1].checkHTML();
    cell = row.insertCell(5);
    cell.innerText = servers[servers.length - 1].getStatusString();
    cell.classList.add("server-status");

}

//refresh values
window.setInterval(function () {
    $(".single-server").each(function (index) {
        $(this).children(".server-usage").text(servers[index].getUsage());
        $(this).children(".server-ping").text(servers[index].getPing());
    });
}, 1000);


var users = 200;

//now users
function hasUsers(u) {
    return users >= u;
}

function addUsers(u) {
    users += u;
    document.getElementById("user-box").innerText = users;
    return true;
}

function removeUsers(u) {
    if (!hasUsers(u)) {
        clearUsers();
        return false;
    }
    users -= u;
    document.getElementById("user-box").innerText = users;

    return true;
}

function clearUsers() {
    users = 0;
    document.getElementById("user-box").innerText = users;
    return true;
}

//init
addServer();

var price = 300;

displayPrice();


function buyServer() {
    if (servers.length === 9) {
        $.growl.notice({message: "Herzlichen Glückwunsch!<br>Du hast 10 Server!<brGewonnen!>"});
    }

    if (servers.length >= 100) {
        $.growl.warning({message: "Du hast bereits die Maximale Anzahl von Servern"});
        $('#what-server-buy-modal').modal('hide');
        return false;
    }
    if (hasUsers(price)) {
        $.growl.notice({message: "Ein Server wurde gekauft"});
        addServerWithType(document.getElementById("buy_type").value);
        price *= 2;
        displayPrice();
        //buy
    } else {
        //no money
        $.growl.error({message: "Zu viele Server sind zu teuer. Du brauchst mehr Benutzer!"});
    }
    $('#what-server-buy-modal').modal('hide');
}

function displayPrice() {
    var priceSpan = document.getElementById("price");
    priceSpan.innerText = price;
}

window.onbeforeunload = function () {
    return 'Wenn du diese Seite verlässt, ist dein Spielstand verloren!';
};


//generate money
var money_interval = window.setInterval(function () {
    var online = 0;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].status === ServerStatus.STARTED) {
            addUsers(2);
            online++;
        } else if (servers[i].status === ServerStatus.INFESTED) {
            if (!removeUsers(5))
                clearUsers();
        }
    }
    if (online === 0) {
        //no servers?
        removeUsers(10);
    }
    if (users === 0) {
        //game over

        $.growl.error({message: "Du hast keine Kunden mehr!<br>Game Over"});
        window.clearInterval(money_interval);
        $('#game-over').modal('show');
        $('#what-server-buy-modal').modal('hide');
        $('#terminalModal').modal('hide');


    }
}, 1000);

function showTerminal(server) {
    $("#terminalModal").modal('show');
    document.getElementById("server_name").value = servers[server].getName() + " #" + (servers[server].getID() + 1);
    var $ptty = $('#terminal').Ptty({
        ps: '$>',
        theme: 'boring',
        i18n: {
            welcome: 'Welcome to Ubuntu Focal Fossa (development branch) (GNU/Linux 5.5.2-050502-generic x86_64)<br>' +
                ' * Documentation:  https://help.ubuntu.com<br>' +
                ' * Management:     https://landscape.canonical.com<br>' +
                ' * Support:        https://ubuntu.com/advantage<br>' +
                'Type <b>help</b> to list the available commands.<br>',
            error_not_found: 'Befehl nicht gefunden!',
        }
    });
    $ptty.register('command', {
        name: 'help',
        method: function (cmd) {
            var last = $ptty.get_command_option('last');
            var args = last.split(' ');
            if (args.length === 2) {
                switch (args[1]) {
                    case "rm":
                        //delete
                        cmd = "rm <Datei name>: Löscht die angegebene Datei";
                        break;
                    case "ls":
                        //listen
                        cmd = "ls: Gibt alle Dateien zurück";
                        break;
                    case "check":
                        //listen
                        cmd = "check <Datei name>: Überprüft die Datei auf Viren";
                        break;
                    case "help":
                        //help
                        cmd = "help: Zeigt diese Hilfe";
                        break;
                    default:
                        cmd = "Unbekannter Befehl!";
                        break;
                }
            } else {
                cmd = "Benutze help [command] um weitere Informationen zu bekommen<br>Verfügbare Befehle: rm, ls, check";
            }
            return {out: cmd};

        },
        help: 'Gibt die Hilfe zurück'
    });
    $ptty.register('command', {
        name: 'ls',
        method: function (cmd) {
            cmd = servers[server].getFiles();
            return {out: cmd};

        },
        help: 'Gibt die Hilfe zurück'
    });
    $ptty.register('command', {
        name: 'check',
        method: function (cmd) {
            var last = $ptty.get_command_option('last');
            var args = last.split(' ');
            if (args.length !== 2) {
                return {out: "Benutzung: check <Datei name>"};
            }

            for (var i = 0; i < servers[server].getRawFiles().length; i++) {
                if (servers[server].getRawFiles()[i].getName().toUpperCase() === args[1].toUpperCase()) {
                    if (servers[server].getRawFiles()[i].isVirus())
                        return {out: servers[server].getRawFiles()[i].getName() + ": Virus gefunden!"};
                    return {out: servers[server].getRawFiles()[i].getName() + ": Datei ist sicher!"};
                }
            }
            return {out: "Datei nicht gefunden!"};

        },
        help: 'Gibt die Hilfe zurück'
    });

    $ptty.register('command', {
        name: 'rm',
        method: function (cmd) {
            var last = $ptty.get_command_option('last');
            var args = last.split(' ');
            if (args.length !== 2) {
                return {out: "Benutzung: rm <Datei name>"};
            }

            for (var i = 0; i < servers[server].getRawFiles().length; i++) {
                if (servers[server].files[i].getName().toUpperCase() === args[1].toUpperCase()) {
                    if (servers[server].files[i].isDeletable()) {
                        servers[server].files.splice(i, 1);
                        servers[server].setInfectionLevel(0);
                        removeUsers(1);
                        return {out: args[1] + ": Datei gelöscht!"};
                    }
                    return {out: servers[server].getRawFiles()[i].getName() + ": Diese Datei kann nicht gelöscht werden!"};
                }
            }
            return {out: "Datei nicht gefunden!"};

        },
        help: 'Gibt die Hilfe zurück'
    });
}

setTimeout(function () {
    console.log("Hacking...");
    setInterval(function () {
        for (var i = 0; i < servers.length; i++) {
            if (servers[i].getInfectionLevel() === 4) {
                //higher
                servers[i].setInfectionLevel(5);
                continue;
            }
            if (servers[i].getInfectionLevel() === 5) {
                continue;
            }
            //10% chance for infection
            if (Math.random() < 0.2) {
                //higer level
                servers[i].setInfectionLevel(servers[i].getInfectionLevel() + 1);
            } else if (Math.random() < 0.1 && servers[i].getInfectionLevel() > 0) {
                //5% of lowering it
                servers[i].setInfectionLevel(servers[i].getInfectionLevel() - 1);
            }
        }
    }, 1500);
}, 10000);


