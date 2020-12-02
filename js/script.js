let maxOvers = 20,
    inning = 0,
    inningsOneScore = 0,
    teams = {},
    batTeam, bowlTeam, striker, nonStriker, curBowler, bowlers = [],
    overs = 0,
    upDivOne, upDivTwo, upBatsone, upBatstwo, upOvers, upPp, upBowlTeam, upBatTeam, upScore, upCrr, upInfo, upBowler, upProjScore, upMsg,
    indiaPlayers = [
        ["Rohit Sharma", 1, 1],
        ["Lokesh Rahul", 1, 1],
        ["Virat Kohli", 1, 5],
        ["Rishab Pant", 2, 1],
        ["Hardik Pandya", 1, 3],
        ["MS Dhoni", 1, 4],
        ["Dinesh Karthick", 1, 1],
        ["Bhuvneshwar Kumar", 1, 2],
        ["Ravindra Jadeja", 2, 3],
        ["Yuzvendra Chahal", 1, 2],
        ["Jasprit Bumrah", 1, 2]
    ],
    ausPlayers = [
        ["David Warner", 2, 1],
        ["Aaron Finch", 1, 1],
        ["Usman Khawaja", 2, 1],
        ["Steven Smith", 1, 5],
        ["Glenn Maxwell", 1, 3],
        ["Marcus Stoinis", 1, 3],
        ["Alex Carey", 2, 4],
        ["Pat Cummins", 1, 2],
        ["Jason Behrend", 1, 2],
        ["Nathon Lyon", 2, 2],
        ["Mitchell Starc", 2, 2]
    ];
document.getElementById("head").addEventListener("click", function() {
    toss(0);
});
document.getElementById("tail").addEventListener("click", function() {
    toss(1);
});
document.getElementById("bat").addEventListener("click", function() {
    setTeam(true, true);
});
document.getElementById("bowl").addEventListener("click", function() {
    setTeam(false, true);
});
document.getElementById("letsplaywon").addEventListener("click", function() {
    startMatch(".tosswon");
});
document.getElementById("letsplaylost").addEventListener("click", function() {
    startMatch(".tosslost");
});

function toss(choice) {
    let t = Math.floor(Math.random() * 2);
    if (t == choice) {
        document.querySelector(".toss").classList.add("hidden");
        document.querySelector(".tosswon").classList.remove("hidden");
    } else {
        document.querySelector(".toss").classList.add("hidden");
        document.querySelector(".tosslost").classList.remove("hidden");
        if (Math.floor(Math.random() * 2)) {
            document.querySelector(".choice").innerHTML = "Bat";
            setTeam(false, false);

        } else {
            document.querySelector(".choice").innerHTML = "Bowl";
            setTeam(true, false);
        }
    }
}

function setTeam(choice, toss) {
    teams[0] = new Teams("India", toss, choice);
    setPlayers(indiaPlayers, teams[0]);
    teams[1] = new Teams("Australia", !toss, !choice);
    setPlayers(ausPlayers, teams[1]);
    if (choice) {
        batTeam = teams[0];
        bowlTeam = teams[1];
        document.querySelector(".decision").innerHTML = "and decided to Bat first";
    } else {
        batTeam = teams[1];
        bowlTeam = teams[0];
        document.querySelector(".decision").innerHTML = "and decided to Bowl first";
    }
    if (toss) {
        document.querySelector(".tosswon .flex").classList.add("hidden");
        document.getElementById("letsplaywon").classList.remove("hidden");
    }
    setCurPlayers();
}

function setPlayers(arr, team) {
    for (let i = 0; i < arr.length; i++) {
        team.players[i] = new Player(arr[i][0], arr[i][1], arr[i][2]);
    }
}

function setCurPlayers() {
    striker = batTeam.players[0];
    nonStriker = batTeam.players[1];
    curBowler = bowlTeam.players[10];
    bowlers = [];
    let j = 0;
    for (let i = 0; i < bowlTeam.players.length; i++) {
        if (bowlTeam.players[i].bowl == true) {
            bowlers[j] = bowlTeam.players[i];
            j++;
        }
    }
}

