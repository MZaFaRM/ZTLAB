import AsyncStorage from '@react-native-async-storage/async-storage';
import {React, useCallback, useRef, useState} from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import WebView from 'react-native-webview';
import Layout from '../components/layout/layout';
import {pages} from '../constants/constants';
import Minesweeper from './Minesweeper';
import {RefreshControl} from 'react-native';

const AttendanceTable = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [cookiesJS, setCookiesJS] = useState('');
  const webViewRef = useRef(null);

  const loginUrl = 'https://kmctce.etlab.app/user/login';
  const attendanceUrl =
    'https://kmctce.etlab.app/ktuacademics/student/attendance';

  const handleNavigationStateChange = async newNavState => {
    if (newNavState.url === loginUrl) {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));

      webViewRef.current.injectJavaScript(`
            document.getElementById('LoginForm_username').value = '${userData.username}';
            document.getElementById('LoginForm_password').value = '${userData.password}';
            document.querySelector('.btn.btn-success').click();
        `);
    } else if (
      newNavState.url !== loginUrl &&
      newNavState.url !== attendanceUrl
    ) {
      webViewRef.current.injectJavaScript(`
            window.location.href = ${attendanceUrl};
        `);
    }
  };

  const onRefresh = useCallback(() => {
    webViewRef.current.injectJavaScript(`window.location.reload();`);
  }, []);

  return (
    <Layout navigation={navigation} currentPage={pages.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        <WebView
          ref={webViewRef}
          style={{flex: 1, height: 1300}}
          source={{uri: attendanceUrl}}
          onNavigationStateChange={handleNavigationStateChange}
          cacheEnabled={true}
          scrollEnabled={true}
        />
      </ScrollView>
    </Layout>
  );
};

export default AttendanceTable;
