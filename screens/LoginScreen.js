import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert, ActivityIndicator } from "react-native";
import { AuthSession } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";
import { actions } from "../ducks/auth";
import {
  CLIENT_ID,
  AUTHORIZATION_ENDPOINT_URL,
  TOKEN_ENDPOINT_URL,
} from "react-native-dotenv";

export class LoginScreen extends Component {

  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    busy: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  }

  render() {
    const { busy } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image style={styles.monzoLogo} source={require("../assets/monzo-logo.png")} resizeMode="contain" />
          {busy ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <TouchableHighlight style={styles.button} onPress={this._handleLogin}>
              <Text style={styles.buttonText}>Login with Monzo</Text>
            </TouchableHighlight>
          )}
        </View>
        <Image style={styles.buzzwordLogo} source={require("../assets/behind-the-buzzword-logo.jpeg")} resizeMode="contain" />
      </View>
    );
  }

  _handleLogin = async () => {
    try {
      // Get an authorization code
      const redirectUrl = AuthSession.getRedirectUrl();
      const params = [
        "response_type=code",
        `client_id=${CLIENT_ID}`,
        `redirect_uri=${redirectUrl}`,
        `state=${uuidv4()}`,
      ].join("&");
      const result = await AuthSession.startAsync({
        authUrl: `${AUTHORIZATION_ENDPOINT_URL}/?${params}`,
      });

      if (result.type === "dismiss") return;

      // Exchange the authorization code for an access token
      const response = await fetch(TOKEN_ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: result.params.code,
          redirect_uri: redirectUrl,
        }),
      });
      const user = await response.json();

      // Login with the token
      // NOTE: This will not close the web view, you will need to close this manually during development
      this.props.login(user);
    }
    catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to sign in");
    }
  }

}

const mapStateToProps = state => ({
  busy: state.auth.busy,
});
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