function startMatch(clas) {
    document.querySelector(clas).classList.add("hidden");
    document.querySelector(".match").classList.remove("hidden");
    document.querySelector(".msg").classList.remove("hidden");
    fetchElements();
    resetScreen();
    document.getElementById("bowlBtn").addEventListener("click", function() {
        if (inning == 0) {
            inningsOne();
        } else {
            inningsTwo();
        }
    });
}

function fetchElements() {
    let ups = document.querySelectorAll(".update");
    upBatsone = ups[0].querySelectorAll("*");
    upBatstwo = ups[1].querySelectorAll("*");
    upOvers = ups[2];
    upPp = ups[3];
    upBowlTeam = ups[4];
    upBatTeam = ups[5];
    upScore = ups[6];
    upCrr = ups[7];
    upInfo = ups[8];
    upBowler = ups[9].querySelectorAll("*");
    upProjScore = ups[10];
    upMsg = ups[11];
}

function resetScreen() {
    let tossup = document.querySelectorAll(".tossupdate")
    if (batTeam.toss) {
        tossup[0].innerHTML = batTeam.name;
        tossup[1].innerHTML = "Bat";
    } else {
        tossup[0].innerHTML = bowlTeam.name;
        tossup[1].innerHTML = "Bowl";
    }
    if (batTeam.name == "India") {
        upBatTeam.innerHTML = "IND";
        upBowlTeam.innerHTML = "AUS";
    } else {
        upBatTeam.innerHTML = "AUS";
        upBowlTeam.innerHTML = "IND";
    }
    upScore.innerHTML = "0-0";
    upPp.innerHTML = "P1";
    upOvers.innerHTML = "0.0";
    upCrr.innerHTML = "0.00";
    upBatsone[0].classList.remove("hide");
    upBatsone[1].innerHTML = playerName(striker.name);
    upDivOne = striker;
    upDivTwo = nonStriker;
    upBatsone[2].innerHTML = "0";
    upBatsone[3].innerHTML = "0";
    upBatstwo[0].classList.add("hide");
    upBatstwo[1].innerHTML = playerName(nonStriker.name);
    upBatstwo[2].innerHTML = "0";
    upBatstwo[3].innerHTML = "0";
    upBowler[0].innerHTML = playerName(curBowler.name);
    upBowler[1].innerHTML = "0-0";
    upBowler[2].innerHTML = "0.0";
    if (inning == 0) {
        upProjScore.innerHTML = "Projected : 300";
    } else {
        upProjScore.innerHTML = "Target : " + (inningsOneScore + 1);
        document.querySelector(".infoone").classList.add("hidden");
        document.querySelector(".info").classList.remove("hidden");
        let need = document.querySelectorAll(".info span");
        need[0].innerHTML = inningsOneScore + 1;
        need[1].innerHTML = maxOvers;
    }
    upMsg.innerHTML = "-";
}

function playerName(player) {
    let name = player.charAt(0);
    name += player.slice(player.search(" "));
    return name;
}

///------------------
function ballBowled() {
    let ret = runsScored();
    if (ret[0]) {
        if (ret[1]) {
            addRuns(ret[1]);
        }
        if (batTeam.overs % 1 < 0.5) {
            overs += 0.1;
            let temp = Number(curBowler.overs) + 0.1;
            curBowler.overs = Number(temp.toFixed(1));
        } else {
            overs += 0.5;
            let temp = Number(curBowler.overs) + 0.5;
            curBowler.overs = Number(temp.toFixed(1));
            setBowler();
        }
        batTeam.overs = Number(overs.toFixed(1));
    }
    statsUpdate();
}


function runsScored() {
    let cRun = Math.floor(Math.random() * 10);
    switch (cRun) {
        case 0:
            upMsg.innerHTML = "0";
            return [true, "dot"];
        case 1:
            upMsg.innerHTML = "1";
            return [true, 1];
        case 2:
            upMsg.innerHTML = "2";
            return [true, 2];
        case 3:
            upMsg.innerHTML = "3";
            return [true, 3];
        case 4:
            striker.four++;
            upMsg.innerHTML = "4";
            return [true, 4];
        case 5:
            upMsg.innerHTML = "5";
            return [true, 5];
        case 6:
            striker.six++;
            upMsg.innerHTML = "6";
            return [true, 6];
        case 7:
            wicket();
            upMsg.innerHTML = "Out";
            return [true, false];
        case 8:
            batTeam.wides++;
            batTeam.runs++;
            curBowler.wides++;
            curBowler.runsConcd++;
            upMsg.innerHTML = "Wide";
            console.log("Wide");
            return [false, false];
        case 9:
            batTeam.noBalls++;
            batTeam.runs++;
            curBowler.noBalls++;
            curBowler.runsConcd++;
            upMsg.innerHTML = "No Ball";
            console.log("NoBall");
            return [false, false];
    }
}

