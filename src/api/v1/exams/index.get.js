import db from 'lib/db';
import { serializeExamList } from 'lib/serializers';

export default function (req, res) {
  db.exams.getAllExams()
    .then((exams) => {
      res.status(200).json(serializeExamList(exams));
    });
}

