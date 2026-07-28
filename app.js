
let missionHistory = [];

// ===============================
// LIVE CLOCK
// ===============================

function updateClock() {

    const clock = document.getElementById("clock");

    if (clock) {

        clock.innerHTML = new Date().toLocaleTimeString();

    }

}

setInterval(updateClock,1000);

updateClock();

// ===============================
// ANALYZE MISSION
// ===============================

function analyzeMission(){

    const uavData =
    document.getElementById("uavSelect")
    .value
    .split(",");

    const maxPayload =
    Number(uavData[0]);

    const maxRange =
    Number(uavData[1]);

    const batteryCapacity =
    Number(uavData[2]);

    const payload =
    Number(
    document.getElementById("payloadWeight").value
    );

    const distance =
    Number(
    document.getElementById("distance").value
    );

    const payloadPosition =
    Number(
    document.getElementById("payloadPosition").value
    );

    if(
        payload<=0 ||
        distance<=0 ||
        payloadPosition<=0
    ){

        alert("Please Enter All Values");

        return;

    }

    payloadCheck(

        payload,

        maxPayload,

        distance,

        maxRange,

        batteryCapacity,

        payloadPosition

    );

}
// =========================================
// PART - 2
// Payload + Battery + Risk + CG
// =========================================

function payloadCheck(
    payload,
    maxPayload,
    distance,
    maxRange,
    batteryCapacity,
    payloadPosition
){

    let payloadStatus="";

    if(payload<=maxPayload){

        payloadStatus="✅ SAFE";

    }

    else{

        payloadStatus="❌ OVERLOAD";

    }

    batteryCalculation(

        payload,

        maxPayload,

        distance,

        maxRange,

        batteryCapacity,

        payloadPosition,

        payloadStatus

    );

}

// =========================================

function batteryCalculation(

    payload,

    maxPayload,

    distance,

    maxRange,

    batteryCapacity,

    payloadPosition,

    payloadStatus

){

    const batteryUsed =

    (distance*2)+(payload*5);

    let batteryRemaining =

    batteryCapacity-batteryUsed;

    if(batteryRemaining<0){

        batteryRemaining=0;

    }

    let batteryStatus="";

    if(batteryRemaining>20){

        batteryStatus="✅ SUFFICIENT";

    }

    else{

        batteryStatus="❌ LOW BATTERY";

    }

    riskCalculation(

        payload,

        maxPayload,

        distance,

        maxRange,

        batteryRemaining,

        payloadPosition,

        payloadStatus,

        batteryStatus

    );

}

// =========================================

function riskCalculation(

    payload,

    maxPayload,

    distance,

    maxRange,

    batteryRemaining,

    payloadPosition,

    payloadStatus,

    batteryStatus

){

    let riskScore=0;

    if(payload>maxPayload*0.80){

        riskScore+=40;

    }

    if(distance>maxRange*0.80){

        riskScore+=30;

    }

    if(batteryRemaining<30){

        riskScore+=30;

    }

    let riskLevel="🟢 LOW";

    if(riskScore>=60){

        riskLevel="🔴 HIGH";

    }

    else if(riskScore>=30){

        riskLevel="🟡 MEDIUM";

    }

    missionDecision(

        payload,

        maxPayload,

        distance,

        maxRange,

        batteryRemaining,

        payloadPosition,

        payloadStatus,

        batteryStatus,

        riskLevel,

        riskScore

    );

}

// =========================================

function missionDecision(

    payload,

    maxPayload,

    distance,

    maxRange,

    batteryRemaining,

    payloadPosition,

    payloadStatus,

    batteryStatus,

    riskLevel,

    riskScore

){

    let missionStatus="";

    if(

        payload<=maxPayload &&

        distance<=maxRange &&

        batteryRemaining>20

    ){

        missionStatus="✅ APPROVED";

    }

    else{

        missionStatus="❌ REJECTED";

    }

    let cg=payloadPosition;

    let cgStatus="";

    if(cg>=30 && cg<=50){

        cgStatus="✅ STABLE";

    }

    else{

        cgStatus="❌ UNSTABLE";

    }

    updateDashboard(

        payloadStatus,

        batteryStatus,

        riskLevel,

        missionStatus,

        batteryRemaining,

        cg,

        cgStatus,

        riskScore,

        payload,

        distance

    );

}
// =========================================
// PART - 3
// Dashboard Update + Battery + Risk Meter
// =========================================

