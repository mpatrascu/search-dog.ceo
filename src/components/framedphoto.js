import React from 'react';

const FramedPhoto = props =>
<div > 
    <div className="box" > 
        <img  src={props.img.name !== "" ? props.img.name : "./images/paw.png"} className={props.img.name !== "" ? "" : "no-img-logo"} alt=""></img>           
    </div>
    <div className="img-footer">
        <input type="checkbox"
            checked={props.img.checked}
            disabled={props.img.void}
            onChange={event => props.handleCheck(event, props.list, props.img.index)}/>
    </div>
</div>

export default FramedPhoto;