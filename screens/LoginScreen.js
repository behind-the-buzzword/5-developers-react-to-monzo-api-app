import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableHighlight, Image, ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "../ducks/auth";

// These values are imported from the .env file
// import {
//   CLIENT_ID,
//   AUTHORIZATION_ENDPOINT_URL,
//   TOKEN_ENDPOINT_URL,
// } from "react-native-dotenv";

export class LoginScreen extends Component {

  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  state = {
    busy: false,
  }

  render() {
    const { busy } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image style={styles.monzoLogo} source={require("../assets/monzo-logo.png")} resizeMode="contain" />
          {busy ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <TouchableHighlight style={styles.button} onPress={this.handleLogin}>
              <Text style={styles.buttonText}>Login with Monzo</Text>
            </TouchableHighlight>
          )}
        </View>
        <Image style={styles.buzzwordLogo} source={require("../assets/behind-the-buzzword-logo.jpeg")} resizeMode="contain" />
      </View>
    );
  }

  handleLogin = () => {
    // You will need to perform the following steps:
    // 1. Get an authorization code
    // 2. Exchange the authorization code for an access token
    // 3. Call login with the response

    // Right now this is only a mock
    this.setState({ busy: true });

    setTimeout(() => {
      const user = {
        access_token: "access_token",
        client_id: "client_id",
        expires_in: 21600,
        refresh_token: "refresh_token",
        token_type: "Bearer",
        user_id: "user_id",
      };

      this.setState({ busy: false });

      // Login with the token
      this.props.login(user);
    }, 4000);
  }

}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14233C",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  monzoLogo: {
    height: 160,
  },
  buzzwordLogo: {
    height: 100,
    margin: 10,
  },
  button: {
    backgroundColor: "#E64B5F",
    padding: 15,
    width: 220,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
