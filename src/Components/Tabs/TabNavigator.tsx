import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomTabBar from './CustomTabBar';
import { iconAtivity, IconHome, IconRecomendations } from '../../Assets';
import { config } from '../../Utils/ConfigDeviceView';
import Recomendations from '../Recomendations/Recomendations';
import RadarChart from '../RadarChart/RadarChart';
import { Testar } from '../Testar/Testar';


const Tab = createBottomTabNavigator();

const screenOptions = (route: any, color: any) => {
    let iconName;

    switch (route.name) {
        case 'Home':
            iconName = IconHome;
            break;
        case 'Recomendations':
            iconName = IconRecomendations;
            break;
        case 'Testar':
            iconName = iconAtivity;
            break;
        default:
            break;
    }

    return (
        <View
            style={
                {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 30,
                    width: 30,
                    borderRadius: 100
                }
            }
        >

            <View
                style={
                    {
                        flexDirection: "column",
                        height: config.deviceHeight * 0.04
                    }
                }
            >

                <Image
                    resizeMode='contain'

                    style={
                        {
                            flex: 1
                        }
                    }

                    source={iconName} />
            </View>

        </View>
    );
};

const TabNavigator = () => {

    return (
        <NavigationContainer>

            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={
                    ({ route }) => ({
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: 'rgba(0, 0, 0, 0.0)',
                            borderTopColor: 'rgba(0, 0, 0, 0.0)',
                            shadowColor: 'rgba(0, 0, 0, 0.0)',
                            fontWeight: "bold",
                        },

                        tabBarIcon: ({ color }) => screenOptions(route, color),
                        tabBarItemStyle: {
                            marginTop: 5,
                            paddingTop: 5

                        },
                        tabBarLabelStyle: {
                            fontWeight: "bold",
                        },
                    })
                }

                tabBar={(props) => <CustomTabBar {...props} />}
            >

                <Tab.Screen name="Testar" component={Testar} />
                <Tab.Screen name="Home" component={RadarChart} />
                <Tab.Screen name="Recomendations" component={Recomendations} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default TabNavigator;