$(document).ready(function() {
    var studentsPerPage = 10;
    var $students = $(".student-item");

    // Add a search box
    var $searchBox = $(".student-search");
    $searchBox.html(
        '<input placeholder="Start typing.." /> <button>🔎</button>'
    );
    $searchBox.on("click", "button", function() {
        searchList();
    });
    $searchBox.on("keyup", "input", function() {
        searchList();
    });

    function showPage(pageNum, $matchingStudents) {
        $students.hide();

        // accounts for 0 indexing
        var offset = (pageNum - 1) * studentsPerPage;

        // If we weren't given a list of students then assume we need all students
        $matchingStudents = $matchingStudents || $students;
        $matchingStudents.slice(offset, offset + studentsPerPage).show();

        appendPageLinks(pageNum, $matchingStudents);
    }

    // appends the pagination links/buttons
    function appendPageLinks(activePage, $matchingStudents) {
        var totalPages = Math.ceil($matchingStudents.length / studentsPerPage);
        if (totalPages === 1) {
            $(".pagination").html("");
            return;
        }
        var pageLinks = "";
        for (var i = 1; i <= totalPages; i++) {
            pageLinks +=
                '<li><a class="' +
                (activePage === i ? "active" : "") +
                '" data-page="' +
                i +
                '">' +
                i +
                "</a>";
        }
        $(".pagination").html("<ul>" + pageLinks + "</ul>");
        $(".pagination").on("click", "a", function(event) {
            event.preventDefault();

            showPage($(event.target).data("page"), $matchingStudents);

            // Scroll to the top
            window.scrollTo(0, 0);
        });
    }

    // search function. returns alert if no matching students.
    function searchList() {
        var search = $("input", $searchBox).val().toLowerCase();
        var $matchingStudents = $students.filter(function() {
            return $(".email", this).text().indexOf(search) >= 0;
        });
        if ($matchingStudents.length === 0) {
            $(".no-students").text("No students match that query. Try again.");
        } else {
            $(".no-students").text("");
        }
        // We now have a filtered list of students
        showPage(1, $matchingStudents);
    }

    showPage(1);

    // sticky plugin used for header (not part of functionality or grading content)
    $(".page-header").sticky({
        topSpacing: 0,
        getWidthFrom: ".sticky-wrapper",
        responsiveWidth: true
    });
});
