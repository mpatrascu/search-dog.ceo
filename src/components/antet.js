import React from 'react';
import Select from 'react-select';
import Logo from './logo.js';

const Antet = (props) => 
<div >
    <div className="menu">   
        <a href="#home"
            onClick={props.connectToAPI}>
            <Logo className="logo" animated={props.connected}/>
        </a>
        
        {!props.connected &&
        <button className="button " href="#home"
            onClick={props.connectToAPI}>
            Connect to dog.ceo API
        </button>}
            
        { props.selectedBreeds[0] !== "" && props.selectedBreeds[1] !== "" && 
        <div>
            <button className="button"
                
                onClick={props.fetchImages}>
                {props.loaded ? "Reload" : "Fetch images"}
            </button>
            {props.loaded && 
            <div>
                {" "}
                <button className="button"
                    onClick={() => props.modifyColumns("up")}>
                    -
                </button>
                {" "}
                <button className="button"
                    onClick={() => props.modifyColumns("down")}>
                    +
                </button>
                {" "}
                <button className="button"
                    onClick={props.delete}>
                    Delete selected
                </button>
            </div>}
        </div>}

        {props.connected && (props.selectedBreeds[0] === "" || props.selectedBreeds[1] === "" ?  <div className="info-text">Choose two breeds to show</div> : "")} 
    </div>

    { props.connected && 
    <div className="title">
        <div className="grid-container-2">
            {props.selectedBreeds.map((breed, i) =>
            <Select
                key={i}
                className="breed-select"
                options={props.breeds.map(breed => {return {label: breed.name, value: breed.name}})}
                placeholder={(i === 0 ? "1st" : "2nd") + " breed"}
                value={breed !== "" ? {value: breed, label: breed} : null}
                
                onChange={selected => props.updateBreed(i,  selected.value)}/>
            
            )}
        </div>
       {props.loaded &&
        <div className="grid-container-2">
        {props.selectedBreeds.map((breed, i) =>
           <div key={i} className="page-numbers">
               <button className="button"
                    onClick={() => props.changePage(i, props.length[i] > 0 ? 1 : 0)}>
                    {"<<"}
                </button>
                {" "}
                <button className="button"
                    onClick={() => props.changePage(i, props.page[i] > 1 ? props.page[i] - 1 : props.page[i])}>
                    {"<"}
                </button>
                {" "}
                <button className="button"> {props.page[i] + "/" + Math.ceil(props.length[i]/props.pageSize)}</button>
                {" "}
                <button className="button"
                    onClick={() => props.changePage(i,props.page[i] < Math.ceil(props.length[i]/props.pageSize) ? props.page[i] + 1 : Math.ceil(props.length[i]/props.pageSize))}>
                    {">"}
                </button>
                {" "}
                <button className="button"
                    onClick={() => props.changePage(i, Math.ceil(props.length[i]/props.pageSize))}>
                    {">>"}
                </button>
           </div>)}
        </div>}
    </div>}

    


    
    
</div>

export default Antet

