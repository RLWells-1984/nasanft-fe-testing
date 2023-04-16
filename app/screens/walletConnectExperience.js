import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";
import PropTypes from "prop-types";
import colors from "../config/colors";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

function Button({ onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
};

function DisplayAddress({ pubAddress }) {
  if (pubAddress != null) {
    return <Text style={styles.resultText}>Public Address: {pubAddress}</Text>;
  } else {
    return <Text style={styles.resultText}>NO ADDRESS</Text>;
  }
}

DisplayAddress.propTypes = {
  pubAddress: PropTypes.object,
};

export default function WalletConnectExperience({ navigation }) {
  const authContext = useContext(AuthContext);
  const [pubAddress, setPubAddress] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [results, setResults] = useState([]);
  const connector = useWalletConnect();

  const personalSign = async (publicAddress, navigation) => {
    const nonceRes = await fetch(
      "https://nasaft-tbact528.b4a.run/api/token/" + publicAddress,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log("not ok, likely not in the DB or DB not up");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data");
        console.log(data);
        if (data.text != undefined) {
          if (
            data.text.localeCompare(
              "JSON object requested, multiple (or no) rows returned"
            ) == 0
          ) {
            Alert.alert(
              "Login Failed",
              "Unable to retrieve an authentication token. Are you sure you registered an account?",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("RegistrationScreen"),
                },
              ]
            );
          }
        }
        return data;
      })
      .catch((error) => {
        console.log("Unable to retrieve authentication token " + error);
      });
    const nonce = nonceRes.nonce;

    connector
      .signPersonalMessage([nonce, publicAddress, navigation])
      .then(async (results) => {
        const loginRes = await fetch(
          "https://nasaft-tbact528.b4a.run/api/token/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_address: publicAddress,
              signed_nonce: results,
            }),
          }
        ).then((response) => {
          if (!response.ok) {
            console.log("problem with signature");
          }
          return response.json();
        });
        if (results != null) {
          setResults(results);
          authContext.setToken(loginRes.accessToken);
          authContext.setRefreshToken(loginRes.refreshToken);
          authContext.setUser(loginRes.user);
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        // Error returned when rejected
        console.log("Signature failed", error);
      });
  };

  const connectWallet = useCallback(() => {
    connector.connect();
  }, [connector]);

  const killSession = useCallback(() => {
    return connector.killSession();
  }, [connector]);

  useEffect(() => {
    if (connector.connected) {
      setPubAddress(connector.accounts[0]);
      authContext.setPublicAddress(connector.accounts[0]);
    }
    if (!connector.connected) {
      authContext.setPublicAddress(null);
    }
  });

  return (
    <>
      {!connector.connected ? (
        <Button onPress={connectWallet} label="Connect a Wallet" />
      ) : (
        <>
          <DisplayAddress pubAddress={pubAddress} />
          <Button
            onPress={() => personalSign(connector.accounts[0], navigation)}
            label="sign"
          />
          <Button onPress={killSession} label="Log out" />
        </>
      )}
    </>
  );
}

WalletConnectExperience.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.buttonColor,
    borderColor: colors.white,
    borderRadius: 25,
    borderWidth: 5,
    height: 70,
    justifyContent: "center",
    marginVertical: 20,
    width: "80%",
  },
  text: {
    color: colors.blue_text,
    fontSize: 18,
    fontFamily: "Rag_Bo",
  },
  resultText: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.buttonColor,
    borderWidth: 5,
    color: colors.blue_text,
    fontSize: 18,
    marginBottom: 60,
    padding: 7,
    width: "100%",
  },
});
