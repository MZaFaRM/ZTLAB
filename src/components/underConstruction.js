import React from 'react';
import { Linking, Text, View } from 'react-native';
import { Fonts } from '../constants/constants';

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
      <Text style={[Fonts.Body, {textAlign: 'center'}]}>
        Hi there,
        {'\n\n'}
        Looks like you stumbled upon one of the numerous incomplete pages within
        this app. It currently <Text style={{fontWeight: 'bold'}}>may</Text> be
        a work in progress or I might have decided not to complete it, but if
        you're interested in contributing and completing this page, check out
        the GitHub repository at{' '}
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://github.com/MZaFaRM')}>
          ZTLAB
        </Text>
        .{'\n\n'}
        Thank You 🙂!
      </Text>
    </View>
  </View>
);
