import React from "react";
import bg from "../assets/bg";
import '../assets/home.css'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const history = useNavigate()
    const handleButton = () => {
        history('/login')
    }
    return (
        <div className="container">
            <div className="Content">
                <div className="SubContent">
                    <img src={bg} alt="Home" />
                    <Button variant="contained" className="btn" onClick={handleButton}
                    >Tracking On</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