function addRuns(run) {
    if (run == "dot") {
        run = 0
    }
    striker.runs += run;
    striker.ballsFaced += 1;
    curBowler.runsConcd += run;
    batTeam.runs += run;
    if (run % 2 != 0) {
        changeStricker();
    }
    if (batTeam.overs % 1 == 0) {
        changeStricker();
    }
}

function changeStricker() {
    let temp = striker;
    striker = nonStriker;
    nonStriker = temp;
    if (upBatsone[0].classList.contains("hide")) {
        upBatsone[0].classList.remove("hide");
        upBatstwo[0].classList.add("hide");
    } else {
        upBatsone[0].classList.add("hide");
        upBatstwo[0].classList.remove("hide");
    }
}

function setBowler() {
    for (let i = 0; i < bowlers.length; i++) {
        if (bowlers[i].overs == maxOvers / 5) {
            bowlers.splice(i, 1);
        }
    }
    let prevBowler = curBowler;
    while (prevBowler == curBowler) {
        curBowler = bowlers[Math.floor(Math.random() * bowlers.length)];
    }
}

function wicket() {
    batTeam.wickets++;
    curBowler.wickets++;
    striker.ballsFaced += 1;
    striker.fow = batTeam.runs + "/" + batTeam.wickets;
    if (batTeam.wickets < 10) {
        if (striker.name == upDivOne.name) {
            striker = batTeam.players[batTeam.wickets + 1];
            upDivOne = striker;
        } else {
            striker = batTeam.players[batTeam.wickets + 1];
            upDivTwo = striker;
        }
    }
}

function statsUpdate() {
    upScore.innerHTML = batTeam.runs + "-" + batTeam.wickets;
    upPp.innerHTML = "P1";
    upOvers.innerHTML = batTeam.overs.toFixed(1);
    if (batTeam.overs != 0) {
        batTeam.runRate = (batTeam.runs / ((((batTeam.overs % 1) * 10) / 6) + parseInt(batTeam.overs))).toFixed(2);
        upCrr.innerHTML = batTeam.runRate;
    }
    if (upDivOne.name == striker.name) {
        upBatsone[1].innerHTML = playerName(striker.name);
        upBatsone[2].innerHTML = striker.runs;
        upBatsone[3].innerHTML = striker.ballsFaced;
        upBatstwo[1].innerHTML = playerName(nonStriker.name);
        upBatstwo[2].innerHTML = nonStriker.runs;
        upBatstwo[3].innerHTML = nonStriker.ballsFaced;
    } else {
        upBatsone[1].innerHTML = playerName(nonStriker.name);
        upBatsone[2].innerHTML = nonStriker.runs;
        upBatsone[3].innerHTML = nonStriker.ballsFaced;
        upBatstwo[1].innerHTML = playerName(striker.name);
        upBatstwo[2].innerHTML = striker.runs;
        upBatstwo[3].innerHTML = striker.ballsFaced;
    }
    upBowler[0].innerHTML = playerName(curBowler.name);
    upBowler[1].innerHTML = curBowler.runsConcd + "-" + curBowler.wickets;
    upBowler[2].innerHTML = curBowler.overs.toFixed(1);
    if (inning == 0 && batTeam.runRate != Infinity) {
        upProjScore.innerHTML = "Projected : " + (maxOvers * batTeam.runRate).toFixed(0);
    } else {
        let need = document.querySelectorAll(".info span");
        if (inningsOneScore + 1 - batTeam.runs < 0) {
            need[0].innerHTML = 0;
        } else {
            need[0].innerHTML = inningsOneScore + 1 - batTeam.runs;
            if (0.6 - (batTeam.overs % 1) == 0.6) {
                need[1].innerHTML = maxOvers - batTeam.overs;
            } else {
                need[1].innerHTML = (maxOvers - parseInt(batTeam.overs) - 1) + ((6 - Math.round((batTeam.overs % 1) * 10)) / 10);
            }
        }
    }
}