function updateDashboard(

    payloadStatus,

    batteryStatus,

    riskLevel,

    missionStatus,

    batteryRemaining,

    cg,

    cgStatus,

    riskScore,

    payload,

    distance

){

    // ==========================
    // RESULT PANEL
    // ==========================

    document.getElementById("payloadStatus").innerHTML =
    payloadStatus;

    document.getElementById("batteryStatus").innerHTML =
    batteryStatus;

    document.getElementById("riskLevel").innerHTML =
    riskLevel;

    document.getElementById("missionStatus").innerHTML =
    missionStatus;

    document.getElementById("cgValue").innerHTML =
    cg.toFixed(2)+" cm";

    document.getElementById("cgStatus").innerHTML =
    cgStatus;

    // ==========================
    // BATTERY BAR
    // ==========================

    let batteryFill =
    document.getElementById("batteryFill");

    batteryFill.style.width =
    batteryRemaining+"%";

    document.getElementById("batteryPercent")
    .innerHTML =
    batteryRemaining+"%";

    document.getElementById("telemetryBattery")
    .innerHTML =
    batteryRemaining+"%";

    document.getElementById("batteryHealth")
    .innerHTML =
    batteryRemaining+"%";

    // ==========================
    // BATTERY COLOR
    // ==========================

    if(batteryRemaining>=60){

        batteryFill.style.background=
        "#00ff66";

    }

    else if(batteryRemaining>=30){

        batteryFill.style.background=
        "#ffcc00";

    }

    else{

        batteryFill.style.background=
        "#ff3333";

    }

    // ==========================
    // RISK METER
    // ==========================

    let gauge =
    document.getElementById("gaugeFill");

    let angle =
    (riskScore/100)*180;

    gauge.style.transform =
    "rotate("+angle+"deg)";

    document.getElementById("riskPercent")
    .innerHTML =
    riskScore+"%";

    document.getElementById("riskAlert")
    .innerHTML =
    riskLevel;

    // ==========================
    // CG POINTER
    // ==========================

    let point =
    document.getElementById("cgPoint");

    point.style.left =
    cg+"%";

    // ==========================
    // DASHBOARD
    // ==========================

    let totalMission =
    document.getElementById("missionCount");

    totalMission.innerHTML =
    Number(totalMission.innerHTML)+1;

    document.getElementById("missionState")
    .innerHTML =
    missionStatus;

    // ==========================
    // TELEMETRY
    // ==========================

    document.getElementById("altitude")
    .innerHTML =
    Math.floor(Math.random()*200+100)+" m";

    document.getElementById("speed")
    .innerHTML =
    Math.floor(Math.random()*40+40)+" km/h";

    // ==========================
    // SAVE HISTORY
    // ==========================

    missionHistory.push({

        id:missionHistory.length+1,

        uav:
        document.getElementById("uavSelect")
        .options[
        document.getElementById("uavSelect")
        .selectedIndex
        ].text,

        payload,

        distance,

        status:missionStatus

    });

    updateHistory();

}
// =========================================
// PART - 4
// Mission History + Chart + Export
// =========================================

// ---------- Mission History ----------

function updateHistory(){

    let tbody =
    document.getElementById("historyTable");

    tbody.innerHTML="";

    let approved=0;
    let rejected=0;

    missionHistory.forEach(function(mission){

        if(mission.status.includes("APPROVED")){

            approved++;

        }
        else{

            rejected++;

        }

        tbody.innerHTML+=`

        <tr>

            <td>${mission.id}</td>

            <td>${mission.uav}</td>

            <td>${mission.payload} kg</td>

            <td>${mission.distance} km</td>

            <td>${mission.status}</td>

        </tr>

        `;

    });

    // Dashboard Analytics

    if(document.getElementById("approvedMission")){

        document.getElementById("approvedMission").innerHTML=
        approved;

    }

    if(document.getElementById("rejectedMission")){

        document.getElementById("rejectedMission").innerHTML=
        rejected;

    }

    createChart(approved,rejected);

}

// ---------- Chart ----------

let missionChart=null;

function createChart(approved,rejected){

    let canvas=
    document.getElementById("missionChart");

    if(!canvas){

        return;

    }

    if(missionChart){

        missionChart.destroy();

    }

    missionChart=new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:[
                "Approved",
                "Rejected"
            ],

            datasets:[{

                data:[
                    approved,
                    rejected
                ],

                backgroundColor:[
                    "#00ff66",
                    "#ff3333"
                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    labels:{

                        color:"white"

                    }

                }

            }

        }

    });

}

// ---------- PDF Button ----------

let pdfButton=
document.getElementById("downloadPdf");

if(pdfButton){

    pdfButton.onclick=function(){

        alert(
        "PDF Export will be connected with Flask Backend in Version 3.0");

    }

}

// ---------- CSV Button ----------

let csvButton=
document.getElementById("exportCSV");

if(csvButton){

    csvButton.onclick=function(){

        let csv="ID,UAV,Payload,Distance,Status\n";

        missionHistory.forEach(function(m){

            csv+=
            `${m.id},${m.uav},${m.payload},${m.distance},${m.status}\n`;

        });

        let blob=
        new Blob([csv],{

            type:"text/csv"

        });

        let a=
        document.createElement("a");

        a.href=
        URL.createObjectURL(blob);

        a.download=
        "MissionHistory.csv";

        a.click();

    }

}

// ---------- Flask Backend ----------

function saveMissionBackend(mission){

    fetch("http://127.0.0.1:5000/api/mission",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(mission)

    })

    .then(response=>response.json())

    .then(data=>{

        console.log(data);

    })

    .catch(error=>{

        console.log(error);

    });

}