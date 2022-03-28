import React from 'react'

const IncreaseDecrease = (props) => {
    return (
        <div className="col-md-12 increase-decrease">
            <div className="increase">
                <div className="card my-card shadow text-center p-3">
                    <h4>{props.first} </h4>
                </div>
            </div>
            <div className="decrease">
                <div className="card my-card shadow text-center p-3">
                    <h4>{props.second} </h4>
                </div>
            </div>
        </div>
    )
}

export default IncreaseDecrease
