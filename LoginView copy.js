// 'use strict';

// var React = require('react-native');
// var {
//   Image,
//   ListView,
//   TouchableHighlight,
//   StyleSheet,
//   RecyclerViewBackedScrollView,
//   Text,
//   View,
// } = React;

// var UIExplorerPage = require('./UIExplorerPage');

// var LoginView = React.createClass({
//   statics: {
//     title: '<ListView>',
//     description: 'Performant, scrollable list of data.'
//   },

//   getInitialState: function() {
//     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     return {
//       dataSource: ds.cloneWithRows(this._genRows({})),
//     };
//   },

//   _pressData: ({}: {[key: number]: boolean}),

//   componentWillMount: function() {
//     this._pressData = {};
//   },

//   render: function() {
//     return (
//       <UIExplorerPage
//         title={this.props.navigator ? null : '<ListView>'}
//         noSpacer={true}
//         noScroll={true}>
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={this._renderRow}
//           renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
//           renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
//         />
//       </UIExplorerPage>
//     );
//   },

//   _renderRow: function(rowData: string, sectionID: number, rowID: number) {
//     var rowHash = Math.abs(hashCode(rowData));
//     var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
//     return (
//       <TouchableHighlight onPress={() => this._pressRow(rowID)}>
//         <View>
//           <View style={styles.row}>
//             <Image style={styles.thumb} source={imgSource} />
//             <Text style={styles.text}>
//               {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
//             </Text>
//           </View>
//         </View>
//       </TouchableHighlight>
//     );
//   },

//   _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
//     var dataBlob = [];
//     for (var ii = 0; ii < 100; ii++) {
//       var pressedText = pressData[ii] ? ' (pressed)' : '';
//       dataBlob.push('Row ' + ii + pressedText);
//     }
//     return dataBlob;
//   },

//   _pressRow: function(rowID: number) {
//     this._pressData[rowID] = !this._pressData[rowID];
//     this.setState({dataSource: this.state.dataSource.cloneWithRows(
//       this._genRows(this._pressData)
//     )});
//   },
// });

// var THUMB_URLS = [
//   require('./Thumbnails/like.png'),
//   require('./Thumbnails/dislike.png'),
//   require('./Thumbnails/call.png'),
//   require('./Thumbnails/fist.png'),
//   require('./Thumbnails/bandaged.png'),
//   require('./Thumbnails/flowers.png'),
//   require('./Thumbnails/heart.png'),
//   require('./Thumbnails/liking.png'),
//   require('./Thumbnails/party.png'),
//   require('./Thumbnails/poke.png'),
//   require('./Thumbnails/superlike.png'),
//   require('./Thumbnails/victory.png'),
//   ];
// var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

// /* eslint no-bitwise: 0 */
// var hashCode = function(str) {
//   var hash = 15;
//   for (var ii = str.length - 1; ii >= 0; ii--) {
//     hash = ((hash << 5) - hash) + str.charCodeAt(ii);
//   }
//   return hash;
// };

// var styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: '#F6F6F6',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#CCCCCC',
//   },
//   thumb: {
//     width: 64,
//     height: 64,
//   },
//   text: {
//     flex: 1,
//   },
// });

// module.exports = LoginView;


"use strict";
 
import React, {
    AppRegistry,
    Component,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableHighlight,
} from 'react-native';

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var SecureView = require("./SecureView");

class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        dataSource: new ListView.DataSource({
                                            rowHasChanged: (row1, row2) => row1 !== row2,
                                            }),
        username: "testusername",
        password: "testpw",
        loaded: false,
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
                            username: "testusername",
                            password: "testpw",
                            loaded: true,
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
                renderRow={this.renderMovie}
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
          <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))} >
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

    onSubmitPressed() {
        this.props.navigator.push({
            title: "Secure Page",
            component: SecureView,
            passProps: {username: this.state.username, password: this.state.password},
        });
    }
}

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