//checks for change in selection bar and updates the grindSpotCurrent variable
changeGrindSpot = (event) => {
    switch (event.target.value) {
        case "sycraia":
            resetTable();
            loadTable(sycraia);
            break;
        case "orccamp":
            resetTable();
            loadTable(orccamp);
            break;
    }
    console.log("grind spot changed to ", event.target.value);
};

//clears all table elements
resetTable = () => {
    let table = document.getElementById("outputTable");
    table.innerHTML = "";
    currentAvgSilverHr = 0;
    hour_count = 1;
    document.getElementById("silver_output").innerHTML = 0;
};

//runs functions that load table elements
loadTable = (grindSpot) => {
    grindSpotCurrent = grindSpot;
    console.log(grindSpot);
    loadIcons();
    loadInputBoxes();
};

//loads item icons for row 0 of table
loadIcons = () => {
    let table = document.getElementById("outputTable");

    let row = table.insertRow(0);

    for (let i = 0; i < grindSpotCurrent.length; i++) {
        let cell = [];
        let img = [];

        cell[i] = row.insertCell(i);
        img[i] = document.createElement("img");
        img[i].src = grindSpotCurrent[i].icon;
        img[i].className = "item_icons";
        cell[i].appendChild(img[i]);
    }

    let last = row.insertCell(grindSpotCurrent.length);
    last.innerHTML = "Silver/Hr";
    last.className = "table_header_text";
};

//loads input boxes for row 1 of table
loadInputBoxes = () => {
    let table = document.getElementById("outputTable");

    let row = table.insertRow(1);

    for (let i = 0; i < grindSpotCurrent.length; i++) {
        let cell = [];
        let inputBox = [];

        cell[i] = row.insertCell(i);
        inputBox[i] = document.createElement("input");
        inputBox[i].className = "grind_input";
        inputBox[i].id = "inputItem" + (i + 1);
        inputBox[i].type = "text";
        inputBox[i].value = 0;
        cell[i].appendChild(inputBox[i]);
    }
};

//runs after submit button is pressed
logItemCount = () => {
    console.log("submit button clicked");
    let inputItem = [];

    for (let i = 0; i < grindSpotCurrent.length; i++) {
        inputItem[i] = document.getElementById("inputItem" + (i + 1)).value;
    }

    let inputItemInt = inputStringToInt(inputItem);
    let total = addItemValue(inputItemInt);

    inputToTable(inputItem, total);
    inputToDatabase(inputItemInt, total);
    overallAvg(total);

    for (let i = 0; i < grindSpotCurrent.length; i++) {
        document.getElementById("inputItem" + (i + 1)).value = 0;
    }
};

//convert user input array (string) into int array for calculation
inputStringToInt = (stringArray = []) => {
    let intArray = [];
    for (let i = 0; i < stringArray.length; i++) {
        intArray[i] = parseInt(stringArray[i]);
    }
    return intArray;
};

//calculates total silver/hr from user input
addItemValue = (array = []) => {
    let total = 0;

    for (let i = 0; i < array.length; i++) {
        total += array[i] * grindSpotCurrent[i].price;
    }
    return total;
};

//adds all data into table
inputToTable = (array = [], output) => {
    let table = document.getElementById("outputTable");

    let row = table.insertRow(1);

    //adds user input array into table
    for (let i = 0; i < array.length; i++) {
        let cell = [];
        cell[i] = row.insertCell(i);
        cell[i].innerHTML = array[i];
        cell[i].className = "output";
    }

    //adds silver/hr total into table
    let last = row.insertCell(array.length);
    last.innerHTML = formatNumber(output);
    last.className = "output";
};

//adds the data to a temp database
inputToDatabase = (array = [], int) => {
    array[array.length] = int;
};

//finds average of all silver/hr data in table
overallAvg = (int) => {
    currentAvgSilverHr *= hour_count - 1;
    currentAvgSilverHr = Math.round((currentAvgSilverHr + int) / hour_count);
    hour_count++;

    document.getElementById("silver_output").innerHTML =
        currentAvgSilverHr.toLocaleString();
};

//formats numbers and adds suffix "b", "m" or "k"
formatNumber = (int) => {
    let count = 0;
    let check = int;

    while (check > 1) {
        check /= 10;
        count++;
    }

    if (count >= 10) {
        return (int / 1000000000).toFixed(2).toString() + "b";
    } else if (count >= 7) {
        return (int / 1000000).toFixed(1).toString() + "m";
    } else if (count >= 4) {
        return (int / 1000).toFixed(0).toString() + "k";
    } else {
        return int.toString();
    }
};
