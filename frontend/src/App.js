import React, { Component } from 'react';
import './App.css';
import { getGroupList, addListItem, editListItem, removeListItem } from './services/requestService.jsx';
import {List, ListItem} from 'material-ui/List';
import { ListItemTwo } from './UI/ListItem.jsx';
import TextField from 'material-ui/TextField';
import Forward from 'material-ui/svg-icons/content/forward';
import RCircle from 'material-ui/svg-icons/content/remove-circle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import PressableIcon from './UI/PressableIcon.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { getMuiTheme } from 'material-ui/styles';
import { cyan300, blue500, green900 } from 'material-ui/styles/colors';
import Header from './UI/Header.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      header: 'Please make your first selection',
      textInputValue: '',
      prevTitles: ['Please make your first selection'],
      oldItems: [],
      selectedId: -1
    };
    getGroupList().then(this.onNewItems);
    this.theme = getMuiTheme({
      palette: {
        accent1Color: green900,
        primary1Color: blue500,
        secondary: {
          main: '#f44336',
        },
      },
    });
  }

  onClick = async () => {
    let parentId = this.state.oldIds ? this.state.oldIds[this.state.oldIds.length - 1] : null;
    this.state.editing ? this.onEditSave(parentId) : this.onAdd(parentId);
    //modify to edit as well as create
    //this.state.editing is true, then await editListItem
    this.setState({ textInputValue: '', selectedId: -1, editing: false });
    this.revertHeader();
  }

  onEditSave = async (parentId) => {
    if(this.state.selectedId < 0) return; //sentinel value
    if(this.state.textInputValue.trim() === '') return;
    await editListItem(this.state.textInputValue, this.state.selectedId, parentId);
    getGroupList(parentId).then(this.onNewItems);
    this.revertHeader();
  }

  onAdd = async (parentId) => {
    if(this.state.textInputValue.trim() === '') return;
    await addListItem(this.state.textInputValue, parentId);
    getGroupList(parentId).then(this.onNewItems);
  }

  onNewItems = (newItems) => {
      newItems === 'Error' ? this.setState({ isError: true }) :
        this.setState({
          isError: false,
          items: newItems
        });
  }

  itemChosen = async (id, index) => {
    if(this.state.editing) {
      this.setState({ selectedId: id });
      this.addHeader("Either save a new name or delete the item");
      return;
    }
    let newList = await getGroupList(id);
    if(newList === 'Error') {
      this.setState({ isError: true });
    } else {
      var baseIds = this.state.oldIds || [];
      var prevTitles = this.state.prevTitles || [];
      this.addHeader('Choose from: ' + this.state.items[index].name);
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

  revertHeader = () => {
    var prevTitles = [...this.state.prevTitles];
    let prevTitle = prevTitles.pop();
    this.setState({
      header: prevTitle,
      prevTitles
    });
  }

  addHeader = (header) => {
    let prevTitles = this.state.prevTitles || [];
    this.setState({
      header,
      prevTitles: [...prevTitles, this.state.header]
    });
  }

  handleChange = (event) => {
    this.setState({
      textInputValue: event.target.value,
    });
  };

  makeRandomChoice = () => {
    if(!this.state.items || !this.state.items.length) return;
    let index = Math.floor(Math.random() * this.state.items.length);
    let randItem = this.state.items[index];
    this.itemChosen(randItem.id, index)
  }

  deleteSelected = async () => {
    if(this.state.selectedId < 0) {
      //do nothing
      return;
    }
    this.onNewItems(await removeListItem(this.state.selectedId));
    this.revertHeader();
    this.revertHeader();
    this.setState({ editing: false });
  }

  onCancel = () => {
    this.revertHeader();
    if(this.state.selectedId < 0) {
      this.revertHeader();
    }
    this.setState({
      editing: false,
      textInputValue: '',
      selectedId: -1
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.theme}>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Header
            theme={this.theme}
            header={this.state.header}
          />
          <p className="App-intro">
            Make a selection, add a selection, or have it choose for you!
          </p>
          <div style={{ width: '60%', margin: 'auto' } }>
            <List>
              {this.state.items.map((item, index) => (
                  <ListItem
                    primaryText={item.name}
                    style={{fontSize: 25}}
                    onClick={() => this.itemChosen(item.id, index)}
                    key={"item-" + index}
                  />
              ))}
            </List>
            <div
              style={{
                width: '80%',
                margin: 'auto',
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center'
              }}
            >
            {this.state.oldIds && this.state.oldIds.length ?
              <RaisedButton
                primary
                backgroundColor={this.theme.palette.primary1Color}
                label="Back"
                style={{margin: 16}}
                onClick={this.goBack}
              />
             : null}
             <TextField
               style={{width: '80%'}}
               hintText={this.state.editing ? "Enter new name here" : "Add a new one"}
               fullWidth={false}
               value={this.state.textInputValue}
               onChange={this.handleChange}
             />
              <RaisedButton
                backgroundColor={this.theme.palette.primary1Color}
                secondary
                label={this.state.editing ? "Save" : "Add"}
                style={{margin: 16}}
                onClick={this.onClick}
              />
            </div>
          </div>
            <div
              style={{
                justifyContent: 'space-between'
              }}>
              <RaisedButton
                primary
                label={this.state.editing ? "Cancel" : "Edit"}
                disabled={!this.state.items.length}
                style={{margin: 12}}
                backgroundColor={'#222'}
                onClick={() => {
                  if(this.state.editing) {
                    this.onCancel();
                  } else {
                    this.setState({editing: this.state.editing ? false : true})
                    this.addHeader("Please select an item to edit");
                  }
                }}
              />
              <RaisedButton
                backgroundColor={'#bfb800'}
                secondary
                label={this.state.editing ? "Delete" : "Choose for Me"}
                style={{margin: 12}}
                onClick={this.state.editing ? this.deleteSelected : this.makeRandomChoice}
                disabled={
                  this.state.editing && this.state.selectedId > 0 && this.state.items.filter(item => item.id === this.state.selectedId)[0].numChildren > 0
                }
              />
          </div>
        </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
