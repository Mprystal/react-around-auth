import React,{} from 'react';

function InfoTooltip(props) {
    

    return(
        <div>
             <div className="popup__container">
                

                <button
                    className="popup__close-button"
                    aria-label="Close popup button"
                    onClick={props.onClose}
                    type="button"
                ></button>
            </div>
        </div>
    )
}

export default InfoTooltip;