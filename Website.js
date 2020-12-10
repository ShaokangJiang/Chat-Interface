import React, { Component } from 'react';
import { View} from 'native-base';
import { WebView } from 'react-native-webview';

export default class ThemeExample extends Component {
//data
    render() {

        //need remove some field first. like data description
        for(let i of Object.keys(this.props.data)){
            for(let k of this.props.data[i]){
                delete k['Description'];
            }
        }
        const runFirst = `
          window.isNativeApp = true; 
          localStorage.setItem("budgetingData", '`+JSON.stringify(this.props.data)+`');
          localStorage.setItem("budgetingCategory", '`+JSON.stringify(this.props.category)+`')
          true; // note: this is required, or you'll sometimes get silent failures
        `;
        console.log(runFirst);
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri:
                            'https://capitaltwo.ga/tools/Budget/run.html',
                    }}
                    injectedJavaScriptBeforeContentLoaded={runFirst}
                />
            </View>
        );
    }
}