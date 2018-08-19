import React, { Component } from 'react';
import './App.css';
import { getGroupList, addListItem } from './services/requestService.jsx';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Forward from 'material-ui/svg-icons/content/forward';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      header: 'Please make your first selection',
      textInputValue: ''
    };
    getGroupList().then(this.onNewItems);
  }

  onClick = async () => {
    if(this.state.textInputValue.trim() === '') return;
    await addListItem(this.state.textInputValue, this.state.oldId);
    getGroupList(this.state.oldId).then(this.onNewItems);
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
    newList === 'Error' ? this.setState({ isError: true }) :
      this.setState({
        isError: false,
        items: newList,
        header: 'Choose from: ' + this.state.items[index].name,
        oldId: this.state.items[index].id
      });
  }

   handleChange = (event) => {
      this.setState({
        textInputValue: event.target.value,
      });
    };

  render() {
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
          <div style={{ width: '80%', margin: 'auto' } }>
            <List>
              {this.state.items.map((item, index) => (
                <ListItem
                  primaryText={item.name}
                  rightIcon={<Forward />}
                  onClick={() => this.itemChosen(item.id, index)}
                  key={"item-" + index}
                />
              ))}
            </List>
          <div style={{ width: '80%', margin: 'auto', flexDirection: 'row', display: 'flex', alignItems: 'center'} }>
            {this.state.oldId ?
            <button
              style={{height: '50%', margin: 16}}
              onClick={this.onClick}
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
              console.log(index);
              let randItem = this.state.items[index];
              console.log(randItem);
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
