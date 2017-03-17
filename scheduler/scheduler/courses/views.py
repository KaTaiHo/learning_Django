from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule
from .serializers import ScheduleSerializer
from django.views import generic
from django.core import serializers
from django.shortcuts import render_to_response
from collections import defaultdict
from django.http import HttpResponse
import json
# Create your views here.

def get_unique_set():
    json_serializer = serializers.get_serializer("json")()
    dept_name = json_serializer.serialize(Schedule.objects.all().order_by('dept'), ensure_ascii=False)
    data = json.loads(dept_name)
    d = defaultdict(list)
    unique_id_set = set()
    myset = set()
    current_dept = ""
    for x in range(0, len(data)):
        unique_id_set.add(str(data[x]['fields']['dept']))

        if str(data[x]['fields']['dept']) != current_dept:
            current_dept = str(data[x]['fields']['dept'])
            myset.clear()
        if data[x]['fields']['course_num'] in myset:
            pass
        else:
            d[str(data[x]['fields']['dept'])].append(data[x]['fields']['course_num'])
            myset.add(data[x]['fields']['course_num'])

    unique_id_set = sorted(unique_id_set)
    unique_id_set = json.dumps(unique_id_set)

    d = json.dumps(d)
    return unique_id_set, d

# list all schedules or create a new one
class ScheduleList(APIView):

    def get(self, request, dept_name, course_id, year_id):
        schedule = Schedule.objects.filter(
            dept=str(dept_name), course_num=str(course_id),
            year = int(year_id)
        )
        json_serializer = serializers.get_serializer("json")()
        response = json_serializer.serialize(schedule, ensure_ascii=False)
        return HttpResponse(response, content_type="application/json")
        #serializer = ScheduleSerializer(schedule, many=True)
        # return Response(serializer.data)

class UniqueIDList(APIView):
    def get(self, request, unique_id, year_id):
        schedule = Schedule.objects.filter(
            unique=int(unique_id), year=int(year_id)
        )
        json_serializer = serializers.get_serializer("json")()
        response = json_serializer.serialize(schedule, ensure_ascii=False)
        return HttpResponse(response, content_type="application/json")
        #serializer = ScheduleSerializer(schedule, many=True)
        # return Response(serializer.data)

def index(request):
    unique_id_set, course_number = get_unique_set()

    context = {
        'unique_id_set': unique_id_set,
        'course_number': course_number
    }

    return render(request, 'courses/index.html', context)