function inningsOne() {
    if (batTeam.overs == maxOvers || batTeam.wickets == 10) {
        inning++;
        inningsOneScore = batTeam.runs;
        inningsChange();
    } else {
        ballBowled();
    }
}

function inningsChange() {
    let change = document.querySelectorAll(".inningsup");
    if (batTeam.name == "India") {
        change[0].innerHTML = "IND";
        change[2].innerHTML = "AUS";
    } else {
        change[0].innerHTML = "AUS";
        change[2].innerHTML = "IND";
    }
    change[1].innerHTML = batTeam.runs + "/" + batTeam.wickets;
    change[3].innerHTML = batTeam.runs + 1;
    let temp = batTeam;
    batTeam = bowlTeam;
    bowlTeam = temp;
    overs = 0;
    setCurPlayers();
    resetScreen();
    document.querySelector(".nextball").classList.add("hidden");
    document.querySelector(".inover").classList.remove("hidden");
    document.getElementById("bowlBtn").disabled = true;
    document.getElementById("nextInn").addEventListener("click", function() {
        document.getElementById("bowlBtn").disabled = false;
        document.querySelector(".nextball").classList.remove("hidden");
        document.querySelector(".inover").classList.add("hidden");
    })
}

function inningsTwo() {
    if (inningsOneScore < batTeam.runs) {
        matchEnded();
        document.querySelectorAll(".result")[4].innerHTML = batTeam.name + " win by " + (10 - batTeam.wickets) + " wickets";
    } else if (batTeam.wickets == 10 && inningsOneScore != batTeam.runs || batTeam.overs == maxOvers && inningsOneScore != batTeam.runs) {
        matchEnded();
        document.querySelectorAll(".result")[4].innerHTML = bowlTeam.name + " win by " + (inningsOneScore - batTeam.runs) + " runs";
    } else if (inningsOneScore == batTeam.runs && batTeam.wickets == 10 || inningsOneScore == batTeam.runs && batTeam.overs == maxOvers) {
        matchEnded();
        document.querySelectorAll(".result")[4].innerHTML = "Match Tied!";
    } else {
        ballBowled();
    }
}

function matchEnded() {
    document.querySelector(".match").classList.add("hidden");
    document.querySelector(".match").style.top = "50%";
    document.querySelector(".nextball").classList.add("hidden");
    document.querySelector(".ended").classList.remove("hidden");
    document.querySelectorAll(".result")[0].innerHTML = bowlTeam.name;
    document.querySelectorAll(".result")[1].innerHTML = bowlTeam.runs + "/" + bowlTeam.wickets;
    document.querySelectorAll(".result")[2].innerHTML = batTeam.name;
    document.querySelectorAll(".result")[3].innerHTML = batTeam.runs + "/" + batTeam.wickets;
}

function Player(name, hand = 1, role = 2) {
    this.name = name;
    this.hand = hand;
    this.role = role;
    this.runs = 0;
    this.ballsFaced = 0;
    this.four = 0;
    this.six = 0;
    this.strikeRate = 0;
    this.fow = 0;
    if (role == "2" || role == "3") {
        this.bowl = true;
        this.overs = 0;
        this.maiden = 0;
        this.runsConcd = 0;
        this.wickets = 0;
        this.ecoRate = 0;
        this.extras = 0;
        this.wides = 0;
        this.noBalls = 0;
    }
}

function Teams(name, toss, bat) {
    this.name = name;
    this.toss = toss;
    this.runs = 0;
    this.wickets = 0;
    this.overs = 0;
    this.runRate = 0;
    this.extras = 0;
    this.wides = 0;
    this.noBalls = 0;
    this.drs = 1;
    this.drsSuccess = 0;
    this.drsUnsuccess = 0;
    this.batFirst = bat;
    this.players = [];
}

function logtable() {
    console.table(teams[0]);
    console.table(teams[0].players);
    console.table(teams[1]);
    console.table(teams[1].players);
}