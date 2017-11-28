import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';

class TransactionDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    };
  }

  componentDidMount() {
    if(Data.user.email == null) {
        browserHistory.push('/login');
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://nameless-escarpment-79889.herokuapp.com/user/"+Data.user.email)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => this.setState({user: data}))
    .catch(function(error) {  
      console.log('Request failed', error);
    });
  }

  render() {
    const transactions = this.state.user.transactions;
    console.log( this.state.users[0]);
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      editButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: '10%'
        },
        name: {
          width: '40%'
        },
        price: {
          width: '20%'
        },
        category: {
          width: '20%'
        },
        edit: {
          width: '10%'
        }
      }
    };
    return (
      <PageBase title="Transaction Detail"
                navigation="Application / Transaction Detail">

        <div>
          <Link to="/addTransaction" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.name}>Receiver</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>Amount</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(item =>
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.name}>{item.emailReceiver}</TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>{item.amountTransaction}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>    
        </div>
      </PageBase>
    );
  }
}

export default TransactionDetailPage;
