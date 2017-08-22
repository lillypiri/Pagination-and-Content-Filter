//When the page loads, your program should hide all but the first 10 students in the list.
var studentsPerPage = 10;
var $students = $('.student-item');
var totalPages = Math.ceil($students.length / studentsPerPage);
var $searchBox = $('.student-search');
$searchBox.html('<input placeholder="Start typing.." /> <button>🔎</button>');
$searchBox.on('click', 'button', function() {
    searchList();
});

// Sticky plugin used for header (not part of functionality or grading content)
$('.page-header').sticky({
    topSpacing: 0,
    getWidthFrom: '.sticky-wrapper',
    responsiveWidth: true
});

// When the page loads, your program should hide all but the first 10 students in the list.
function showPage(pageNum, $matchingStudents) {
    $students.hide();
    // accounts for 0 indexing
    var offset = (pageNum - 1) * studentsPerPage;

    // If we weren't given a list of students then assume we need all students
    if (!$matchingStudents) {
        $matchingStudents = $students;
    }

    for (var i = offset; i < offset + studentsPerPage; i++) {
        $($matchingStudents[i]).show();
    }

    appendPageLinks(pageNum);
}
showPage(1);

/* This function creates the links to the different "pages" or lists of students.
It will call the showPage function to display the proper list of students based on which link the user clicks.
For example, clicking the link to page 1, tells the showPage function to display the first 10 students. */
function appendPageLinks(activePage) {
    //calculates how many pages are needed
    var totalPages = Math.ceil(
        $('.student-item:visible').length / studentsPerPage
    );
    var pageLinks = '';

    for (var i = 1; i <= totalPages; i++) {
        pageLinks +=
            '<li><a class="' +
            (activePage === i ? 'active' : '') +
            '" data-page="' +
            i +
            '">' +
            i +
            '</a>';
    }
    $('.pagination').html('<ul>' + pageLinks + '</ul>');
    // console.log(pageLinks);

    $('.pagination').on('click', 'a', function(event) {
        // console.log("blah clicked", $(event.target).data("page"));
        var $link = $(event.target);
        var pageNum = $link.data('page');
        showPage(pageNum);
        window.scrollTo(0, 0);
        event.preventDefault();
    });
}

/* EXCEEDS function: The function takes a value from the input field, and compares it to each student in the list.
If that value is found inside the name or email of a student, that student is added to a new "matched" list.
If the "matched" list is empty, then display a message that no matching students were found. Otherwise,
call the appendPageLinks function to create new pagination for the search results.
Then call the showPage function to display the first page of matched results.
*/

function searchList() {
    var search = $('input', $searchBox).val().toLowerCase();

    var $matchingStudents = $students.filter(function() {
        return $('.email', this).text().indexOf(search) >= 0;
    });

    // We now have a filtered list of students
    showPage(1, $matchingStudents);
}

/*in the for loop check if the current student has an email in that list and only show it if it does*/

/*
the for loop needs to be the one in the show page thing
you just pass in your list of emails to showPage
and it will do the actual filtering
*/
/* Resources used:
https://learn.jquery.com/events/event-delegation/
*/
