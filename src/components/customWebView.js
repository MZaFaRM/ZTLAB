import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

export const CustomEtlabWebView = ({source, username, password}) => {
  //   const {url, setUrl} = route;
  const [isLoading, setIsLoading] = useState(true);
  const javascript = `
    document.getElementById('LoginForm_username').value = '${username}';
    document.getElementById('LoginForm_password').value = '${password}';
    document.querySelector('.btn.btn-success').click();
    window.location.href = 'https://kmctce.etlab.app/ktuacademics/student/attendance';
  `;

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: 'https://kmctce.etlab.app/user/login'}}
        injectedJavaScript={javascript}
        cacheEnabled={true}
      />
    </SafeAreaView>
  );
};
