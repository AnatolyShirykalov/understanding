import React, {Component} from 'react';
import classes from './index.css';
import Input from './Input';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';

class New extends Component {
  state = {
    questionFieldData: [{name: "", type: "text", answerField: ""}],
    title: "",
  }

  addData = () => {
    this.setState({
      questionFieldData: [...this.state.questionFieldData, {name: "", answerField: "", type: "text"}],
    })
  }

  removeData = j => () => {
    this.setState({
      questionFieldData: [...this.state.questionFieldData].filter((d,i)=>i!==j),
    });
  }

  changeInput = (key, field) => ({target: {value}}) => {
    this.setState({
      questionFieldData: this.state.questionFieldData.map((data, i)=>(
        i === key ? {...data, [field]: value} : data
      )),
    })
  }

  dataInvalid() {
    const fd = this.state.questionFieldData;
    console.log(fd);
    const blank = x => !x || typeof(x.length) !== 'number' || x.length < 1;
    try {
      if (blank(fd)) throw new Error("Нужен хотя бы один тип вопроса");
      if (fd.find(d=>blank(d.name) || blank(d.answerField)) || blank(this.state.title))
        throw new Error("Все поля должны быть заполнены");
      if (!this.state.file) throw new Error("Нужен CSV-файл с объектами");
      if (fd.find(d=>d.type === 'image' && !this.state.arch))
        throw new Error("Нужен архив с фото");

      return false;
    } catch (er) {
      this.props.setError(er.message);
      return true;
    }
  }
  submit = e => {
    e.preventDefault();
    if (this.dataInvalid()) return false;
    const data = new FormData();
    data.append("questionFieldData", JSON.stringify(this.state.questionFieldData));
    data.append("file", this.state.file);
    data.append("arch", this.state.arch);
    data.append("title", this.state.title);
    this.props.send(data);
    return false;
  }

  changeFile = e => this.setState({file: e.target.files[0]});
  changeArch = e => this.setState({arch: e.target.files[0]});
  changeTitle = e => this.setState({title: e.target.value});
  render() {
    return (
      <div>
        <h1>Создать новый тест</h1>
        <form onSubmit={this.submit} className={classes.Form}>
          <button className={classes.Submit} type="submit">Сохранить</button>
          <div className={classes.Wrap}>
            <div className={classes.Global}>
              <div className={classes.Title}>
                <label htmlFor="title">Название теста</label>
                <input id="title" value={this.state.title} onChange={this.changeTitle}/>
              </div>
              <div>
                <label htmlFor="file">CSV-файл с объектами</label>
                <input id="file" type="file" onChange={this.changeFile}/>
              </div>
              <div>
                <label htmlFor="arch">ZIP-архив с png-картинками</label>
                <input id="arch"  type="file" onChange={this.changeArch}/>
              </div>
            </div>
          </div>
          <div>
            <button className={classes.Add} type="button" onClick={this.addData}>Добавить тип вопроса</button>
          </div>
          <div className={classes.ItemsWrap}>
            {this.state.questionFieldData.map((data, key)=>(
              <div className={classes.Item} key={key}>
                <div className={classes.Left}>
                  <Input ind={key} name="name" title="Поле вопроса" change={this.changeInput} data={data} />
                  <Input ind={key} name="type" title="Тип поля вопроса" change={this.changeInput} data={data} tag="select" options={["text", "html", "image"]}/>
                  <Input ind={key} name="answerField" title="Поле ответа" change={this.changeInput} data={data} />
                </div>
                <div className={classes.Right}>
                  <button type="button" onClick={this.removeData(key)}>X</button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  send: data => dispatch(actions.sendNewTest(data)),
  setError: error => dispatch(actions.setCurrentError(error)),
})

export default connect(null, mapDispatchToProps)(New);
