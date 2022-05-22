import react, { useState, useEffect } from 'react'
import QRCode from "qrcode.react";

import { useDispatch, useSelector } from "react-redux";
import { GenerateCode } from "../redux/actions/attendance/attendanceaction";


const Createattendance = () => {
    const [qrValue, setQrValue] = useState("");
    useEffect(() => {
        const interval = setInterval(function () {
            window.location.reload();
        }, 10000);

        return () => clearInterval(interval)
    }, []);

    const dispatch = useDispatch();
    const generateCodeDetails = useSelector((state) => state.generateCode);
    const { code } = generateCodeDetails;
    console.log(code)
    useEffect(() => {
        dispatch(GenerateCode());
    }, [dispatch]);
    return (
        <div>
            <QRCode
                id="qr-gen"
                value={code}
                size={490}
                level={"H"}
                includeMargin={true}
            />


        </div>
    )
}

export default Createattendance





