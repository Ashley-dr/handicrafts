import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from "expo-router"
import { useColorScheme } from 'react-native'
import { tamaguiConfig } from '../tamagui.config'
import { TamaguiProvider } from 'tamagui'
const _layout = () => {
  const colorScheme = useColorScheme();
  return (
       <Stack>     
          <Tabs.Screen name='index' options={{title: "HANDICRAFT"}}/>    
        </Stack>
  )
}

export default _layout