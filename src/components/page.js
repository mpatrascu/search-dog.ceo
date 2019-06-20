import React, {Component} from 'react';
import axios from 'axios';

import Compare from './compare.js';
import Antet from './antet';

const link = "https://dog.ceo/api/breed/{breedName}/images";

class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            connected: false,
            breeds: [],
            breedsLoaded: false,
            selectedBreeds: ["", ""],
            lists: [[],[]],
            page: [1, 1],
            loaded: false,
            zoom: 2,
            pageSize: 12
        }
    }

    connectToAPI(){
        const URL = "https://dog.ceo/api/breeds/list/all";
        axios.get(URL)
        .then(response =>{
            if(response.status === 200) {
                const responseData = response.data.message;
                const breedsObj = Object.keys(responseData).map(key => {return  {name: key.charAt(0).toUpperCase() + key.slice(1), subBreeds: responseData[key]};});
                let breeds = [];
                breedsObj.forEach(breed => {
                    if (breed.subBreeds.length === 0){
                        breeds.push({name: breed.name})
                    }
                    else {
                        breed.subBreeds.forEach(subBreed => {
                            breeds.push({name: breed.name + "/" + subBreed.charAt(0).toUpperCase() + subBreed.slice(1)})
                        })
                    }
                })
                this.setState({connected: true, breeds, breedsLoaded: true  })
            }
        })
        .catch(response => {console.log(response); alert("Unable to connect! " + response)});
        
    }

    async fetchImages(){
        let URL, response, newLists =[], selectedBreeds = this.state.selectedBreeds, error: false, page = [1, 1];
        const axiosError = message => {error = true; alert("Unable to read data: " + message)}
        
        for(let i = 0; i < 2; i++){
            URL = link.replace("{breedName}", selectedBreeds[i].toLowerCase());
            response = await axios.get(URL)
                .catch(message => axiosError(message));
            if (!error) newLists.push(response.data.message.map((l, i) => {return {name: l, checked: false, index: i}}));
            }
        if(error) return;
        console.log(newLists)
        this.setState({lists: newLists, page, loaded: true}, console.log(this.state));
    }

    updateBreed(index, value){
        let selectedBreeds = this.state.selectedBreeds;
        selectedBreeds[index] = value;
        this.setState({selectedBreeds})
    } 

    handleCheck(event, list, index){
        let lists = this.state.lists;
        lists[list][index].checked = event.target.checked;
        this.setState({lists});
    }

    changePage(index, value){
        let page = this.state.page;
        page[index] = value;
        this.setState({page});
    }

    deleteSelected(){
        let {lists, page, pageSize} = this.state;
        console.log(lists)
        for(let i = 0; i < 2; i++){
            for (let j = lists[i].length - 1; j >= 0; j--){
                if(lists[i][j].checked) lists[i].splice(j, 1);
            }
            lists[i].forEach((element, i) => element.index = i);  //refacere indecsi dupa stergere
            if (page[i] > Math.ceil(lists[i].length/pageSize)) page[i] = Math.ceil(lists[i].length/pageSize);
        }
        console.log(lists)
        this.setState({lists, page});
    }

    modifyColumns(mode){
        let zoom = this.state.zoom
        console.log(mode, zoom)
        
        if(mode === "up" &&  zoom < 4) this.setState({zoom: zoom + 1});
        if(mode === "down" &&  zoom > 1) this.setState({zoom: zoom - 1}); 
    }


    render(){
        return(
            <div className="App">
                <Antet connected={this.state.connected} 
                    breeds={this.state.breeds}
                    loaded={this.state.loaded}
                    page={this.state.page}
                    pageSize={this.state.pageSize}
                    length={this.state.lists.map(l => l.length)}
                    selectedBreeds={this.state.selectedBreeds}
                    connectToAPI={this.connectToAPI.bind(this)}
                    updateBreed={this.updateBreed.bind(this)}
                    fetchImages={this.fetchImages.bind(this)}
                    modifyColumns={this.modifyColumns.bind(this)}
                    changePage={this.changePage.bind(this)}
                    delete={this.deleteSelected.bind(this)}
                    />
                {this.state.loaded ?
                        <Compare page={this.state.page}
                            zoom={this.state.zoom}
                            lists={this.state.lists}
                            pageSize={this.state.pageSize}
                            handleCheck={this.handleCheck.bind(this)}/>:
                        <img className="background-img" src="./images/paw.png" alt =""></img>}
            </div>
        )
    }

}


export default Page;
