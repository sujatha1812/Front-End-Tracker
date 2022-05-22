import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateCheckout } from '../redux/actions/attendance/attendanceaction';

const Checkout = () => {
    const history = useNavigate();
    const timer = JSON.parse(sessionStorage.getItem("time"));
    console.log("updateproduct", timer);

    const times = null;
    const [checkoutime, setCheckOutTime] = useState(times);
    const dispatch = useDispatch();

    const handleTime = () => {
        let times = new Date().toLocaleTimeString();
        setCheckOutTime(times);
        dispatch(updateCheckout());
        history("/get-student-data");
    }
    return (
        <div>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">CheckOutTime</label>
                        <input
                            value={checkoutime}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>


                    <button type="submit" onClick={() => handleTime}>
                        Update your time
                    </button>
                </fieldset>
            </form>
        </div>
    )

}

export default Checkout
