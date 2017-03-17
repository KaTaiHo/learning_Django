function populateCourseID() {
    var course_list = document.getElementById("course_id");
    var option = document.createElement("option");
    var converted = course_list.getAttribute('name');
    var converted = JSON.parse(converted);
    for (step = 0; step < converted.length; step++) {
        course_list.options[course_list.options.length] = new Option(converted[step]);
    }
}

var sel = document.getElementById('course_id');

$(document).ready(function() {
    $('#course_id').change(updateCourseList);
    $('#add-courses').click(displayCourse);
 });

function deleteCourseList() {
    $("#course_num").empty();
    $("#course_num").selectpicker("refresh");
}

function displayCourse() {
    var courseID = $('#course_id').find(":selected").text();
    var courseNum = $('#course_num').find(":selected").text();

}

function updateCourseList() {
    try {
        deleteCourseList();

        var selected = sel.options[sel.selectedIndex].value;
        var course_list = document.getElementById("course_num");
        var converted = course_list.getAttribute('name');
        var converted = JSON.parse(converted);

        for (step = 0; step < converted[selected].length; step++) {
            $("#course_num").append('<option value="'+step+'" selected="">'+converted[selected][step]+'</option>');
        }
        $("#course_num").selectpicker("refresh");
    }
    catch(err) {
        alert(err.message);
    }
}

var initialize_calendar;
initialize_calendar = function() {
    $('#calendar').each(function(){
        var calendar = $(this);
        calendar.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'agendaWeek, month, agendaDay'
            },

            selectable: true,
            selectHelper: true,
            editable: true,
            eventLimit: true,
            defaultView: 'agendaWeek'
        });
    })
};

$(window).ready(function() {
    initialize_calendar();
    populateCourseID();
    updateCourseList();
});

