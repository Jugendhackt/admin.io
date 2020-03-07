class Server {
    constructor(id) {
        this.infected = 0;
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

var servers = [new Server(1)];

