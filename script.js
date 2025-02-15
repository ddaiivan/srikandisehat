document.addEventListener('DOMContentLoaded', function() {
    const reminderButton = document.getElementById('reminderButton');
    let calendarDiv = null; // Store the calendar div to show/hide

    reminderButton.addEventListener('click', function() {
        if (calendarDiv) {
            // If calendar exists, toggle visibility
            calendarDiv.style.display = calendarDiv.style.display === 'none' ? 'block' : 'none';
        } else {
            // If calendar doesn't exist, create it
            createCalendar();
        }
    });

    function createCalendar() {
        calendarDiv = document.createElement('div');
        calendarDiv.id = 'calendar';
        calendarDiv.classList.add('calendar-container'); // Add a class for styling
        calendarDiv.style.display = 'none'; // Hide the calendar initially
        document.querySelector('.card').appendChild(calendarDiv); // Append after the button

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        renderCalendar(currentMonth, currentYear);

        // Add the "Lakukan SADARI setiap awal bulan" text
        const sadariText = document.createElement('p');
        sadariText.textContent = "";
        const strongText = document.createElement('strong');
        strongText.textContent = "Lakukan SADARI setiap awal bulan";
        sadariText.appendChild(strongText);
        sadariText.classList.add('text-center', 'text-gray-700', 'mt-2'); // Add styling classes
        calendarDiv.appendChild(sadariText);
    }

    function renderCalendar(month, year) {
        let firstDay = (new Date(year, month)).getDay();
        let daysInMonth = 32 - new Date(year, month, 32).getDate();

        let tbl = document.createElement('table');
        tbl.classList.add('calendar'); // Add a class for styling
        let caption = tbl.createCaption();
        caption.textContent = getMonthName(month) + ' ' + year;
        caption.classList.add('calendar-caption');

        // Create header row
        let thead = tbl.createTHead();
        let headerRow = thead.insertRow();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let day of days) {
            let th = document.createElement("th");
            th.textContent = day;
            headerRow.appendChild(th);
        }


        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = tbl.insertRow();
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = row.insertCell();
                    cell.textContent = "";
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = row.insertCell();
                    cell.textContent = date;
            if (date >= 1 && date <= 3) {
                cell.classList.add('sadari-day-highlight');
            }
                    date++;
                }
            }
        }

        calendarDiv.innerHTML = ''; // Clear previous calendar
        calendarDiv.appendChild(tbl);

        // Add navigation buttons
        addNavigationButtons(month, year);
    }

    function getMonthName(month) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month];
    }

    function addNavigationButtons(currentMonth, currentYear) {
        let prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.classList.add('calendar-button');
        prevButton.addEventListener('click', function() {
            renderCalendar(currentMonth - 1, currentYear);
        });

        let nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('calendar-button');
        nextButton.addEventListener('click', function() {
            renderCalendar(currentMonth + 1, currentYear);
        });

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('calendar-nav');
        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(nextButton);
        calendarDiv.appendChild(buttonContainer);
    }
});
