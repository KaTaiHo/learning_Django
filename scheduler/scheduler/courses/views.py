from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule
from .serializers import ScheduleSerializer
from django.views import generic
# Create your views here.

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

    def get_queryset(self):
        pass
