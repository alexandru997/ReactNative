import React, {useEffect} from 'react';
import Home from "./src/pages/Home";
import SplashScreen from "react-native-splash-screen";

function App(): JSX.Element {
    // const [showWebView, setShowWebView] = useState<boolean>(true);
    //
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowWebView(false)
    //     }, 20000);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hide();
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Home />
            {/*<Authentication/>*/}
            {/*{showWebView*/}
            {/*    ? <Authentication/>*/}
            {/*    : <Home/>*/}
            {/*}*/}
        </>
    );
}

export default App;
