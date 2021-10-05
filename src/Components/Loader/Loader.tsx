import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import AnimatedLoader from 'react-native-animated-loader';
import { GlobalContext } from "../../Contexts/GlobalContext";

export const Loader = ({ loading }: any) => {
    //const { loading } = useContext(GlobalContext);
    return (
        <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.60)"
            animationStyle={styles.lottie}
            speed={1}
            source={require("./loader.json")} />
    );
}
const styles = StyleSheet.create({
    lottie: { 
        width: 100, 
        height: 100,
    },
});
