function populateCourseID() {
    var x = document.getElementById("course_id");
    var option = document.createElement("option");
//    {% for data in unique_id_set %}
//        option.text = ("{{data}}");
//        x.add(option);
//    {% endfor %}
}

var initialize_calendar;
initialize_calendar = function() {
    $('#calendar').each(function(){
        var calendar = $(this);
        calendar.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay'
            },
            selectable: true,
            selectHelper: true,
            editable: true,
            eventLimit: true
        });
    })
};

$(window).ready(function() {
    initialize_calendar();

});


