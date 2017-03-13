from django.db import models

# Create your models here.
class Schedule(models.Model):
    year = models.IntegerField()
    dept = models.CharField(max_length=4)
    course_num = models.IntegerField()
    unique = models.IntegerField()
    title = models.CharField(max_length=30)
    instructor = models.CharField(max_length=20)
    days = models.CharField(max_length=6)
    start_time = models.IntegerField()
    end_time = models.IntegerField()
    building = models.CharField(max_length=5)
    room = models.IntegerField()

    def __str__(self):
        return str(self.course_num) + str(self.unique) + str(self.instructor)