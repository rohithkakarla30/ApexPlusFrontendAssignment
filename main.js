function getSceneDataFromStorage(){
    return JSON.parse(localStorage.getItem('scene'));
}

function addSceneDatatoStorage(sceneData){
    localStorage.setItem('scene', JSON.stringify(sceneData));
}

function addNewSceneDatatoStorage(sceneName, sceneTime){
    let sceneData = getSceneDataFromStorage();
    if(sceneData === null) sceneData = [];
    sceneData.push({sceneId: Math.random().toString(36), sceneName: sceneName, sceneTime: sceneTime});
    addSceneDatatoStorage(sceneData);
}

function getSceneDataById(sceneId){
    let sceneData = getSceneDataFromStorage();
    if(sceneData!=null){
        for(s=0;s<sceneData.length;s++){
            if(sceneData[s].sceneId==sceneId) break;
        }
    }
    return sceneData[s];
}

function updateSceneDataById(sceneId, sceneName, sceneTime){
    let sceneData = getSceneDataFromStorage();

    if(sceneData != null){
        for(s=0;s<sceneData.length;s++){
            if(sceneData[s].sceneId == sceneId){
                sceneData[s].sceneName = sceneName;
                sceneData[s].sceneTime = sceneTime;
                break;
            }
        }
        addSceneDatatoStorage(sceneData);
    }
    else{
    }
}

function deleteSceneDataById(sceneId){
    let sceneData = getSceneDataFromStorage();
    for(i=0;i<sceneData.length;i++){
        if(sceneId == sceneData[i].sceneId){
            break;
        }
    }
    if(i == 0) sceneData.shift()
    else sceneData.splice(i,1);
    addSceneDatatoStorage(sceneData);
}

function getVehicleDataFromStorage(){
    return JSON.parse(localStorage.getItem('vehicles'));
}

function addVehicleDatatoStorage(vehicleData){
    localStorage.setItem('vehicles', JSON.stringify(vehicleData));
}

function addNewVehicleDatatoStorage(sceneId, vehicleName, speed, positionX, positionY, direction){
    let vehicleData = getVehicleDataFromStorage();
    if(vehicleData === null) vehicleData = [];
    vehicleData.push({vehicleId : Math.random().toString(36), sceneId: sceneId, vehicleName: vehicleName, speed : speed, positionX : positionX, positionY : positionY, direction: direction});
    addVehicleDatatoStorage(vehicleData);
}

function getVehicleDataById(vehicleId){
    let vehicleData = getVehicleDataFromStorage();
    if(vehicleData!=null){
        for(v=0;v<vehicleData.length;v++){
            if(vehicleData[v].vehicleId==vehicleId) break;
        }
    }
    return vehicleData[v];
}

function getVehicleDataBySceneId(sceneId){
    let vehicleData = getVehicleDataFromStorage();
    let vehicleDataBySceneId = [];
    if(vehicleData!=null){
        for(v=0;v<vehicleData.length;v++){
            if(vehicleData[v].sceneId==sceneId) {
                vehicleDataBySceneId.push(vehicleData[v]);
            }
        }
    }
    return vehicleDataBySceneId;
}

function updateVehicleDataById(vehicleId, sceneId, vehicleName, speed, positionX, positionY, direction){
    let vehiclesData = getVehicleDataFromStorage();

    if(vehiclesData != null){
        for(i=0;i<vehiclesData.length;i++){
            if(vehiclesData[i].vehicleId == vehicleId){
                vehiclesData[i].sceneId = sceneId;
                vehiclesData[i].vehicleName = vehicleName;
                vehiclesData[i].speed = speed;
                vehiclesData[i].positionX = positionX;
                vehiclesData[i].positionY = positionY;
                vehiclesData[i].direction = direction;
                break;
            }
        }
        addVehicleDatatoStorage(vehiclesData);
    }
}

function deleteVehicleDataById(vehicleId){
    var vehicleData = getVehicleDataFromStorage();
    if(vehicleData != null){
        for(i=0;i<vehicleData.length;i++){
            if(vehicleData[i].vehicleId == vehicleId){
                break;
            }
        }
        if(i == 0) vehicleData.shift()
        else vehicleData.splice(i,1);
        
        addVehicleDatatoStorage(vehicleData);
    }
}

function deleteVehicleDataBySceneId(sceneId){
    let vehiclesData = getVehicleDataFromStorage();
    if(vehiclesData != null){
        for(i=0;i<vehiclesData.length;i++){
            if(vehiclesData[i].sceneId == sceneId){
                if(i==0){
                    vehiclesData.shift()
                }
                else{
                    vehiclesData.splice(i,1);
                }
                i--;
            }
        }
        addVehicleDatatoStorage(vehiclesData);
    }
}

