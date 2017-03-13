from ftplib import FTP
import csv
import os
import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scheduler.settings")
django.setup()
from courses.models import Schedule

def fix_input(dept_name):
	if ' ' in str(dept_name):
		dept_name = dept_name.split(' ')
		dept_name = dept_name[0] + dept_name[1]
	return str(dept_name).strip()

def get_pos(name):
	for i, title in enumerate(index_list):
		if (str(title).strip() == str(name)):
			return i

current_dir = os.getcwd()
os.chdir(current_dir)

ftp = FTP('reg-it.austin.utexas.edu')
ftp.login()
ftp.retrbinary('RETR Current_Semester_Report', open('Spring2017.csv', 'wb').write)

log = open('Spring2017.csv', 'r')
save_list = []

count = 0
real_count = 0
time_modified_arr = []
index_list = []
for x, row in enumerate(csv.reader(log, delimiter='\t', quotechar='"')):
	if x > 29:
		count += 1
		save_list.append(row)
	if x == 30:
		index_list = row
	if 'Report of' in row[0]:
		time_modified_arr.append(row)
	real_count +=1

time_modified = str(time_modified_arr[0]).split(' ')[9] + str(time_modified_arr[0]).split(' ')[11]

print (count)
print (real_count)
print (time_modified)

log.close()

log = open('Spring2017.csv', 'w')
writer = csv.writer(log)
for row in save_list:
	writer.writerow(row)
log.close()
print (Schedule.objects.all())
print (get_pos('Days'))
print (get_pos('From'))
print (get_pos('To'))
print (index_list)
for row in save_list[2:]:
	try:
		q = Schedule(year = row[get_pos('Year')], dept = fix_input(row[get_pos('Dept-Abbr')]), course_num = fix_input(row[get_pos('Course Nbr')]),
			unique = row[get_pos('Unique')], title = str(row[get_pos('Title')]).strip(), instructor = fix_input(row[get_pos('Instructor')]),
			days = row[get_pos('Days')], start_time = row[get_pos('From')], end_time = row[get_pos('To')], 
			building = row[get_pos('Building')], room = row[get_pos('Room')])
		# print (q)
		q.save()
	except:
		pass
print (Schedule.objects.all())
