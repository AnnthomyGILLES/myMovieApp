import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBapi'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.state = { 
            films: [],
        }
    }

    _loadFilms() {
        console.log(this.state.searchedText)
        if (this.state.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.state.searchedText).then(data => {
                this.setState({ films: data.results })
            })
        }
    }
    
    _searchTextInputChanged(text) {
        this.searchedText = text
    }
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <Button style={{height: 50}} title='Rechercher' onPress={() => this._loadFilms()}/>

                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 10
    }
})

export default Search