function addScene(){
    var sceneName = document.getElementById("sceneName").value;
    var sceneTime = document.getElementById("sceneTime").value;

    if(sessionStorage.getItem("update") != null){
        updateSceneDataById(sessionStorage.getItem("sceneId"), sceneName, sceneTime);
    }
    else{
        addNewSceneDatatoStorage(sceneName, sceneTime);
    }
    sessionStorage.clear();
}

function updateDatatoFormScenario(){
    if(sessionStorage.getItem("update") != null){
        var sceneId = sessionStorage.getItem("sceneId");
        let sceneData = getSceneDataById(sceneId);
        
        document.getElementById("sceneName").value = sceneData.sceneName;
        document.getElementById("sceneTime").value = sceneData.sceneTime;        
    }
}


function updateDatatoFormVehicle(){
    if(sessionStorage.getItem("update") != null){
        let vehicleId = sessionStorage.getItem("vehicleId");
        let vehicleData = getVehicleDataById(vehicleId)
        
        document.getElementById("sceneList").value = vehicleData.sceneId;
        document.getElementById("vehicleName").value = vehicleData.vehicleName;
        document.getElementById("speed").value = vehicleData.speed;
        document.getElementById("positionX").value = vehicleData.positionX;
        document.getElementById("positionY").value = vehicleData.positionY;
        document.getElementById("direction").value = vehicleData.direction;          
    }
}

function addDropdown(){

    var sceneData = getSceneDataFromStorage();
    if (localStorage.getItem('scene') != null) {
        for (var i = 0; i < sceneData.length; i++){
            document.getElementById("sceneList").innerHTML += "<option value='" + sceneData[i].sceneId + "'>" + sceneData[i].sceneName + "</option>";
        }
    }
    var sceneId;
    if(sessionStorage.getItem('sceneId')!=null){
        sceneId = sessionStorage.getItem('sceneId')
        document.getElementById("sceneList").value = sceneId;
        sessionStorage.clear();
    }
}

function validateForm(){
    let positionX = document.forms['vehicleform']['positionX'].value;
    let positionY = document.forms['vehicleform']['positionY'].value;
    if((positionX >= 0 && positionX <= 1300) && (positionY >= 0 && positionY <= 800))
        return true;
    alert("PositionX should be in range of 0-1300 and positionY in range from 0 to 800");
    return false;
}

function addVehicle(){

    var sceneId = document.getElementById("sceneList").value;
    var vehicleName = document.getElementById("vehicleName").value;
    var speed = document.getElementById("speed").value;
    var positionX = document.getElementById("positionX").value;
    var positionY = document.getElementById("positionY").value;
    var direction = document.getElementById("direction").value;

    if(!((positionX >= 0 && positionX <= 1300) && (positionY >= 0 && positionY <= 800)))
        return;

    if(sessionStorage.getItem("update") != null){
        updateVehicleDataById(sessionStorage.getItem("vehicleId"), sceneId, vehicleName, speed, positionX, positionY, direction);
    }
    else{
        addNewVehicleDatatoStorage(sceneId, vehicleName, speed, positionX, positionY, direction);
    }
    sessionStorage.clear(); 
}

function clearStorage(){
    localStorage.clear()
    document.getElementById("scenarioList").innerHTML = "";
}

function addVehicletoScenario(sceneId){
    window.location.href = "./addVehicle.html";
    document.getElementById("sceneList").key = sceneId;
}

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ', 1)';
  }


function indexPageOnload(){
    addDropdown();
    indexPageOnchange();
}

function indexPageOnchange(){
    var sceneId = document.getElementById('sceneList').value;
    allvehiclesOnload();
    startGame(sceneId);
}

var gameObjects;
function startGame(sceneId) {
    myGameArea.start();

    var vehiclesData = getVehicleDataBySceneId(sceneId);
    if(vehiclesData != null){
        gameObjects = new Array(vehiclesData.length);
        for (var i = 0; i < vehiclesData.length; i++){
            gameObjects[i] = new component(vehiclesData[i].positionX, vehiclesData[i].positionY, 20, 20, getRandomRgb(), vehiclesData[i].direction, i+1, vehiclesData[i].speed);
            gameObjects[i].set();
        }
    }
}

