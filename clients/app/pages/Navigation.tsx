import { View } from 'react-native'
import React from 'react'
import * as Font from "expo-font"
import type { TabsContentProps } from 'tamagui'
import { Button, H5, Separator, SizableText, Tabs, XStack, YStack, isWeb, Text } from 'tamagui'

const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}
const Navigation = () => {
  return (
  <></>
  )
}
export default Navigation