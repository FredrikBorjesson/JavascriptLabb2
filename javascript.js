window.onload = function() {

    printPersonList();

    document.getElementById("add").addEventListener('click', changeView);
    document.getElementById("list").addEventListener('click', changeView);
    document.getElementById("about").addEventListener('click', changeView);
    document.getElementById("addButton").addEventListener('click', addPerson);
    document.getElementById("ssnInput").addEventListener('input', checkNameAndSsn);
    document.getElementById("nameInput").addEventListener('input', checkNameAndSsn);

    function changeView(){
       document.getElementById("addView").style.display = "none";
       document.getElementById("listView").style.display = "none";
       document.getElementById("aboutView").style.display = "none";
       document.getElementById("add").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
       document.getElementById("list").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
       document.getElementById("about").style.backgroundColor = "rgba(255, 255, 255, 0.3)";

        if (this.id == "add"){
            document.getElementById("addView").style.display = "block";
            document.getElementById("add").style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        } else if (this.id == "list"){
             document.getElementById("listView").style.display = "block";
             document.getElementById("list").style.backgroundColor = "rgba(255, 255, 255, 0.7)";
             //printPersonList();
        } else {
            document.getElementById("about").style.backgroundColor = "rgba(255, 255, 255, 0.7)";
            document.getElementById("aboutView").style.display = "block";
        }
    }

    function checkNameAndSsn(){
        var nameInput = document.getElementById("nameInput");
        var ssnInput = document.getElementById("ssnInput");
        if (nameInput.value != ""){
            nameInput.style.border = "1px solid green";
        } else {
            nameInput.style.border = "1px solid red";
        }
        if (checkControlNumber(ssnInput.value)){
            ssnInput.style.border = "1px solid green";
        } else {
            ssnInput.style.border = "1px solid red";
        }
        if (nameInput.value != "" && checkControlNumber(ssnInput.value)) {
            document.getElementById("addButton").disabled = false;
        } else {
            document.getElementById("addButton").disabled = true;
        }
    }

    

    function loadPersonList(){
        if (localStorage.getItem("personList") !== null){
            return JSON.parse(localStorage.getItem("personList"));
        } else {
            return new Array();
        }
    }

    function savePersonList(personList){
        localStorage.setItem("personList", JSON.stringify(personList));
    }

    function addPerson(){
        var name = document.getElementById("nameInput");
        var ssn = document.getElementById("ssnInput");
        var age = calculateAge(ssn.value);
        var gender = "";
        if (document.getElementById("genderMale").checked == true){
            gender = "Man";
        } else if (document.getElementById("genderFemale").checked == true){
            gender = "Kvinna";
        } else {
            gender = "Annan";
        }
        var person = {name: name.value, ssn: ssn.value, age: age, gender: gender};
        personList = loadPersonList();
        personList.push(person);
        savePersonList(personList);
        name.value = "";
        ssn.value = "";
        document.getElementById("addButton").disabled = true;
        printPersonList();
    }

    function printPersonList(){
        var personList = loadPersonList();
        var table = document.getElementById("personTable");
        for (var i = table.rows.length - 1; i < personList.length; i++) {
            var row = table.insertRow(i + 1);
            var nameCell = row.insertCell(0);
            var ssnCell = row.insertCell(1);
            var ageCell = row.insertCell(2);
            var genderCell = row.insertCell(3);
            nameCell.innerHTML = personList[i].name;
            ssnCell.innerHTML = personList[i].ssn;
            ageCell.innerHTML = personList[i].age;
            genderCell.innerHTML = personList[i].gender;
            var btn = document.createElement("input");
            btn.type = "button";
            btn.id = "btn";
            btn.className = "deleteButton";
            btn.value = "Ta bort"
            btn.addEventListener("click", deleteRow);
            row.appendChild(btn);
        }
    }

    function deleteRow(event) {
        var index = event.target.parentNode.rowIndex;
        document.getElementById("personTable").deleteRow(index);
        personList = loadPersonList();
        personList.splice(index -1, 1);
        savePersonList(personList);
    }

}