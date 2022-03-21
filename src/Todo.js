import React from "react";
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
class Todo extends React.Component {

    constructor(props){
        super(props);
        this.state = {item:props.item, readOnly:true};
        this.delete = props.delete;  
        this.update = props.update;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

    // readonly false함수 추가 
    offReadOnlyMode = () => {
        console.log("Event!" , this.state.readOnly);
        this.setState({readOnly:false}, ()=>{console.log("ReadOnly?", this.state.readOnly)});
    }

    // 엔터키를 누르면 readonly모드 활성화 
    enterKeyEventHandler = (e) => {
        if(e.key === "Enter"){
            this.setState({readOnly:true});
            this.update(this.state.item); 
        }
    }

    // 타이틀 수정시 처리 함수 
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item:thisItem});
        console.log("update item : " ,  this.state.item); 
    }

    // 체크 박스 처리 함수 
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({item:thisItem});
        this.update(this.state.item); 
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} onClick={this.checkboxEventHandler}/>
                <ListItemText>
                    <InputBase 
                        inputProps={{"aria-label":"naked", readOnly:this.state.readOnly,}}
                        type = "text"
                        id = {item.id}          // 각  리스트를 구분하려고 id 연결 
                        name = {item.id}        // 각  리스트를 구분하려고 id 연결 
                        value = {item.title}
                        multiline={false}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onKeyUp={this.enterKeyEventHandler}  
                        onChange={this.editEventHandler}                 
                    />
                </ListItemText>    
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={this.deleteEventHandler}>
                        <DeleteOutline/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;