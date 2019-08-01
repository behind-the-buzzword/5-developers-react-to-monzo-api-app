import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "../ducks/auth";

export class LoadingScreen extends Component {

  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    checkIsAuthenticated: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    this.props.checkIsAuthenticated();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#043C95",
  },
});
