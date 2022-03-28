import React from 'react'

const Info = () => {
    return (
        <div className='card'>
            <div className="card-header bg-info text-white">
                Information
            </div>
            <div className="card-body">
                <marquee behavior="" direction="">
                    <h3 className="my-4">This is the Information</h3>
                </marquee>
            </div>
        </div>
    )
}

export default Info
