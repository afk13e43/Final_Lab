let thisButton = document.getElementsByTagName("Button")[0];
let showData = document.getElementById("showData");

thisButton.addEventListener("click", loadServrData);

function loadServrData() {
    console.log("Load Server Data!");
    let xmlHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
    }
    else {
        alert("No XMLHttpRequest!");
        return;
    }
    xmlHttpRequest.open("GET", "DataFromServer.txt", true);
    xmlHttpRequest.send();
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            
            var temp = xmlHttpRequest.responseText;
            var temp1 =temp.split("\"");
            var int2 =Math.floor(Math.random()*temp1.length);
            showData.innerHTML= "    "+temp1[int2];
        }
    }
}