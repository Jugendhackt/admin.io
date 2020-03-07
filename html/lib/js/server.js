var names = ["Webseite", "Terminal", "Daten", "Cloud", "Internet", "Gameserver", "Kundendaten", "Telefonserver", "Backups"];

class Server {
    constructor(id) {
        this.infected = 0;
        this.name = names[Math.floor(Math.random() * names.length)];
    }

    getName() {
        return this.name;
    }

    getPing() {
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

function addServer() {
    servers[servers.length] = new Server(servers.length);
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
    cell.innerHTML = '<td class="server-actions"><button class="server-button btn-danger btn server-actions-shutdown" onclick="this.disabled = true;">Herunterfahren</button><button disabled class="server-button btn-success disabled btn server-actions-start">Starten</button><button class="server-button btn-primary btn server-actions-start">Terminal</button></td>';
    cell.classList.add("server-actions");

}

//refresh values
window.setInterval(function () {
    $(".single-server").each(function (index) {
        $(this).children(".server-usage").text(servers[index].getUsage());
        $(this).children(".server-ping").text(servers[index].getPing());
    });
}, 1000);


//init
addServer();