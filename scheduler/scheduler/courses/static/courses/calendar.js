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
    $(".modal-body").find(".button").click(function () {
        try {
            var data = $(this).closest('div').attr("id");
            data = JSON.parse(data);
            alert(data);
            var momentTime = getSpecificDate(new Date(), 4).toISOString().slice(0,11);
            var startTime = "";
            var endTime = "";

            if (data['start_time'].toString().length % 2 == 0) {
                startTime = data['start_time'].toString().slice(0,2) + ":" + data['start_time'].toString().slice(2,4);
            }
            else {
                startTime = data['start_time'].toString().slice(0,1) + ":" + data['start_time'].toString().slice(1,3);
            }

            if (data['end_time'].toString().length % 2 == 0) {
                endTime = data['end_time'].toString().slice(0,2) + ":" + data['end_time'].toString().slice(2,4);
            }
            else {
                endTime = data['end_time'].toString().slice(0,1) + ":" + data['end_time'].toString().slice(1,3);
            }

            momentTime = momentTime + startTime + endTime;
            var m = $.fullCalendar.moment(momentTime);
            var event={id:0 , title: data['dept'] + data['course_num'], start:  m};
            $('#calendar').fullCalendar( 'addEvent', event, true);
        }
        catch(err){
            alert(err.message);
        }
    });
 });

function addCalanderEvent(id, start, end, title, colour) {
    var m = $.fullCalendar.moment('2017-03-17T12:00:00-14:00');
    var event={id:1 , title: 'New event', start:  m};
    $('#calendar').fullCalendar( 'addEvent', event, true);
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

function getSpecificDate(d, num) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:num); // adjust when day is sunday
  return new Date(d.setDate(diff));
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
        var newID = JSON.stringify(courseArray[0]);
        $('.modal-body').append(
        "<div id=" + newID + ">" +
        "<p>" + "<strong>Title: </strong>" + courseArray[i]['title'] + "&emsp;<strong>Professor: </strong>" + courseArray[i]['instructor'] +
            "&emsp;<strong>Status: </strong>" + courseArray[i]['status'] + "&emsp;<strong>Course: </strong>" + courseArray[i]['dept'] + courseArray[i]['course_num']
               + "</p>" +
        "<p>" + "<strong>Unique ID: </strong>" + courseArray[i]['id'] + "&emsp;<strong>Days: </strong>" + courseArray[i]['days'] +
            "&emsp;<strong>Time: </strong>" + courseArray[i]['start_time'] + " to " + courseArray[i]['end_time'] + "&emsp;<strong>Location: </strong>" + courseArray[i]['building'] +
              "&emsp;" + courseArray[i]['room'] + "&emsp;&emsp;<button type='button' class='button'>Add This Section</button>" + "</p>" +
        "</div><hr>"
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

