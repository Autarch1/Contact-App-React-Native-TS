import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  disable?: boolean
}

export const Input = (props: Props<any>) => {
  const { control, name } = props
  return (
    <Controller
          control={control}
          name={name}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <View>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={'black'}
                style={{
                  borderBottomWidth: 1,
                  minWidth: 280,
                  padding: 5,
                  margin : 10,
                  fontSize : 20
                }}
              />
              <Text style={{color: 'red', fontSize: 16}}>
                {error?.message}
              </Text>
            </View>
          )}
        />
  )
}

export default Input

const styles = StyleSheet.create({})