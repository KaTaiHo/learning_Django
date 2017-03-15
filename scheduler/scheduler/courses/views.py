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
import json
# Create your views here.

def get_unique_set():
    json_serializer = serializers.get_serializer("json")()
    dept_name = json_serializer.serialize(Schedule.objects.all().order_by('dept'), ensure_ascii=False)
    data = json.loads(dept_name)
    unique_id_set = set()
    for x in range(0, len(data)):
        unique_id_set.add(data[x]['fields']['dept'])
    unique_id_set = sorted(unique_id_set)
    unique_id_set = json.dumps(unique_id_set)

    return unique_id_set

# list all schedules or create a new one
class ScheduleList(APIView):

    def get(self, request, dept_name, course_id, year_id):
        schedule = Schedule.objects.filter(
            dept=str(dept_name), course_num=str(course_id),
            year = int(year_id)
        )
        serializer = ScheduleSerializer(schedule, many=True)
        return Response(serializer.data)

class UniqueIDList(APIView):
    def get(self, request, unique_id, year_id):
        schedule = Schedule.objects.filter(
            unique=int(unique_id), year=int(year_id)
        )
        serializer = ScheduleSerializer(schedule, many=True)
        return Response(serializer.data)

class HomeView(generic.ListView):
    template_name = 'index.html'
    context_object_name = 'unique_id_set'


    def get_queryset(self):
        return get_unique_set()

