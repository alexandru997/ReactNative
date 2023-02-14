import React, {useEffect, useRef, useState} from 'react';
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";

const Authentication = () => {
    const webview = useRef();

    const [user, setUser] = useState<any>({login: '', password: ''});

    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hide();
        }, 4000);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        getData()
    }, []);

    const storeData = async (user: { login: string, password: string }) => {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(user))
            getData()
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        // try {
        //     await AsyncStorage.removeItem("user");
        //     return true;
        // }
        // catch(exception) {
        //     return false;
        // }
        try {
            const value = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(value as any)
            if (value !== null) {
                setUser(currentUser)
            }
        } catch (error) {
            console.log('error')
        }
    };

    const onMessage = (event: any) => {
        console.log('+')
        const res = JSON.parse(event.nativeEvent.data);
        if (res.message === 'ok') {
            storeData({login: res.login, password: res.password})
        }
    }
    const jsCode = `
    document.getElementById('username').value = '${user.login}';
    document.getElementById('password').children[0].value = '${user.password}';
 
  if(${user.login.length !== 0} && ${user.password.length !== 0}) { document.getElementById('kc-login').click();
}

    document.getElementById('kc-login').addEventListener("click", function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : "ok", 
    login: document.getElementById('username').value, 
    password: document.getElementById('password').children[0].value}));
});
true;
`;

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
