import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBapi'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.state = {
            films: [],
            isLoading: false
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            console.log(this.state.isLoading)
            this.setState({ isLoading: true })
            console.log(this.state.isLoading)
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ films: data.results, 
                    isLoading: false })
                console.log(this.state.isLoading)

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
                    onSubmitEditing={() => this._loadFilms()}
                />
                <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._loadFilms()} />

                <View style={styles.loading_container}>
                    <ActivityIndicator
                        animating={this.state.isLoading}
                        size="large"
                        color="#0000ff"
                    />
                </View>
                
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem film={item} />}
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
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search