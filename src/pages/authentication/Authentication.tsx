import React, {useEffect, useRef, useState} from 'react';
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {VIEW_LOGIN_BTN_ID, VIEW_LOGIN_ID} from "./constants";
import SplashScreen from "react-native-splash-screen";
import {SafeAreaView} from "react-native";

const Authentication = () => {
    const webview = useRef();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hide();
        }, 4000);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        getData()
    }, []);

    const storeData = async (user: any) => {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(user))
            getData()
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("user");
            if (value !== null) {
                setUser(value)
            }
        } catch (error) {
        }
    };

    const onMessage = (event: any) => {
        const res = JSON.parse(event.nativeEvent.data);
        if (res.message === 'ok') {
            !user && storeData({login: 'asobol', password: '12345'})
        }
    }

    const jsCode = `
    document.getElementsByName(${VIEW_LOGIN_ID}).value = "My value";
    document.getElementById(${VIEW_LOGIN_BTN_ID}).addEventListener("click", function() {  
    window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : "ok"}));
}); 
true;`;

    return (

            <WebView
                // @ts-ignore
                ref={webview}
                source={{uri: 'http://senseit-test.orange.md'}}
                originWhitelist={['*']}
                javaScriptEnabledAndroid={true}
                injectedJavaScript={jsCode}
                onMessage={onMessage}
            />
    );
};

export default Authentication;
