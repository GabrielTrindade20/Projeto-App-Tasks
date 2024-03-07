import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native';

import commonStyles from "../commonStyles";
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from "../components/Task";
import { InteractionManager } from "../../node_modules/react-native/types/index";



export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar livro de react',
            estimateAt: new Date(),
            doneAt: new Date()
        }, {
            id: Math.random(),
            desc: 'Ler livro de react',
            estimateAt: new Date(),
            doneAt: null
        }]
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks })
    }    

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.taskList}>
                    {/* <Task desc="comprar Livro" estimateAt={new Date()} doneAt={new Date()} /> 
                    <Task desc="comprar Livro" estimateAt={new Date()} doneAt={null} />  */}

                    <FlatList
                        data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    taskList: {
        flex: 7,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
})