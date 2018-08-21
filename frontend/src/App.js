import React, { Component } from 'react';
import './App.css';
import { getGroupList, addListItem } from './services/requestService.jsx';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Forward from 'material-ui/svg-icons/content/forward';
import RCircle from 'material-ui/svg-icons/content/remove-circle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import PressableIcon from './UI/PressableIcon.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      header: 'Please make your first selection',
      textInputValue: '',
      prevTitles: ['Please make your first selection'],
      oldItems: []
    };
    getGroupList().then(this.onNewItems);
  }

  onClick = async () => {
    if(this.state.textInputValue.trim() === '') return;
    let parentId = this.state.oldIds ? this.state.oldIds[this.state.oldIds.length - 1] : null;
    await addListItem(this.state.textInputValue, parentId);
    getGroupList(parentId).then(this.onNewItems);
    this.setState({ textInputValue: '' });
  }

  onNewItems = (newItems) => {
      newItems === 'Error' ? this.setState({ isError: true }) :
        this.setState({
          isError: false,
          items: newItems
        });
  }

  itemChosen = async (id, index) => {
    let newList = await getGroupList(id);
    if(newList === 'Error') {
      this.setState({ isError: true });
    } else {
      var baseIds = this.state.oldIds || [];
      var prevTitles = this.state.prevTitles || [];
      this.setState({
        isError: false,
        items: newList,
        header: 'Choose from: ' + this.state.items[index].name,
        oldIds: [...baseIds, this.state.items[index].id],
        oldItems: [...this.state.oldItems, this.state.items],
        prevTitles: [...prevTitles, this.state.header]
      });
    }
  }

  goBack = () => {
    var oldIds = [...this.state.oldIds];
    var prevTitles = [...this.state.prevTitles];
    var oldItems = [...this.state.oldItems];
    oldIds.pop();
    let prevTitle = prevTitles.pop();
    let prevItems = oldItems.pop();
    this.setState({
      isError: false,
      items: prevItems,
      oldItems: oldItems,
      oldIds: oldIds,
      header: prevTitle,
      prevTitles: prevTitles
    });
    getGroupList(oldIds.length ? oldIds[ oldIds.length - 1] : null).then(this.onNewItems);
  }

   handleChange = (event) => {
      this.setState({
        textInputValue: event.target.value,
      });
    };

  render() {
    //TODO: center align text for list items
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <FontAwesomeIcon icon={faClipboard} size="3x" />
            <h1 className="App-title">Decision Maker!</h1>
          </header>
          <h1> {this.state.header} </h1>
          <p className="App-intro">
            Make a selection, add a selection, or have it choose for you!
          </p>
          <div style={{ width: '60%', margin: 'auto' } }>
            <List>
              {this.state.items.map((item, index) => (
                <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}
                  key={"wrapper-div:" + index}
                >
                <PressableIcon
                  key={"pIcon-" + index}
 onClick={() => console.log("pressed")}>
                  <RCircle
                    key={"delete-icon-" + index}
                  />
                </PressableIcon>
                <ListItem
                  primaryText={item.name}
                  rightIcon={<Forward />}
                  style={{fontSize: 25}}
                  onClick={() => this.itemChosen(item.id, index)}
                  key={"item-" + index}
                />
                <div key={"emptyDiv-" + index}></div>
              </div>
              ))}
            </List>
          <div style={{ width: '80%', margin: 'auto', flexDirection: 'row', display: 'flex', alignItems: 'center'} }>
            {this.state.oldIds && this.state.oldIds.length ?
            <button
              style={{height: '50%', margin: 16}}
              onClick={this.goBack}
            >
              back
            </button> : null}
              <TextField style={{width: '80%'}} hintText="add a new one" fullWidth={false} value={this.state.textInputValue} onChange={this.handleChange}/>
            <button
              style={{height: '50%', margin: 16}}
              onClick={this.onClick}
            >
              Add
            </button>
            </div>
          </div>
          <button
            onClick={() => {
              if(!this.state.items || !this.state.items.length) return;
              let index = Math.floor(Math.random() * this.state.items.length);
              let randItem = this.state.items[index];
              this.itemChosen(randItem.id, index)
            }}
          >
            Choose for me!
          </button>
        </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
