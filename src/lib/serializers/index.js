export function serializeExamList(exams) {
  return {
    exams: exams ? Object.keys(exams).map(examId => {
      const exam = exams[examId];
      return {
        examId: examId,
        averageScore: exam.average,
        studentCount: Object.keys(exam.scores).length,
      };
    }) : [],
  }
}

export function serializeExamResult(examId, score) {
  return {
    examId: examId,
    score: score
  }
}

export function serializeStudentResult(studentId, score) {
  return {
    studentId: studentId,
    score: score
  }
}
