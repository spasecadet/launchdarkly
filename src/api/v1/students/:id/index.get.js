import _ from 'lodash';
import db from 'lib/db';
import {serializeExamResult} from 'lib/serializers';

export default function (req, res) {
  const studentId = req.params.id;
  db.students.getExamsForStudent(studentId)
    .then((exams) => {
      if (_(exams).isEmpty()) {
        res.status(404).json({
          message: `Student ${studentId} could not be found`,
        });
      } else {
        res.status(200).json({
          studentResults: Object.keys(exams).map((examId) => serializeExamResult(examId, exams[examId])),
          average: _(exams).chain().values().mean().value() || 0
        });
      }
    });
}

