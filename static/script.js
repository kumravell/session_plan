let selectedYear = null; // Variable to store the selected year

function selectYear(year) {
    // Reset button styles
    document.getElementById("feButton").classList.remove("selected");
    document.getElementById("seButton").classList.remove("selected");

    // Set the selected year and change button color
    selectedYear = year;
    if (year === 'FE') {
        document.getElementById("feButton").classList.add("selected");
        // console.log("Selected Year: FE");
    } else {
        document.getElementById("seButton").classList.add("selected");
        // console.log("Selected Year: SE/TE/BE");
    }
}

function updateFileNames() {
            const fileInput = document.getElementById('wordFileInput1');
            const fileInputLabel = document.getElementById('fileInputLabel1');
            
            if (fileInput.files.length > 0) {
                fileInputLabel.textContent = fileInput.files[0].name;
            } else {
                fileInputLabel.textContent = 'Choose File';
            }
        }

        function readWordDocumentsforlab() {
            var input = document.getElementById('wordFileInput1');
            var output = document.getElementById('documentContent1');
            
            if (input.files.length > 0) {
                var file = input.files[0];
                
                if (file) {
                    var formData = new FormData();
                    formData.append('file', file);
                    
                    fetch('/process_B', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.text())  
                    .then(data => {
                        output.innerHTML = data;
                    })
                    .catch(error => {
                        output.innerHTML = 'Error: ' + error.message;
                    });
                } else {
                    output.innerText = 'Failed to read the file.';
                }
            } else {
                output.innerText = 'Please select a Word document.';
            }
        }
        

let lastColumnNumericValues = [];
let cumulativeSums = [];
function readWordDocuments() {
    var input = document.getElementById('wordFileInput1');
    var output = document.getElementById('documentContent1');
    if (input.files.length > 0) {
        var file = input.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('file', file);
            fetch('/process_A', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())  
            .then(data => {
                output.innerHTML = data.content;
                lastColumnNumericValues = data.last_column_values.map(value => parseFloat(value)).filter(value => !isNaN(value));
                console.log('Numeric Values from Last Column:', lastColumnNumericValues);
                    
                function calculateCumulativeSums(initialSum, numericValues) {
                    let cumulativeSum = initialSum;
                    const cumulativeSums = [];
                    for (let i = 0; i < numericValues.length-1; i++) { 
                        cumulativeSum += numericValues[i];
                        cumulativeSums.push(cumulativeSum);
                    }
                    return cumulativeSums; 
                }
            
                const initialSum = 8; 
                cumulativeSums = calculateCumulativeSums(initialSum, lastColumnNumericValues);
                console.log('Cumulative Sums:', cumulativeSums);
            
                const incrementedSums = cumulativeSums.map(sum => sum + 1);
                console.log('Incremented Sums:', incrementedSums);

            })
            .catch(error => {
                output.innerHTML = 'Error: ' + error.message;
            });
        } else {
            output.innerText = 'Failed to read the file.';
        }
    } else {
        output.innerText = 'Please select a Word document.';
    }
    
}
console.log('Global Use of Cumulative Sums:', cumulativeSums);


function toggleOutcomeTableVisibility() {
                        var tableContainer = document.getElementById('courseOutcomesContainer');
                        tableContainer.style.display = tableContainer.style.display === 'none' ? 'block' : 'none';
                    }



function toggleOutcomes() {
        var outcomesContainer = document.querySelector('.outcomes-container');
        var outcomesText = document.getElementById('outcomesText');
        var hasInputs = outcomesContainer.querySelector('input[type="text"]');
        outcomesText.style.display = hasInputs ? 'none' : 'block';
        outcomesContainer.classList.toggle('show');
        outcomesContainer.style.display = outcomesContainer.classList.contains('show') ? 'block' : 'none';
    }



