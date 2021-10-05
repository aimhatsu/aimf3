import React from 'react';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { config } from '../../Utils/ConfigDeviceView';

const CustomTabBar = (props: any) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#01426A", "#2694A3"]}
            style={{
                height: config.deviceHeight * 0.12
            }}

        >
            <BottomTabBar {...props} />
        </LinearGradient>
    );
};

export default CustomTabBar;