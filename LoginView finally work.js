"use strict";
 
var React = require("react-native");
 
var {
    Component,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ListView,
    Image,
} = React;
 
var SecureView = require("./SecureView");
 
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;



class LoginView extends Component {
 
     constructor(props) {
        super(props);
        this.state = {
        dataSource: new ListView.DataSource({
                                            rowHasChanged: (row1, row2) => row1 !== row2,
                                            }),
        loaded: false,
        username: "sophia",
        password: "sophiapw",
        };
    }
    componentDidMount() {
        this.fetchData();
    }
    
    fetchData() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
              this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                            loaded: true,
                            username: "sophia",
                            password: "sophiapw",
                            });
              })
        .done();
    }

   render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        
        return (
                <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie.bind(this)}
                style={styles.listView}/>
                );
    }
    
    renderLoadingView() {
        return (
                <View style={styles.container}>
                <Text>
                Loading movies...
                </Text>
                </View>
                );
    }
    
    renderMovie(movie) {
        return (
            <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))}>
                <View style={styles.container}>
                <Image
                source={{uri: movie.posters.thumbnail}}
                style={styles.thumbnail}/>
                <View style={styles.rightContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.year}>{movie.year}</Text>
                </View>
                </View>
             </TouchableHighlight>
                );
    }

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.title}>
    //                 Sign In
    //             </Text>
    //             <View>
    //                 <TextInput
    //                     placeholder="Username"
    //                     onChange={(event) => this.setState({username: event.nativeEvent.text})}
    //                     style={styles.formInput}
    //                     value={this.state.username} />
    //                 <TextInput
    //                     placeholder="Password"
    //                     secureTextEntry={true}
    //                     onChange={(event) => this.setState({password: event.nativeEvent.text})}
    //                     style={styles.formInput}
    //                     value={this.state.password} />
    //                 <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))} style={styles.button}>
    //                     <Text style={styles.buttonText}>Submit</Text>
    //                 </TouchableHighlight>
    //             </View>
    //         </View>
    //     );
    // }
 
    onSubmitPressed() {
        this.props.navigator.push({
            title: "Secure Page",
            component: SecureView,
            passProps: {username: this.state.username, password: this.state.password},
        });
    }
 
};
 
var styles = StyleSheet.create({
                               container: {
                               flex: 1,
                               flexDirection: 'row',
                               justifyContent: 'center',
                               alignItems: 'center',
                               backgroundColor: '#F5FCFF',
                               },
                               rightContainer: {
                               flex: 1,
                               },
                               title: {
                               fontSize: 20,
                               marginBottom: 8,
                               textAlign: 'center',
                               },
                               year: {
                               textAlign: 'center',
                               },
                               thumbnail: {
                               width: 53,
                               height: 81,
                               },
                               listView: {
                               paddingTop: 20,
                               backgroundColor: '#F5FCFF',
                               },
                               });

module.exports = LoginView;