function addOutcome() {
    var outcomesContainer = document.querySelector('.outcomes-container');
    var outcomesText = document.getElementById('outcomesText');
    var printButton = document.querySelector('.print-button');
    var currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    if (!outcomesContainer.classList.contains('show')) {
        toggleOutcomes();
    }
    var newRow = document.createElement('div');
    newRow.classList.add('form-row', 'mt-2');
    var input1 = document.createElement('div');
    input1.classList.add('form-group', 'col-10');
    input1.innerHTML = '<input type="text" class="form-control course-input" placeholder="Outcome Description">';
    var input2 = document.createElement('div');
    input2.classList.add('form-group', 'col-2');
    input2.innerHTML = '<input type="text" class="form-control level-input" placeholder="Blooms Level">';
    newRow.appendChild(input1);
    newRow.appendChild(input2);
    outcomesContainer.appendChild(newRow);
    printButton.style.display = 'block';
    toggleOutcomes();
    outcomesContainer.lastElementChild.lastElementChild.querySelector('input').focus();
    setTimeout(function () {
        window.scrollTo(0, currentScrollTop);
    }, 0);
}



function collectAndStoreOutcomes() {
    var allOutcomes = [];
    var evenIndexOutcomes = [];

    var outcomeInputs = document.querySelectorAll('.outcomes-container input[type="text"]');

    outcomeInputs.forEach(function (input, index) {
        allOutcomes.push(input.value);

        if (index % 2 === 0) {
            evenIndexOutcomes.push(input.value);
        }
    });

    createOutcomeTable(evenIndexOutcomes);

    console.log('All Outcomes:', allOutcomes);
    console.log('Even Index Outcomes:', evenIndexOutcomes);

    return allOutcomes;
}




    function printOutcomes() {
        collectAndStoreOutcomes();
    }



    function collectAndStoreInputs() {
        var inputValues = {
            input1: document.getElementById('input1').value,
            input2: document.getElementById('input2').value,
            input3: document.getElementById('input3').value,
            input4: document.getElementById('input4').value,
            input5: document.getElementById('input5').value,
            input6: document.getElementById('input6').value,
            input7: document.getElementById('input7').value,
            input8: document.getElementById('input8').value,
            input9: document.getElementById('input9').value,
            input10: document.getElementById('input10').value,
        };
        console.log(inputValues);
    }

    function toggleInputs() {
        const content = document.querySelector('.collapsible-content');
        content.classList.toggle('show');
    }

    function toggleCourseOutcomes() {
        var courseOutcomesContainer = document.querySelector('.new-course-outcomes-container');
        courseOutcomesContainer.classList.toggle('show');
    }

    function toggleOutcomes() {
        var outcomesContainer = document.querySelector('.outcomes-container');
        var outcomesText = document.getElementById('outcomesText');
        var hasInputs = outcomesContainer.querySelector('input[type="text"]');
        outcomesText.style.display = hasInputs ? 'none' : 'block';
        outcomesContainer.classList.toggle('show');
        outcomesContainer.style.display = outcomesContainer.classList.contains('show') ? 'block' : 'none';
    }




    function updateExcelFileName() {
        const excelFileInput = document.getElementById('excelFileInput');
        const fileLabel = document.getElementById('fileLabel');
        
        if (excelFileInput.files.length > 0) {
            fileLabel.textContent = excelFileInput.files[0].name;
        } else {
            fileLabel.textContent = 'Choose File';
        }
    }

    function updateFileName() {
       const fileInput = document.getElementById('wordFileInput');
       const fileInputLabel = document.getElementById('fileInputLabel');
       
       if (fileInput.files.length > 0) {
           fileInputLabel.textContent = fileInput.files[0].name;
       } else {
           fileInputLabel.textContent = 'Choose File';
       }
   }


    function readWordDocument() {
        var input = document.getElementById('wordFileInput');
        var output = document.getElementById('documentContent');
        if (input.files.length > 0) {
            var file = input.files[0];
            if (file) {
                var formData = new FormData();
                formData.append('file', file);
                fetch('/process', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    output.innerHTML = data;
                    output.classList.add('file-selected');
                })
                .catch(error => {
                    output.innerHTML = 'Error: ' + error.message;
                });
            } else {
                output.innerText = 'Failed to read the file.';
            }
        } else {
            output.innerText = 'Please select a Word document.';
        }
    }

    function searchTable() {
        var searchTerm = document.getElementById('searchTerm').value.toUpperCase();
        var table = document.getElementById('resultTable');
        var rows = table.getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {  
            var cells = rows[i].getElementsByTagName('td');
            var found = false;
            for (var j = 0; j < cells.length; j++) {
                var cellText = cells[j].innerText.toUpperCase();
                if (wholeWordSearch(cellText, searchTerm) && !hasWordInParentheses(cellText, searchTerm)) {
                    found = true;
                    break;
                }
            }
            rows[i].style.display = found ? '' : 'none';
        }
    }

    function wholeWordSearch(text, term) {
        var words = text.split(/\s+/);
        return words.includes(term);
    }

    function hasWordInParentheses(text, term) {
        var regex = new RegExp("\\b" + term + "\\b\\s*\\(\\s*[A-Za-z]\\d\\s*\\)", "i");
        return regex.test(text);
    }

    let resultVisible = false;

    // function fetchIgnoreDates(callback) {
    //     fetch('/files/abc')
    //         .then(response => response.text())
    //         .then(data => {
    //             console.log("Fetched ignore dates data:", data);
    //             var ignoreDates = data.trim().split('\n').map(dateString => {
    //                 var parts = dateString.split('-');
    //                 return new Date(parts[0], parts[1] - 1, parts[2]);
    //             });
    //             console.log("Parsed ignore dates:", ignoreDates);
    //             callback(ignoreDates);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching ignore dates:', error);
    //             callback([]);
    //         });
    // }


    //-----------------KUMAR(RECENT)-----------------------
    // function fetchIgnoreDates(callback) {
    //     fetch('/fetch-ignore-dates')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (Array.isArray(data)) {
    //                 console.log("Fetched ignore dates:", data);
    //                 const ignoreDates = data.map(dateString => new Date(dateString));
    //                 callback(ignoreDates);
    //             } else {
    //                 console.error("Invalid response:", data);
    //                 callback([]);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching ignore dates:', error);
    //             callback([]);
    //         });
    // }
    
    //------------------------KUMAR(RECENT)---------------------------
    // function parseLocalIgnoreDates() {
    //     const ignoreDatesInput = document.getElementById('ignoreDates').value;
    //     if (!ignoreDatesInput) return [];
        
    //     return ignoreDatesInput.split(',').map(dateString => {
    //         const parts = dateString.split('-');
    //         return new Date(parts[2], parts[1] - 1, parts[0]);
    //     });
    // }
    
    function isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
    
    function getSelectedDays() {
        var selectedDays = [];
        var checkboxes = document.getElementsByName("dayOfWeek");
        Array.from(checkboxes).forEach(function(checkbox) {
            if (checkbox.checked) {
                selectedDays.push(checkbox.value);
            }
        });
        return selectedDays;
    }
    
    function getDayName(dayIndex) {
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[dayIndex];
    }
    





