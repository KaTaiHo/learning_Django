from django.db import models

# Create your models here.
class Schedule(models.Model):
    year = models.IntegerField()
    dept = models.CharField(max_length=3)
    course_num = models.CharField(max_length=4)
    unique = models.IntegerField()
    title = models.CharField(max_length=50)
    instructor = models.CharField(max_length=30)
    days = models.CharField(max_length=6)
    start_time = models.IntegerField()
    end_time = models.IntegerField()
    building = models.CharField(max_length=5)
    room = models.CharField(max_length=7)
    status = models.CharField(max_length=12, default="unknown")

    def __str__(self):
        return str(self.dept) + str(self.course_num) + str(self.year)