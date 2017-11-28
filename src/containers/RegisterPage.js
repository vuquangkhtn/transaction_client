import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import ThemeDefault from '../theme-default';

class RegisterPage extends React.Component {

  handleClick(event){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const vertifyPass = document.getElementById('vertifyPass').value;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    if(password != vertifyPass) {
      alert('Vertify password failed');
      return;
    }
    fetch(proxyurl+"https://nameless-escarpment-79889.herokuapp.com/users",
      {
       method: 'post',
       body: {
        "name":name,
        "email":email,
        "password":password,
        "transactions":[]
       }})
    .then(response => alert('Register Successfully'))
    // .then(data => console.log(data))
    // .then(data => this.setState({users: data}))
    .catch(function(error) {  
      alert('Register failed', error);
    });
   }

  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      },loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
      <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>

              <form>

                <TextField
                  id="name"
                  hintText="Name"
                  floatingLabelText="Name"
                  fullWidth={true}
                  inputRef={val => this.name = val}
                />
                <TextField
                  id="email"
                  hintText="Email"
                  floatingLabelText="Email"
                  fullWidth={true}
                  inputRef={val => this.email = val}
                />

                <TextField
                  id="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  type = "password"
                  fullWidth={true}
                  inputRef={val => this.password = val}
                />
                
                <TextField
                  id="vertifyPass"
                  hintText="Vertify Password"
                  floatingLabelText="Vertify Password"
                  type = "password"
                  fullWidth={true}
                  inputRef={val => this.vertifyPass = val}
                />

                <Divider/>

                <div style={styles.buttons}>
                  <Link to="/login">
                    <RaisedButton label="Cancel"/>
                  </Link>

                  <Link to="/login">
                    <RaisedButton label="Submit"
                        style={styles.saveButton}
                        onClick={(event) => this.handleClick(event)}
                        primary={true}/>
                  </Link>
                </div>
              </form>

            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default RegisterPage;
