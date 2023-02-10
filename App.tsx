import React, {useEffect, useState} from 'react';
import Authentication from "./src/pages/authentication/Authentication";
import Home from "./src/pages/Home";

function App(): JSX.Element {
    // const [showWebView, setShowWebView] = useState<boolean>(true);
    //
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowWebView(false)
    //     }, 20000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <>
            <Authentication/>
            {/*{showWebView*/}
            {/*    ? <Authentication/>*/}
            {/*    : <Home/>*/}
            {/*}*/}
        </>
    );
}

export default App;
