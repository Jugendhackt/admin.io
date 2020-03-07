var names = ["Webseite", "Terminal", "Daten", "Cloud", "Internet", "Gameserver", "Kundendaten", "Telefonserver", "Backups"];

const ServerStatus = {
    STOPPED: 0,
    STARTING: 1,
    STARTED: 2,
    STOPPING: 2,
    CRASHED: 3,
    INFESTED: 4
};

class Server {
    constructor(id, name) {
        this.infected = 0;
        this.id = id;
        this.status = ServerStatus.STOPPED;
        this.name = name;
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
        this.infected = lvl;

    }
}

var servers = [];


function addServer(type) {
    if (type == null)
        servers[servers.length] = new Server(servers.length, names[Math.floor(Math.random() * names.length)]);
    else
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
    cell.innerHTML = '<td class="server-actions"><button disabled class="server-button btn-danger btn server-actions-shutdown" onclick="servers[' + (servers.length - 1) + '].shutdown();">Herunterfahren</button><button class="server-button btn-success btn server-actions-start" onclick="servers[' + (servers.length - 1) + '].start();">Starten</button><button class="server-button disabled btn-primary btn server-actions-terminal">Terminal</button></td>';
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


var money = 0;

function hasMoney(m) {
    return money >= m;
}

function addMoney(m) {
    money += m;
    document.getElementById("money-box").innerText = money;
    return true;
}

function removeMoney(m) {
    if (!hasMoney(m)) {
        return false;
    }
    money = money - m;
    document.getElementById("money-box").innerText = money;
    return true;
}

//init
addServer();


function buyServer() {
    if (removeMoney(100)) {
        $.growl.notice({message: "Ein Server wurde gekauft"});
        addServer();
        //buy
    } else {
        //no money
        $.growl.error({message: "Du hast nicht genug Geld!"});
    }
    $('#what-server-buy-modal').modal('hide');
}