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
    $('#display-course').click(displayCourse);
    $('#myModal .close').click(closeModal);
 });

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

function displayCourse() {
    $('.modal-body').empty();
    var arg1 = $('#course_id :selected').text();
    var arg2 = $('#course_num :selected').text();
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://138.197.115.22:8000/api/" + arg1 + "/" + arg2 + "/2017", false );
    xmlHttp.send(null);
    var courseArray = JSON.parse(xmlHttp.responseText);
    for (i = 0; i < courseArray.length; i++) {
        $('.modal-body').append(
        "<div>" +
        "<p>" + "<strong>Title: </strong>" + courseArray[i]['title'] + "&emsp;<strong>Professor: </strong>" + courseArray[i]['instructor'] +
            "&emsp;<strong>Status: </strong>" + courseArray[i]['status'] + "&emsp;<strong>Course: </storng>" + courseArray[i]['dept'] + courseArray[i]['course_num']
              + "</p>" +
        "<p>" + "<strong>Unique ID: </strong>" + courseArray[i]['id'] + "<strong>Days: </strong>" + courseArray[i]['days'].trim() +
            "<strong>Time: </strong>" + course[i]['start_time'] + " to " + course[i]['end_time'] + "<strong>Location: </strong>" + course[i]['building'] +
            "&emsp;" + course[i]['room'].trim()
        + "</p>" +
        "</div>"
        );
    }
    //alert(xmlHttp.responseText);
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

function deleteCourseList() {
    $("#course_num").empty();
    $("#course_num").selectpicker("refresh");
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

