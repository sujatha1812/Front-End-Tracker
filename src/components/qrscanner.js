import { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { backendUrl } from "../services/config";
import emailjs from '@emailjs/browser';

import { useDispatch, useSelector } from "react-redux";



const Test = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    console.log("info", userInfo);

    const [code, setCode] = useState(null);
    const [showDialog, setDiaglog] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [precScan, setPrecScan] = useState("");
    const [selected, setSelected] = useState("environment");
    const [errorMessage, setErrorMessage] = useState(null);
    const [userEmail] = useState(userInfo.profile.email);
    const numbers = ["maths", "science", 'canteen'];
    const doubled = numbers.map((number) => number);
    console.log(doubled);


    const formSubmitHandler = (e) => {
        e.preventDefault()
        // var templateParams = {
        //     to_name: 'xyz',
        //     from_name: 'abc',
        //     message_html: 'Please Find out the attached file'
        // };
        // emailjs.send("service_mas4wmn", "template_ssqkzc1", templateParams)
        // emailjs.send("service_asw0i9g", "template_ssqkzc1");
        emailjs
            .sendForm(
                "service_asw0i9g",
                "template_ssqkzc1",
                e.target,
                "eUeVCvjuHSKKMWfL-"
            )
            .then(
                (result) => {
                    console.log("res", result.text);
                },
                (error) => {
                    console.log("result", error);
                }
            );
    }

    async function fetchData({ qr = "" }) {
        try {
            setProcessing(true);
            const result = await axios.put(
                `${backendUrl}`
            );
            console.log("scanned code", qr);
            console.log("r", result)

            console.log('results', result)
            const { message, payement } = result.data;
            const current = new Date();
            // console.log(payement);
            if (!message) {
                setCode({
                    place: doubled,
                    date: current.getDate(),
                    checkInTime: current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds(),
                    checkOutTime: "null",
                    expired: false,
                    checkInStatus: false,
                    checkOutStatus: false,
                });
                // setPrecScan(null);
                setDiaglog(true);
            } else {
                setCode(null);
                setPrecScan(null);
                setErrorMessage(message);
                setDiaglog(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleScan = async (scanData) => {
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "" && !showDialog && !processing) {
            console.log(`loaded >>>`, scanData);
            // setPrecScan(scanData);
            await fetchData({ qr: scanData });
        }
    };
    const handleError = (err) => {
        console.error(err);
    };
    return (
        <div className="App">
            <h1>Scan Your code to mark yours</h1>
            <h2>
                Last Scan:{precScan}
                {selected}
            </h2>
            <select onChange={(e) => setSelected(e.target.value)}>
                <option value={"environment"}>Back Camera</option>
                <option value={"user"}>Front Camera</option>
            </select>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <div className="close">
                            <button
                                onClick={() => {
                                    setCode(null);
                                    setErrorMessage(null);
                                    setDiaglog(false);
                                    setProcessing(false);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        {errorMessage && (
                            <div className="errorMessage">
                                <h2>{errorMessage}</h2>
                            </div>
                        )}
                        {code && (
                            <div className="description">
                                <h4 className="title">Scan Result</h4>
                                <div className="detail detail-first-child">
                                    <h6 className="detail-header">Place :</h6>
                                    <h6 className="detail-content green">{code.place}</h6>
                                </div>
                                <div className="detail">
                                    <h6 className="detail-header">Date :</h6>
                                    <h6 className="detail-content">{code.date}</h6>
                                </div>
                                <div className="detail">
                                    <h6 className="detail-header">checkInTime :</h6>
                                    <h6 className="detail-content">{code.checkInTime}</h6>
                                </div>


                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* {code && <h2>{code.text}</h2>} */}
            {!showDialog && !processing && (
                <QrReader
                    facingMode={selected}
                    delay={500}
                    onError={handleError}
                    onScan={handleScan}
                // chooseDeviceId={()=>selected}
                // style={{ width: "50px", heigth: "50px" }}
                />
            )}
            <form onSubmit={formSubmitHandler}>
                <div className="field">
                    <label>Email Id</label>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={userEmail}
                        disabled
                    />
                </div>
                <div>
                    <button className="submit">Submit</button>
                </div >
            </form>
        </div>
    );
};

export default Test;
