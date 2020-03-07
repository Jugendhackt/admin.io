var names = ["Webseite", "Terminal", "Daten", "Cloud", "Internet", "Gameserver", "Kundendaten", "Telefonserver", "Backups"];

class Server {
    constructor(id) {
        this.infected = 0;
        this.name = names[Math.floor(Math.random() * names.length)];
    }

    getName() {
        return this.name;
    }

    getUsage() {
        if (this.infected > 0) {
            switch (this.infected) {
                case 1: {
                    //low
                    return Math.round(Math.random() * 20 + 20) + "%";
                }
                case 2: {
                    //low
                    return Math.round(Math.random() * 20 + 30) + "%";
                }
                case 3: {
                    //low
                    return Math.round(Math.random() * 20 + 50) + "%";
                }
                case 4: {
                    //low
                    return Math.round(Math.random() * 20 + 80) + "%";
                }
                case 5: {
                    //low
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
    cell.innerText = "123ms";
    cell.classList.add("server-ping");
    cell = row.insertCell(4);
    cell.innerHTML = '<td class="server-actions"><button class="server-button btn-danger btn server-actions-shutdown" onclick="this.disabled = true;">Herunterfahren</button><button class="server-button btn-success btn server-actions-start">Starten</button><button class="server-button btn-primary btn server-actions-start">Terminal</button></td>';
    cell.classList.add("server-actions");

}

window.setInterval(function () {
    $(".single-server").each(function (index) {
        $(this).children(".server-usage").text(servers[index].getUsage());
    });
}, 1000);


//init
addServer();