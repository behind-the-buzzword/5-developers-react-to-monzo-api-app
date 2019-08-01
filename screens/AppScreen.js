import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Button, ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as authActions } from "../ducks/auth";
import { actions as accountsActions } from "../ducks/accounts";

export class AppScreen extends Component {

  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })).isRequired,
    busy: PropTypes.bool.isRequired,
    getAccounts: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    error: PropTypes.shape({
      code: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  }

  componentDidMount() {
    this.props.getAccounts();
  }

  componentWillReceiveProps(props) {
    if (props.error && props.error.code === "bad_request.invalid_token") {
      this.props.logout();
    }
  }

  render() {
    const { busy, accounts } = this.props;

    return (
      <View style={styles.container}>
        {busy ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <Text style={styles.header}>Accounts</Text>
            {accounts.map((account, i) => (
              <Text key={i} style={styles.account}>{account.description}</Text>
            ))}
          </>
        )}
        <View style={styles.logoutContainer}>
          <Button style={styles.logout} title="Log Out" onPress={this.handleLogout} />
        </View>
      </View>
    );
  }

  handleLogout = () => {
    this.props.logout();
  }

}

const mapStateToProps = state => ({
  accounts: state.accounts.items,
  busy: state.accounts.busy,
  error: state.accounts.error,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
  ...accountsActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#043C95",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fefefe",
    marginBottom: 10,
  },
  account: {
    margin: 5,
    padding: 10,
    backgroundColor: "#E64B5F",
    borderColor: "#fefefe",
    borderWidth: 0.5,
    color: "#fefefe",
  },
  logoutContainer: {
    marginVertical: 25,
  },
});
