import _ from 'lodash';
import db from 'lib/db';
import {serializeStudentResult} from 'lib/serializers';

export default function (req, res) {
  const examId = req.params.id;
  db.exams.getExam(examId)
    .then((exam) => {
      if (_(exam).isEmpty()) {
        res.status(404).json({
          message: `Exam ${examId} could not be found`,
        });
      } else {
        res.status(200).json({
          examResults:
            _(exam.scores)
              .chain()
              .toPairs()
              .map(([studentId, score]) => {
                return serializeStudentResult(studentId, score);
              })
              .value(),
          average: exam.average || 0,
        });
      }
    });
}

