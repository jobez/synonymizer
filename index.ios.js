/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  TextInput,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

var BHT_KEY = '94330886b6dfb0e2d5391f2639296d51';
var word_endpoint = function(word) { return 'http://words.bighugelabs.com/api/2/'
                                     + BHT_KEY +
                                     '/' + word  +
                                     '/json' };

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var AwesomeProject = React.createClass({
  getInitialState: function() {

return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      word_set: false,
    };
  },

  componentDidMount: function() {
    //this.fetchData();
  },

  fetchSynonyms: function() {
    fetch(word_endpoint(this.state.input)).then((resp) => resp.json())
      .then((respData) => {
            this.setState({
          dataSource: this.state.dataSource.cloneWithRows(respData.noun.syn),
          loaded: true,
            })
      })
      .done()
   },

  render: function() {
    if (!this.state.word_set) {
      return (<View style={styles.listView}>
              <TextInput
              style={{height: 100, borderColor: 'gray', borderWidth: 1}}
              placeholder="Select Lookup Word"
              onEndEditing={() => {this.setState({word_set: true});
                                   this.fetchSynonyms();
                                  }}
               onChangeText={(text) => this.setState({input: text})}
               />
               </View>
               );
    }

    return (
     <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderWord}
        style={styles.listView}
        />
       );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderWord: function(word) {
    return (<View style={styles.container}>
            <Text style={styles.title}>{word}</Text>
            </View>);
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  },
});

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


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
