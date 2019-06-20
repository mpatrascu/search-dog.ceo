import React from 'react';

import FramedPhoto from './framedphoto';

const Compare = props => {
        const {lists, page, pageSize, zoom} = props;

        console.log(lists)
        const visibleImgs = [];
        for (let i = 0; i < 2; i++){
            visibleImgs[i] = lists[i].slice((page[i] - 1) * pageSize, page[i] * pageSize);
            while(visibleImgs[i].length < pageSize){
                visibleImgs[i].push({name: "", checked: false, void: true})
            }
            console.log(visibleImgs[i])
        }

        return(
                <div className=" grid-container-2" >
                    {visibleImgs.map((l, i) =>
                    <div key={i} className={"photo-panel grid-container-" + zoom}>
                        {l.map((img, j) =>
                        <div key={j}>
                            <FramedPhoto img={img} list={i} index={j} 
                            handleCheck={props.handleCheck.bind(this)}/> 
                        </div>
                            )}
                    </div> )}              
                </div>
        )
    }


export default Compare;