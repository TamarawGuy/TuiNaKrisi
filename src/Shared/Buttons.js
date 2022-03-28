import React from "react";
import { Link } from 'react-router-dom';

const Buttons = () => {
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header bg-info text-white">
                    Statistics
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <Link className="text-decoration-none text-dark" to="/">
                                <div className="card my-card shadow text-center p-3">
                                    <h4>General</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link className="text-decoration-none text-dark" to="/group">
                                <div className="card my-card shadow text-center p-3">
                                    <h4>Teams</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link className="text-decoration-none text-dark" to="/individual">
                                <div className="card my-card shadow text-center p-3">
                                    <h4>Individual Questions</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buttons;