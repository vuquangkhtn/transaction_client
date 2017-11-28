import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Data from '../data';

class AddTransactionPage extends React.Component {
constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(Data.user.email == null) {
        browserHistory.push('/login');
    }
  }
  handleClick(event){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://nameless-escarpment-79889.herokuapp.com/users/"+Data.user.email,
      {
       method: 'post',
       body: {
         "emailReceiver":this.email,
         "amountTransaction":this.amount
       }})
    .then(response => alert('Add Transaction Successfully'))
    // .then(data => console.log(data))
    // .then(data => this.setState({users: data}))
    .catch(function(error) {  
      alert('Request failed', error);
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
      }
    };

    return (
      <PageBase title="Add Transaction"
                navigation="Application / Add Transaction">
        <form>

          <TextField
            hintText="Email receiver"
            floatingLabelText="Email receiver"
            fullWidth={true}
            inputRef={val => this.email = val}
          />

          <TextField
            hintText="Amount"
            floatingLabelText="Amount"
            fullWidth={true}
            inputRef={val => this.amount = val}
          />

          <Divider/>

          <div style={styles.buttons}>
            <Link to="/">
              <RaisedButton label="Cancel"/>
            </Link>

            <Link to="/transactionDetail">
              <RaisedButton label="Save"
                style={styles.saveButton}
                onClick={(event) => this.handleClick(event)}
                primary={true}/>
            </Link>
          </div>
        </form>
      </PageBase>
    );
  };
}

export default AddTransactionPage;
