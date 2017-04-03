
function checkBirthday(securityNumber){
    var todaysDate = new Date();
    if (todaysDate.toISOString().slice(4,10).replace(/-/g, "") == securityNumber.slice(2, 6)){
        console.log("It's your birthday!");
        return true;
    } else{
        console.log("It's not your birthday!");
        return false;
    }
}

function calculateAge(securityNumber){
    var todaysDate = new Date();
    var age = todaysDate.getFullYear() - securityNumber.slice(0,4);
    var month = todaysDate.getMonth() - securityNumber.slice(4,6);
    var day = todaysDate.getDay() - securityNumber.slice(6, 8);

    if (day < 0){
        month--;
    }
    if (month < 0){
        age--;
    }
    console.log(age);
    return age;
}

function overEighteen(personList){
    var returnArray = [];
    for (var i = 0; i < personList.length; i++){
        if (calculateAge(personList[i].securityNumber) > 18){
            returnArray.push(personList[i]);
        }
    }
    return returnArray;
}

for (var i = 0; i < over18List.length; i++){
       console.log(over18List[i].name);
}

function checkControlNumber(securityNumber){
    if (!/^(19|20)?[0-9]{6}[-]?[0-9]{4}$/.test(securityNumber)){
        console.log("False identity!")
        return false;
    }
    var numberString = "";
    var timesTwo = true
    for (var i = 0; i < securityNumber.length - 2; i++){
        if (timesTwo){
            numberString += "" + securityNumber.slice(2,12).replace("-", "").charAt(i) * 2;
            timesTwo = false;
        } else {
            numberString += "" + securityNumber.slice(2, 12).replace("-", "").charAt(i);
            timesTwo = true
        }
    }
    var calculateNumber = 0;
    for (var i = 0; i < numberString.length; i++){
        calculateNumber += parseInt(numberString.charAt(i));
    }
    var controlNumber = 10 - String(calculateNumber).charAt(calculateNumber.length);
    if (controlNumber == 10){
        controlNumber = 0;
    }


    if (controlNumber == parseInt(securityNumber.charAt(securityNumber.length - 1))){
        console.log("Correct securitynumber!")
        return true;
    }
    console.log("False identity!");
    return false;
}