// Declare global variables
var dates1 = [];
var dates2 = [];
var dates3 = [];



  
    // Convert weekday name to number
    function getDayNumber(dayName) {
        const days = {
            "Sunday": 0,
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6
        };
        return days[dayName];
    }
    

 async function printDateslab() {
    const resultDiv = document.getElementById('result');
     resultDiv.style.display = 'block'; // ✅ force show the div
    resultDiv.innerHTML = ''; // Clear previous output

    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const maxDates = parseInt(document.getElementById('input5').value, 10) || 1000;

    const weekdays1 = document.getElementById("weekdays1").value;
    const weekdays2 = document.getElementById("weekdays2").value;
    const weekdays3 = document.getElementById("weekdays3").value;

    const batch1 = document.getElementById("batch1").value.trim() || 'Batch 1';
    const batch2 = document.getElementById("batch2").value.trim() || 'Batch 2';
    const batch3 = document.getElementById("batch3").value.trim() || 'Batch 3';

    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (isNaN(startDate) || isNaN(endDate)) {
        console.error("Invalid start or end date");
        resultDiv.innerHTML = "<p style='color:red'>Error: Please provide valid start and end dates.</p>";
        return;
    }

    // Helper function to convert day name to number
    function getDayNumber(dayName) {
        const days = {
            "Sunday": 0, "Monday": 1, "Tuesday": 2,
            "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6
        };
        return days[dayName];
    }

    // Collect all dates between start and end matching the weekday
    function collectAllDates(dayOfWeek) {
        const datesArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (currentDate.getDay() === dayOfWeek) {
                datesArray.push(currentDate.toLocaleDateString('en-GB', {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                }));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesArray;
    }

    // Prepare arrays for each batch
    const dates1 = weekdays1 ? collectAllDates(getDayNumber(weekdays1)) : [];
    const dates2 = weekdays2 ? collectAllDates(getDayNumber(weekdays2)) : [];
    const dates3 = weekdays3 ? collectAllDates(getDayNumber(weekdays3)) : [];

    console.log("Dates for batch 1:", dates1);
    console.log("Dates for batch 2:", dates2);
    console.log("Dates for batch 3:", dates3);

    const allFilteredDates = [];

    // Async function to fetch filtered dates from server
    async function fetchAndCollect(dates, maxDates, weekday, batchName) {
        if (dates.length === 0) return;

        try {
            const response = await fetch('/get_filtered_dates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    year: document.querySelector('.year-select-btn.active')?.textContent || 'FE',
                    semiFinalDates: dates
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.filteredDates) {
                throw new Error("Response missing filteredDates");
            }

            const filtered = data.filteredDates.slice(0, maxDates);

            allFilteredDates.push({
                batchName,
                weekday,
                dates: filtered
            });

            console.log(`Filtered Dates for ${batchName} (${weekday}):`, filtered);

        } catch (error) {
            allFilteredDates.push({
                batchName,
                weekday,
                error: error.message
            });
            console.error(`Error fetching filtered dates for ${batchName} (${weekday}):`, error.message);
        }
    }

    await Promise.all([
        fetchAndCollect(dates1, maxDates, weekdays1, batch1),
        fetchAndCollect(dates2, maxDates, weekdays2, batch2),
        fetchAndCollect(dates3, maxDates, weekdays3, batch3)
    ]);

    if (allFilteredDates.length === 0) {
        resultDiv.innerHTML = "<p>No batches or weekdays selected.</p>";
        return;
    }

    // Show results in the div
    allFilteredDates.forEach(group => {
        if (group.error) {
            resultDiv.innerHTML += `<p style="color:red">${group.batchName} (${group.weekday}): Error - ${group.error}</p>`;
        } else {
            resultDiv.innerHTML += `<h4>${group.batchName} (${group.weekday})</h4><ul>`;
            group.dates.forEach(date => {
                resultDiv.innerHTML += `<li>${date}</li>`;
               
            });
            resultDiv.innerHTML += '</ul>';
        }
    });
}






 async function fetchAndFilterDatabaseDatesLab(dates, maxDates, weekday, batchName) {
    const resultDiv = document.getElementById('result');
    try {
        const response = await fetch('/get_filtered_dates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                year: document.querySelector('.year-select-btn.active')?.textContent || 'FE',
                semiFinalDates: dates
            })
        });
        const data = await response.json();

        console.log(`Filtered Dates for ${batchName} (${weekday}):`, data.filteredDates);

        // Append results to #result div
        resultDiv.innerHTML += `<h4>${batchName} (${weekday})</h4><ul>`;
        for (let i = 0; i < Math.min(data.filteredDates.length, maxDates); i++) {
            resultDiv.innerHTML += `<li>${data.filteredDates[i]}</li>`;
        }
        resultDiv.innerHTML += '</ul>';

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML += `<p style="color:red;">Error fetching dates for ${batchName}: ${error.message}</p>`;
    }
}

  
    
    


    // Function to convert yyyy-mm-dd to dd-mm-yyyy
    function formatDate(date) {
        let parts = date.split("-"); // Expecting "yyyy-mm-dd"
        return `${parts[2]}/${parts[1]}/${parts[0]}`; // Convert to "dd-mm-yyyy"
    }


    // var d1 = dates1.length;
    // var d2 = dates2.length;
    // var d3 = dates3.length;
    var dates1 = getDates(startDate, endDate);
    var dates2 = getDates(startDate, endDate);
    var dates3 = getDates(startDate, endDate);
    

   
    
    //
    function printDates() {
        var resultDiv = document.getElementById('result');
        var startDateInput = document.getElementById("startDate");
        var endDateInput = document.getElementById("endDate");
        var resultContainer = document.getElementById("result");
        var selectedDays = getSelectedDays();
        var maxDates = parseInt(document.getElementById('input5').value, 10);
        
        if (!resultVisible) {
            resultDiv.style.display = 'block';
            resultVisible = true;
        }
    
        resultDiv.innerHTML = "";
    
        var startDate = new Date(startDateInput.value);
        var endDate = new Date(endDateInput.value);
    
        // console.log("Start date:", startDate);
        // console.log("End date:", endDate);
    
        if (isNaN(startDate) || isNaN(endDate)) {
            resultContainer.innerHTML = "<p>Error: Please provide valid start and end dates.</p>";
            return;
        }
    
        // // Removed fetchIgnoreDates function call
        // const localIgnoreDates = []; // Initialize as an empty array or handle as needed
        // console.log("Local ignore dates:", localIgnoreDates);
    
        if (startDate <= endDate) {
            var dates = [];
            var currentDate = startDate;
    
            while (currentDate <= endDate) {
                var dayOfWeek = currentDate.getDay();
                var dayName = getDayName(dayOfWeek);
    
                if (selectedDays.includes(dayName)) {
                    var formattedDate = currentDate.toLocaleDateString('en-GB', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    });
    
                    // Since fetchIgnoreDates is removed, we can skip the ignore date check
                    dates.push(formattedDate);
                    if (dates.length >= maxDates) {
                        break;
                    }
                }
    
                currentDate.setDate(currentDate.getDate() + 1);
            }
    
            // console.log("Semi-Final dates:", dates);
            // Call the next function with the generated dates
            fetchAndFilterDatabaseDates(dates); // Pass the semi-final dates directly
        } else {
            resultContainer.innerHTML = "<p>Error: 'Start' date should be before or equal to 'End' date.</p>";
        }
    }
    
    function fetchAndFilterDatabaseDates(semiFinalDates) {
        if (!selectedYear) {
            alert("Please select a year by clicking one of the buttons.");
            return;
        }
    
        fetch("/get_filtered_dates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                year: selectedYear,
                semiFinalDates: semiFinalDates // Send semi-final dates to the server
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // console.log("Received filtered dates:", data.filteredDates);  
            // Debugging output
    
            let resultDiv = document.getElementById("result");
            resultDiv.innerHTML += "<h4><b>Available Dates</b></h4>"; // Append to existing result
    
            if (data.filteredDates.length === 0) {
                resultDiv.innerHTML += "<p><b>No available dates.</b></p>";
            } else {
                // Filter out the dates that are in the semi-final dates
                const filteredDates = data.filteredDates.filter(date => !semiFinalDates.includes(date));
    
                let list = "<ul>";
                filteredDates.forEach(date => {
                    let formattedDate = formatDate(date);  // Convert to dd-mm-yyyy
                    list += `<li>${formattedDate}</li>`;
                });
                list += "</ul>";
                resultDiv.innerHTML += list;
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    

// Helper function to get batch-wise dates
function getBatchDates(startDate, endDate, weekdays1, weekdays2, weekdays3) {
    function collectAllDates(dayOfWeek) {
        const datesArray = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (currentDate.getDay() === dayOfWeek) {
                datesArray.push(currentDate.toLocaleDateString('en-GB', {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                }));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesArray;
    }

    const dates1 = collectAllDates(getDayNumber(weekdays1));
    const dates2 = collectAllDates(getDayNumber(weekdays2));
    const dates3 = collectAllDates(getDayNumber(weekdays3));

    return { dates1, dates2, dates3 };
}

async function updateAndDownloadlab() {
    var startDateInput = document.getElementById('startDate');
    var endDateInput = document.getElementById('endDate');
    var excelFileInput = document.getElementById('excelFile');
    var resultDiv = document.getElementById('result');
    var input5 = parseInt(document.getElementById('input5').value, 10); 

    var startDate = new Date(startDateInput.value);
    var endDate = new Date(endDateInput.value);

    if (startDate > endDate) {
        resultDiv.innerHTML = '<p>End date must be equal to or after the start date.</p>';
        return;
    }

    var file = excelFileInput.files[0];

    if (!file) {
        resultDiv.innerHTML = '<p>Please upload an Excel file.</p>';
        return;
    }

    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const sheet = workbook.getWorksheet(1);

        // Get weekday selections and batch dates
        const weekdays1 = document.getElementById("weekdays1").value;
        const weekdays2 = document.getElementById("weekdays2").value;
        const weekdays3 = document.getElementById("weekdays3").value;

        const { dates1, dates2, dates3 } = getBatchDates(startDate, endDate, weekdays1, weekdays2, weekdays3);

        const documentContent = document.getElementById('documentContent1').innerText.trim();
        const documentRows = documentContent.split('\n');
        for (let i = 0; i < documentRows.length; i++) {
            sheet.getCell(`B${9 + i}`).value = documentRows[i];
        }

        const courseOutcomesContainer = document.getElementById('courseOutcomesContainer');
        const tableRows = courseOutcomesContainer.querySelectorAll('table tr:not(:first-child)'); 
        const startRow = 34;
        const startColumn = 'J';

        tableRows.forEach((row, rowIndex) => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, cellIndex) => {
                const inputField = cell.querySelector('input');
                const cellValue = inputField ? inputField.value.trim() : cell.innerText.trim();
                sheet.getCell(`${String.fromCharCode(startColumn.charCodeAt(0) + cellIndex)}${startRow + rowIndex}`).value = cellValue;
            });
        });

        var batch1Value = document.getElementById('batch1').value;
        var batch2Value = document.getElementById('batch2').value;
        var batch3Value = document.getElementById('batch3').value;

        sheet.getCell('C8').value = batch1Value;
        sheet.getCell('D8').value = batch2Value;
        sheet.getCell('E8').value = batch3Value;

        for (let i = 0; i < Math.min(dates1.length, input5); i++) {
            sheet.getCell(`C${9 + i}`).value = dates1[i];
        }
        for (let i = 0; i < Math.min(dates2.length, input5); i++) {
            sheet.getCell(`D${9 + i}`).value = dates2[i];
        }
        for (let i = 0; i < Math.min(dates3.length, input5); i++) {
            sheet.getCell(`E${9 + i}`).value = dates3[i];
        }

        const inputFields = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6', 'input7', 'input8', 'input9', 'input10'];
        const labels = ['Semester', 'Year', 'Course Title', 'Course Code', 'Total Contact Hours', 'Duration of TEE', 'TEE Marks', 'IA Marks', 'Subject In-charge', 'Course Coordinator'];

        for (let i = 0; i < inputFields.length; i++) {
            const inputId = inputFields[i];
            const row = 9 + Math.floor(i / 2);  
            const col = i % 2 === 0 ? 'J' : 'L';  
            let valueToPrint = labels[i] ? `${labels[i]}: ${document.getElementById(inputId).value}` : document.getElementById(inputId).value;
            sheet.getCell(`${col}${row}`).value = valueToPrint;
        }

        const selectedOption = document.getElementById('input11').value;
        const departmentValue = `Department: ${selectedOption}`;
        sheet.getCell('A5').value = departmentValue;
        sheet.getCell('J5').value = departmentValue;

        const allOutcomes = collectAndStoreOutcomes() || [];
        for (let i = 0; i < allOutcomes.length; i += 2) {
            const colI = 'K';
            const colR = 'T';
            const colH = 'J';
            const row = 19 + i / 2 + 1;
            sheet.getCell(`${colH}${row}`).value = i / 2 + 1;
            sheet.getCell(`${colI}${row}`).value = allOutcomes[i];
            sheet.getCell(`${colR}${row}`).value = allOutcomes[i + 1] || '';
        }

        const updatedData = await workbook.xlsx.writeBuffer();
        const blob = new Blob([updatedData], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        var searchTerm = document.getElementById('input9').value;
        a.href = url;
        a.download = searchTerm + '_lab_session_plan.xlsx';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } catch (error) {
        console.error('Error processing file:', error);
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}



        async function updateAndDownload() {
          var startDateInput = document.getElementById('startDate');
          var endDateInput = document.getElementById('endDate');
          var excelFileInput = document.getElementById('excelFile');
          var resultDiv = document.getElementById('result');

          var startDate = new Date(startDateInput.value);
          var endDate = new Date(endDateInput.value);

          if (startDate > endDate) {
            resultDiv.innerHTML = '<p>End date must be equal to or after the start date.</p>';
            return;
          }

          var file = excelFileInput.files[0];

          if (!file) {
            resultDiv.innerHTML = '<p>Please upload an Excel file.</p>';
            return;
          }

          try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(file);
            const sheet = workbook.getWorksheet(1);


            var dates = getDates(startDate, endDate);
            var listItemNodes = resultDiv.querySelectorAll('li');
            var contentItems = Array.from(listItemNodes).map(item => item.textContent.trim());

            for (var index = 0; index < Math.min(dates.length, contentItems.length, input5); index++) {
              var rowIndex = index + 8;
              var cellRef = 'D' + rowIndex; 
              console.log('Processing index:', index);
              console.log('Cell reference:', cellRef); 
              var cell = sheet.getCell(cellRef);
              var content = contentItems[index];
              cell.value = content;
              cell.numFmt = 'General';
            }

            


             
            let startRow2 = 8;
            let currentNumber = 1;
            

            sheet.getCell(`B${startRow2}`).value = currentNumber;
            
            for (let i = 0; i < cumulativeSums.length; i++) {
                let rowToPlaceNumber = cumulativeSums[i];
                currentNumber++; 
    
                sheet.getCell(`B${rowToPlaceNumber}`).value = currentNumber;
            }






            //DOCUMENTCONTENT1
            function isBold(element) {
                return window.getComputedStyle(element).getPropertyValue('font-weight') === '700'; 
            }



            const tableRows1 = document.getElementById('documentContent1').querySelectorAll('tr');
            const startRow1 = 8;
            const startColumn1 = 'B';


            const logTable = [];
            if (cumulativeSums.length > 0) {
                console.log("cumulativeSums is populated.");
            } else {
                console.log("cumulativeSums is not populated or is empty.");
            }

            const skippedRowsSet = new Set(cumulativeSums);


            function addToLogTable(row, column, content) {
                logTable.push({ Row: row, Column: column, Content: content });
            }


            let currentRow = startRow1;

            let adjustmentCounter = 0;

            for (let rowIndex1 = 1; rowIndex1 < tableRows1.length; rowIndex1++) { 
                const row1 = tableRows1[rowIndex1];
                const cells1 = row1.querySelectorAll('td'); 

                if (skippedRowsSet.has(currentRow)) {
                    adjustmentCounter++;
                    currentRow++; 
                    continue;
                }

                if (cells1.length > 1) { 
                    const cell1 = cells1[1]; 

                    const cellRef = `${String.fromCharCode(startColumn1.charCodeAt(0) + 1)}${currentRow - adjustmentCounter}`;

                    if (!isBold(cell1)) { 
                        const excelCell = sheet.getCell(cellRef);
                        const cellValue = cell1.innerText.trim();
                        if (cellValue !== "") {
                            excelCell.value = cellValue;


                            addToLogTable(currentRow - adjustmentCounter, String.fromCharCode(startColumn1.charCodeAt(0) + 1), cellValue);
                        }
                    }
                }

                currentRow++; 
            }


            console.table(logTable);










            //courseOutcomesContainer
            const courseOutcomesContainer = document.getElementById('courseOutcomesContainer');
            const tableRows = courseOutcomesContainer.querySelectorAll('table tr:not(:first-child)'); 
            const startRow = 34;
            const startColumn = 'G';

            tableRows.forEach((row, rowIndex) => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, cellIndex) => {
                    const inputField = cell.querySelector('input');
                    const cellValue = inputField ? inputField.value.trim() : cell.innerText.trim();
                    sheet.getCell(`${String.fromCharCode(startColumn.charCodeAt(0) + cellIndex)}${startRow + rowIndex}`).value = cellValue;
                });
            });


            //result
            const resultContent = document.getElementById('result').innerText.trim();
            const resultRows = resultContent.split('\n');
            for (let i = 0; i < resultRows.length; i++) {
                sheet.getCell(`E${8 + i}`).value = resultRows[i];
            }



            


            //course plan
            const inputFields = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6', 'input7', 'input8', 'input9', 'input10'];
            const labels = ['Semester', 'Year', 'Course Title', 'Course Code', 'Total Contact Hours', 'Duration of TEE', 'TEE Marks', 'IA Marks', 'Subject In-charge', 'Course Coordinator'];

            for (let i = 0; i < inputFields.length; i++) {
                const inputId = inputFields[i];
                const row = 9 + Math.floor(i / 2);  
                const col = i % 2 === 0 ? 'H' : 'J';  
                let valueToPrint = "";
                if (labels[i]) {
                    valueToPrint = `${labels[i]}: ${document.getElementById(inputId).value}`;
                } else {
                    valueToPrint = document.getElementById(inputId).value;
                }
                sheet.getCell(`${col}${row}`).value = valueToPrint;
            }

            //Department
            const selectedOption = document.getElementById('input11').value;
            const departmentValue = `Department: ${selectedOption}`;
            sheet.getCell('A5').value = departmentValue;
            sheet.getCell('J5').value = departmentValue;


            // allOutcomes 
            const allOutcomes = collectAndStoreOutcomes() || [];

            for (let i = 0; i < allOutcomes.length; i += 2) {
                const colI = 'I';
                const colR = 'R';
                const colH = 'G';
                const row = 19 + i / 2 + 1;  

                
                sheet.getCell(`${colH}${row}`).value = i / 2 + 1;

                
                sheet.getCell(`${colI}${row}`).value = allOutcomes[i];
                sheet.getCell(`${colR}${row}`).value = allOutcomes[i + 1] || '';  
            }




            // Save the workbook and trigger download
            const updatedData = await workbook.xlsx.writeBuffer();
            const blob = new Blob([updatedData], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            var a = document.createElement('a');
            var searchTerm = document.getElementById('input9').value;
            a.href = url;
            a.download = searchTerm + '_session_plan.xlsx';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            } catch (error) {
                console.error('Error processing file:', error);
            }
        }





        function getDates(startDate, endDate) {
          var dates = [];
          var currentDate = startDate;

          while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          return dates;
        }

        







        function createOutcomeTable(outcomes) {
            if (!outcomes || outcomes.length === undefined) {
                console.error('Invalid outcomes array:', outcomes);
                return;
            }

            var container = document.getElementById('courseOutcomesContainer');
            container.innerHTML = '';
            var table = document.createElement('table');
            table.classList.add('table'); 
            var headerRow = table.insertRow(0);
            headerRow.insertCell(0).textContent = 'Serial Number';
            headerRow.insertCell(1).textContent = 'Outcome Description';
            for (var i = 2; i < 16; i++) {
                var columnName;
                if (i >= 2 && i <= 13) {
                    columnName = (i - 1).toString();
                } else if (i === 14) {
                    columnName = 'PS O1';
                } else if (i === 15) {
                    columnName = 'PS O2';
                }
                headerRow.insertCell(i).textContent = columnName;
            }

            var numberOfOutcomes = outcomes.length;
            for (var row = 1; row <= numberOfOutcomes; row++) {
                var outcomeRow = table.insertRow(row);
                outcomeRow.insertCell(0).textContent = row;
                outcomeRow.insertCell(1).textContent = outcomes[row - 1];
                for (var col = 2; col < 16; col++) {
                    var inputCell = outcomeRow.insertCell(col);
                    var inputField = document.createElement('input');
                    inputField.type = 'text';
                    inputField.classList.add('form-control');
                    inputCell.appendChild(inputField);
                }
            }
            container.appendChild(table);
        }

        
        createOutcomeTable();


        document.addEventListener('DOMContentLoaded', function() {
            toggleOutcomeTableVisibility();
        });

        


        function showLoginPopup() {
            document.getElementById("loginPopup").style.display = "flex";
        }

        function hideLoginPopup() {
            document.getElementById("loginPopup").style.display = "none";
        }

        function validateLogin() {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username === "" || password === "") {
                alert("Please enter username and password");
                return false;
            }
            return true;
        }
