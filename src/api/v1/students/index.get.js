import db from 'lib/db';

export default function (req, res) {
  db.students.getAllStudents()
    .then((students) => {
      const studentsList = students.map((student) => {
        return {studentId: student}
      }); 
      res.status(200).json({ students: studentsList});
    });
}
