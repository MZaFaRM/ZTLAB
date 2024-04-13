import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/constants';
import {normalize} from '@rneui/themed';

function ProgressBar({progress, style}) {
  progress /= 100;

  // Calculate color based on progress
  let colors_palette = ['#FF0000', '#FF0001'];

  if (progress > 0.25) {
    colors_palette = colors_palette.concat('#FFA500');
    if (progress > 0.5) {
      colors_palette = colors_palette.concat('#FFFF00');
      if (progress > 0.75) {
        colors_palette = colors_palette.concat('#00FF00');
      }
    }
  }

  return (
    <View style={[{position: 'relative', width: '100%', height: 10}, style]}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%', // Max width
          height: '100%', // Same height as the LinearGradient
          backgroundColor: Colors.LightGrey,
          borderRadius: 5,
        }}
      />
      {/* LinearGradient */}
      <LinearGradient
        colors={colors_palette}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%', // Same height as the parent
          width: `${progress * 100}%`,
          borderRadius: 5,
        }}>
        <View
          style={{
            flex: 1, // Expand to fill available space
            backgroundColor: 'transparent',
            borderRadius: 5,
          }}
        />
      </LinearGradient>
    </View>
  );
}

const minValue = 0;
const maxValue = 100;

function calculateColor(value) {
  // Ensure the value is within the range
  normalizedValue = Math.min(Math.max(value, 0), 100);

  const colorStops = [
    {color: [255, 0, 0], percentage: 0.55}, // Red for attendance < 60%
    {color: [255, 255, 0], percentage: 0.65}, // Yellow for attendance between 60% and 75%
    {color: [0, 255, 0], percentage: 0.75}, // Green for attendance >= 75%
  ];
  // Find the two closest color stops
  let startIndex = 0;

  while (
    startIndex + 1 < colorStops.length &&
    normalizedValue > colorStops[startIndex + 1].percentage * 100
  ) {
    startIndex++;
  }

  let endIndex = Math.min(startIndex + 1, colorStops.length - 1);

  // Calculate the ratio between the two color stops
  let ratio;
  if (startIndex === endIndex) {
    ratio = 0;
  } else {
    ratio =
      (normalizedValue - colorStops[startIndex].percentage * 100) /
      ((colorStops[endIndex].percentage - colorStops[startIndex].percentage) *
        100);
  }

  // Interpolate between the colors based on the ratio
  const interpolatedColor = interpolateColors(
    colorStops[startIndex].color,
    colorStops[endIndex].color,
    ratio,
  );

  // Convert RGB values to hexadecimal
  const rHex = interpolatedColor[0].toString(16).padStart(2, '0');
  const gHex = interpolatedColor[1].toString(16).padStart(2, '0');
  const bHex = interpolatedColor[2].toString(16).padStart(2, '0');

  // Return hexadecimal color string
  return `#${rHex}${gHex}${bHex}`;
}

function interpolateColors(color1, color2, ratio) {
  const r = Math.round(color1[0] + (color2[0] - color1[0]) * ratio);
  const g = Math.round(color1[1] + (color2[1] - color1[1]) * ratio);
  const b = Math.round(color1[2] + (color2[2] - color1[2]) * ratio);

  // Adjust the darkness before returning the interpolated color
  const darkenedR = Math.max(0, r - 0.2 * 255);
  const darkenedG = Math.max(0, g - 0.2 * 255);
  const darkenedB = Math.max(0, b - 0.2 * 255);

  return [darkenedR, darkenedG, darkenedB];
}

export {ProgressBar, calculateColor};
