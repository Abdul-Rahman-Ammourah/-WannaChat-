import React from "react";
import { View,Text,StyleSheet } from "react-native";





export default function Messaging() {

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text>Header</Text>
            </View>

            <View style={style.body}>
                <Text>Body</Text>
            </View>

            <View style={style.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{

    },
    header:{

    },
    body:{

    },
    footer:{

    }
})