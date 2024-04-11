import React from 'react';
import {Text, View} from 'react-native';
import {Fonts} from '../constants/constants';

export const UnderConstruction = () => (
  <View
    style={{
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: '50%',
    }}>
    <View style={{height: '100%', alignItems: 'center'}}>
      <Text style={[Fonts.Body, {fontSize: 50}]}>⚠️</Text>
      <Text style={[Fonts.Body, {textAlign: 'center', fontStyle: 'italic'}]}>
        {'\n'}Hey, {'\n\n'}Looks like you stumbled upon one of the numerous
        incomplete pages within this app. {'\n\n'}It currently{' '}
        <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>may</Text> be a
        work in progress or I might have decided to not complete it, but if you
        are interested to contribute and complete this page - checkout the
        github repository at{' '}
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://github.com/MZaFaRM')}>
          ZTLAB
        </Text>
        {'\n\n'}Thank You!
      </Text>
    </View>
  </View>
);
