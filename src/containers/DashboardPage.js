import React from 'react';
import {browserHistory} from 'react-router';
import {pink600, purple600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../components/dashboard/InfoBox';
import RecentTransaction from '../components/dashboard/RecentTransaction';
import globalStyles from '../styles';
import Data from '../data';

class DashboardPage extends React.Component {
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
    const user = this.state.user;
    console.log();
    return (
      <div>
        <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <InfoBox Icon={ShoppingCart}
                     color={pink600}
                     title="Total Money"
                     value={user.amountWallet+''}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <InfoBox Icon={Assessment}
                     color={purple600}
                     title="Total transaction"
                     value={user.transactions.length+''}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
            <RecentTransaction data={user.transactions}/>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
