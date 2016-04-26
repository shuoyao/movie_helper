"use strict";
 
import RNChart from 'react-native-chart';
var React = require("react-native");
 
var {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
} = React;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        marginTop: 65,
    },
    chart: {
        position: 'absolute',
        top: 16,
        left: 4,
        bottom: 4,
        right: 16,
    },
    heading: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: "center",
        color: "#656565"
    },
    subheading: {
        color: "#cccccc"
    }
});



const chartData = [
    {
        name: 'BarChart',
        type: 'bar',
        color:'purple',
        widthPercent: 0.6,
        data: [30, 1, 1, 2, 3, 5, 21, 13, 21, 34, 55, 30],
    },
    // {
    //     name: 'LineChart',
    //     color: 'gray',
    //     lineWidth: 2,
    //     highlightIndices: [1, 2],   // The data points at indexes 1 and 2 will be orange
    //     highlightColor: 'orange',
    //     showDataPoint: true,
    //     data: [10, 12, 14, 25, 31, 52, 41, 31, 52, 66, 22, 11],
    // }
];

const xLabels = ['0','1','2','3','4','5','6','7','8','9','10','11'];

class DetailView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    {this.props.username}!
                </Text>
                <Text style={styles.subheading}>
                    Mpaa_rating is {this.props.password}
                </Text>
                <RNChart style={styles.chart}
                    chartData={chartData}
                    verticalGridStep={5}
                    xLabels={xLabels}/>
            </View>
        );
    }
}
module.exports = DetailView;
 