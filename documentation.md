have only one JSON file with all lessons inside? this way i can link to other aspects of the course

## Structure of the lesson
- id
- course
- - id
- - name
- - path
- - date
- title
- date
- topic <== TOPIC
- - concept
- - tag
- - notes
- - prep
- - - tag
- - - text
- - - type
- - writeups

## Structure of the folder
- / root (the value of path)
- - course_name/
- - - lessons/
- - - - lesson_name/
- - - - - lesson_name.json
- - - - - media/
- - - - - other/
- - - - exports/

=> ideally this whole shit would be a single file! (npm decompress-zip)