var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 1300;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    },
    startSimulation : function(){
        this.interval = setInterval(updateGameArea, 1);
    },
    stopSimulation : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(x, y, width, height, color, direction, id, speed) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.color = color
    this.id = id
    this.set = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillText(this.id, this.x, this.y);
    }
    this.update = function(){
        ctx = myGameArea.context;
        
        ctx.fillStyle = color;
        if(this.direction == "towards"){
            ctx.fillRect(this.x+=this.speed*1, this.y, this.width, this.height);
            ctx.fillText(this.id, this.x, this.y);
        }
        else if(this.direction == "backwards"){
            ctx.fillRect(this.x-=this.speed*1, this.y, this.width, this.height);
            ctx.fillText(this.id, this.x, this.y);
        }
        else if(this.direction == "upwards"){
            ctx.fillRect(this.x, this.y-=this.speed*1, this.width, this.height);
            ctx.fillText(this.id, this.x, this.y);
        }
        else if(this.direction == "downwards"){
            ctx.fillRect(this.x, this.y+=this.speed*1, this.width, this.height);
            ctx.fillText(this.id, this.x, this.y);
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.context.fillStyle = "black";
    myGameArea.context.fillRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<gameObjects.length;i++){
        gameObjects[i].update();
    }
}

function allvehiclesOnload() {
    var sceneId = document.getElementById("sceneList").value;
    var vehiclesData = getVehicleDataBySceneId(sceneId);
    document.getElementById("vehiclesList").innerHTML = ""
    const table = document.getElementById("vehiclesList");
    
    if(vehiclesData != null){
        for (let i = 0; i < vehiclesData.length; i++) {
            tr = table.insertRow(-1);

            let cell = tr.insertCell(-1);
            cell.innerHTML = i+1;
            
            cell = tr.insertCell(-1);
            cell.innerHTML = vehiclesData[i].vehicleName;

            cell = tr.insertCell(-1);
            cell.innerHTML = vehiclesData[i].positionX;

            cell = tr.insertCell(-1);
            cell.innerHTML = vehiclesData[i].positionY;

            cell = tr.insertCell(-1);
            cell.innerHTML = vehiclesData[i].speed;

            cell = tr.insertCell(-1);
            cell.innerHTML = vehiclesData[i].direction;

            cell = tr.insertCell(-1);
            cell.innerHTML = '<a href="./addVehicle.html"><img src="./icons/pencil-fill.svg" alt="Edit" width="20" height="20"></a>';
            cell.setAttribute('onclick', 'sessionStorage.setItem("vehicleId", "'+vehiclesData[i].vehicleId+'");sessionStorage.setItem("update", "true");');

            cell = tr.insertCell(-1);
            cell.innerHTML = '<img src="./icons/trash3-fill.svg" alt="Delete" width="20" height="20">';
            cell.setAttribute('onclick', 'deleteVehicle("'+vehiclesData[i].vehicleId+'")');
        }
    }
}

function deleteVehicle(vehicleId){
    deleteVehicleDataById(vehicleId);
    indexPageOnchange()
}

function allscenariosOnload() {
    var scenarioData = getSceneDataFromStorage();
    document.getElementById("sceneList").innerHTML = ""
    const table = document.getElementById("sceneList");
    
    if(scenarioData != null){
        for (let i = 0; i < scenarioData.length; i++) {
            tr = table.insertRow(-1);

            let cell = tr.insertCell(-1);
            cell.innerHTML = i+1;
            
            cell = tr.insertCell(-1);
            cell.innerHTML = scenarioData[i].sceneName;

            cell = tr.insertCell(-1);
            cell.innerHTML = scenarioData[i].sceneTime;

            cell = tr.insertCell(-1);
            cell.innerHTML = getVehicleDataBySceneId(scenarioData[i].sceneId).length
            
            cell = tr.insertCell(-1);
            cell.innerHTML = '<a href="./addVehicle.html"><img src="./icons/plus-circle-fill.svg" alt="Add" width="20" height="20"></a>'
            cell.setAttribute('onclick', 'sessionStorage.setItem("sceneId", "'+scenarioData[i].sceneId+'")');

            cell = tr.insertCell(-1);
            cell.innerHTML = '<a href="./addScenario.html"><img src="./icons/pencil-fill.svg" alt="Edit" width="20" height="20"></a>';
            cell.setAttribute('onclick', 'sessionStorage.setItem("sceneId", "'+scenarioData[i].sceneId+'");sessionStorage.setItem("update", "true");');

            cell = tr.insertCell(-1);
            cell.innerHTML = '<img src="./icons/trash3-fill.svg" alt="Delete" width="20" height="20">';
            cell.setAttribute('onclick',  'deleteScenario("'+scenarioData[i].sceneId+'");');
        }
    }   
}

function deleteScenario(sceneId){
    deleteSceneDataById(sceneId);
    deleteVehicleDataBySceneId(sceneId);
    allscenariosOnload();
    
}