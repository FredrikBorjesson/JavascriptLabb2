window.onload = function() {

    localStorage.clear();

    document.getElementById("add").addEventListener('click', changeView);
    document.getElementById("list").addEventListener('click', changeView);
    document.getElementById("about").addEventListener('click', changeView);
    document.getElementById("addButton").addEventListener('click', addPerson);
    document.getElementById("ssnInput").addEventListener('input', checkSSN)

    function changeView(){
       document.getElementById("addView").style.display = "none";
       document.getElementById("listView").style.display = "none";
       document.getElementById("aboutView").style.display = "none";
       document.getElementById("add").style.backgroundColor = "mediumseagreen";
       document.getElementById("list").style.backgroundColor = "mediumseagreen";
       document.getElementById("about").style.backgroundColor = "mediumseagreen";
       console.log(this.id);

        if (this.id == "add"){
            document.getElementById("addView").style.display = "block";
            document.getElementById("add").style.backgroundColor = "seagreen";
        } else if (this.id == "list"){
             document.getElementById("listView").style.display = "block";
             document.getElementById("list").style.backgroundColor = "seagreen";
             printPersonList();
        } else {
            document.getElementById("about").style.backgroundColor = "seagreen";
            document.getElementById("aboutView").style.display = "block";
        }
    }

    function checkSSN(){
        var nameInput = document.getElementById("nameInput");
        if (checkControlNumber(this.value) && nameInput.value != ""){
            document.getElementById("addButton").disabled = false;
        } else {
            document.getElementById("addButton").disabled = true;
        }
    }

    function loadPersonList(){
        console.log(localStorage.getItem("personList"))
        if (localStorage.getItem("personList") !== null){
            console.log("Inne i loadPersonList och returnerar localstorage " + localStorage.getItem("personList"))
            return JSON.parse(localStorage.getItem("personList"));
        } else {
            console.log("Database is empty!");
            return new Array();
        }
    }

    function savePersonList(person){
        var personList = loadPersonList();
        console.log(personList + "Inne i savepersonList");
        personList.push(person);
        localStorage.setItem("personList", JSON.stringify(personList));
    }

    function addPerson(){
        var name = document.getElementById("nameInput").value;
        var ssn = document.getElementById("ssnInput").value;
        var age = calculateAge(ssn);
        var person = {name: name, ssn: ssn, age: age};
        savePersonList(person);
        console.log(name + " i saved")
    }

    function printPersonList(){
        var personList = loadPersonList();
        var table = document.getElementById("personList");
        console.log(personList.length + " Längden på personlist");
        for (var i = 0; i < personList.length; i++) {
            var row = table.insertRow(i + 1);
            var nameCell = row.insertCell(0);
            var ssnCell = row.insertCell(1);
            var ageCell = row.insertCell(2);
            nameCell.innerHTML = personList[i].name;
            ssnCell.innerHTML = personList[i].ssn;
            ageCell.innerHTML = "aaaaaa"
            listItem.appendChild(document.createTextNode(personList[i].name + personList[i].ssn))
            list.appendChild(listItem);
        }
    }


}