import _ from 'lodash';
const validQuestionFields = (fieldData, obj, extra) => {
  if (!extra || Object.keys(extra).length === 0) return fieldData;
  return _.filter(fieldData, (datum) => {
    if (datum.answerField) return true;
    if (!(extra[datum.extraSource][obj[datum.name]])) return false;
    return true;
  })
}

const makeAnswers = (objs, rightId, questionField, extra) => {
  const key = questionField.extraSource;
  if (!extra || !key || !extra[key]) {
    return _.map(objs, (obj, id) => { return {
      id,
      value: obj[questionField.answerField],
      right: id === rightId,
      wrong: id !== rightId
    }})
  }
  const store  = extra[key]
  const value  = store[objs[rightId][questionField.name]]
  const values = _.shuffle(_.concat(_.sampleSize(
    _.filter(_.uniq(_.values(store)), (v) => v !== value ),
    objs.length - 1
  ), value))
  return _.map(values, (v, id) => {
    return {id, value: v, right: value===v, wrong: value !== v}
  })
}

const makeQuestion = (id, objs, rightId, questionField, extra) => {
  return Object.assign({}, {
    id,
    answers: makeAnswers(objs, rightId, questionField, extra),
    [questionField.type]: objs[rightId][questionField.name]
  })
}

export const ObjectTest = (data, options = {}) => {
  const limit = options.limit || 20;
  let questions = [];
  _.range(limit).forEach ((id)=>{
    const objs = _.sampleSize(data.objects, 4);
    const rightId = _.random(3);
    const questionField = _.sample(
      validQuestionFields(
        data.questionFieldData,
        objs[rightId],
        data.extra
      )
    );
    questions.push(
      makeQuestion(id, objs, rightId, questionField, data.extra)
    )
  })
  return questions;
}

