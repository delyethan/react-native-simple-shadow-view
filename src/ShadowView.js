import React, { Component } from 'react';
import { requireNativeComponent, Platform, View } from 'react-native';

const RNTShadowView = requireNativeComponent('RNTShadowView', ShadowView);

const ShadowView = (props) => {
  if (Platform.OS === 'ios') {
    return <View {...this.props}/>
  }
  const { style } = this.props || {};
  let flattenedStyle = {};
  if (Array.isArray(style)) {
    style.map((item) => {
      item && Object.keys(item) && Object.keys(item).map(key => flattenedStyle[key] = item[key]);
    })
  } else {
    flattenedStyle = style || {};
  }

  delete flattenedStyle.elevation;

  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    borderRadius,
    backgroundColor,
    borderWidth,
    borderColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopStartRadius,
    borderTopEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderBottomEndRadius
  } = flattenedStyle;
  if (!shadowRadius || shadowOpacity === 0) {
    return <View {...this.props}/>
  }

  const { width: shadowOffsetX, height: shadowOffsetY } = shadowOffset || {}
  return (
    <RNTShadowView
      {...this.props}
      style={[flattenedStyle]}
      borderWidth={borderWidth}
      borderColor={borderColor !== undefined ? borderColor : 'black'}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      borderTopLeftRadius={borderTopLeftRadius ? borderTopLeftRadius : borderTopStartRadius}
      borderTopRightRadius={borderTopRightRadius ? borderTopRightRadius : borderTopEndRadius}
      borderBottomLeftRadius={borderBottomLeftRadius ? borderBottomLeftRadius : borderBottomStartRadius}
      borderBottomRightRadius={borderBottomRightRadius ? borderBottomRightRadius : borderBottomEndRadius}
      shadowColor={shadowColor !== undefined ? shadowColor : 'black'}
      shadowOffsetX={shadowOffsetX}
      shadowOffsetY={shadowOffsetY}
      shadowOpacity={(shadowOpacity !== undefined ? shadowOpacity : 0)}
      shadowRadius={(shadowRadius !== undefined ? shadowRadius : 2.8)}
    >
      {this.props.children}
    </RNTShadowView>
  )
}

export default ShadowView