import _ from 'lodash';
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
    const rightId = _.random(3);
    let questionField;
    let objs;
    let i;
    const hasKey = key => o => o[key];
    const hasntKey = key => o => !o[key];

    for(i =0; i< 30; i++) {
      questionField = _.sample(data.questionFieldData)
      const key = questionField.answerField;
      let j = 0;
      for(; j < 30; j++) {
        objs = _.sampleSize(data.objects, 4);
        if (objs.find(hasntKey(key))) continue;
        if ([...new Set(objs.map(hasKey(key)))].length === 4) break;
      }
      if (j < 30) break;
    }
    if (i === 30) return;
    questions.push(
      makeQuestion(id, objs, rightId, questionField, data.extra)
    )
  })
  return questions;
}

