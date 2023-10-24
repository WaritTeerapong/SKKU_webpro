var correctAcc = "1234567890123456";
var correctPin = "1234";
var acc ='';
var pin = '';
var pinChance = 5;
//var balanceOutput = document.getElementById("balanceOut")
var balance = 2000;

var d = new Date();

//index
/* =========================================================================================*/ 
function indexPage() {
    window.location.assign("./index.html")
    pinChance = 5; // reset pin chance
  }

function appendToAcc(value) {
    acc += value
    document.getElementById('display').innerText += "●";
}

function deleteLastAcc() {
    var display = document.getElementById('display').innerText;
    document.getElementById('display').innerText = display.slice(0, -1);
    acc = acc.slice(0, -1);
}

function enterAcc() {
    if (acc === correctAcc){
        pinPage();
    } else {
        alert("This account number does not exist!")
        document.getElementById('display').innerText = "";
        acc = '';
    }
}

//password
/* =========================================================================================*/ 
function pinPage() {
    window.location.assign("./password.html")
  }

function appendToPin(value) {
    pin += value
    document.getElementById('display').innerText += "●";
}

function deleteLastPin() {
    var display = document.getElementById('display').innerText;
    document.getElementById('display').innerText = display.slice(0, -1);
    pin = pin.slice(0, -1);
}

function enterPin() {
    if (pinChance == 0){
        alert("Your attempt is over. Back to login")
        indexPage();
    } else if (pin === correctPin){
        
        menuPage() 
    } else {
        pinChance -= 1;
        pin = '';
        alert("Incorrect PIN. You have "+ pinChance +" attempt(s) left")
        document.getElementById('display').innerText = "";
    }
}

// menu
/* =========================================================================================*/ 
function menuPage() {
    window.location.assign("./menu.html");
  }

// account information
/* =========================================================================================*/ 
function accInfoPage() {
    window.location.assign("./accInfo.html");
    
}

function showBalance(){
    document.getElementById('balanceOut').innerHTML = "Current balance: $" + balance;
}

withdrawPage();
depositPage();
transferPage();
