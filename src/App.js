import React from "react";
import Todo from "./Todo";
import {Paper, List, Container} from "@material-ui/core";
import './App.css';
import AddTodo from "./AddTodo";
import { call } from "./ApiService";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        items:[], 
      };  
  }


  // 컴포넌트가 랜더링 되고 나서 실행 
  // form onload 성격 
  componentDidMount()  {
    call("/todo/retrieveTodoList", "POST", null)
      .then((response)=>{
          this.setState({items:response.data});
        } 
      );
  }


  // item 추가 함수 
  add = (item) => {
    /*
    const thisItems = this.state.items;
    item.id = "ID_" + thisItems.length; // key를 위한 id 추가 
    item.done = false;  //done초기화 
    thisItems.push(item); //리스트에 아이템 추가 
    this.setState({items:thisItems}); // 엡데이트는 반드시 this.setState로 해야 됨 
    console.log("items : ", this.state.items);
    */
    call("/todo/createTodo", "POST", item)
      .then((response)=>{
          this.setState({items:response.data});
        } 
      );
  }

  // item 삭제 함수 
  delete = (item) => {
    call("/todo/deleteTodo", "POST", item)
      .then((response)=>{
          this.setState({items:response.data});
        } 
      );
    /*
    const thisItems = this.state.items;
    console.log("Before update Items : ", this.state.items);
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({items:newItems}, ()=>{console.log("update Items :", this.state.items)});
    */
  }

  // item 수정 함수 
  update = (item) => {
    call("/todo/updateTodo", "POST", item)
      .then((response)=>{
          this.setState({items:response.data});
        } 
      );
  }

  render() {
    var todoItems = this.state.items.length >  0 && (
      <Paper style={{margin:16}}>
        <List>
          {
            this.state.items.map((item, idx)=>(
              <Todo item={item} key={item.id} delete={this.delete} update={this.update}></Todo>  
            ))
          }  
        </List>
      </Paper>
    );
      
    return(
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    )
  }
}


export default App;
