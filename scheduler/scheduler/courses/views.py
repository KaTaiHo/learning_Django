from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule
from .serializers import ScheduleSerializer
# Create your views here.

# list all schedules or create a new one
class ScheduleList(APIView):

    def get(self, request):
        schedule = Schedule.objects.all()
        serializer = ScheduleSerializer(schedule, many = True)
        return Response(serializer.data)

    def post(self):
        pass