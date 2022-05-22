import React, { useState, useEffect, useMemo } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from "react-redux";
import { getstudentData } from "../redux/actions/attendance/attendanceaction";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GetStudentData = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const dispatch = useDispatch();
    const history = useNavigate();


    const time = null;


    const getData = useSelector((state) => state.getData);
    const { users } = getData;
    useEffect(() => {
        dispatch(getstudentData());
    }, [dispatch]);

    const customcheckout = useMemo(() => {
        let checkarray = new Array()
        let i = 0
        while (i < users?.length) {
            checkarray.push(null)
            i++
        }
        return checkarray
    }, [])

    const [ctime, setDate] = useState(customcheckout);

    const handelTime = (i) => {
        let time = new Date().toLocaleTimeString();
        let newarray = [...ctime]
        newarray[i] = time
        setDate(newarray);
    }
    const renderTable = () => {
        if (users) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Date</StyledTableCell>
                                <StyledTableCell align="left">Qr Code</StyledTableCell>
                                <StyledTableCell align="left">Place</StyledTableCell>
                                <StyledTableCell align="left">CheckInTime</StyledTableCell>
                                <StyledTableCell align="left">CheckOutTime</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .map((user, i) => (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell>{user.date}</StyledTableCell>
                                        <StyledTableCell>{user.qrCodeId}</StyledTableCell>
                                        <StyledTableCell>{user.place}</StyledTableCell>
                                        <StyledTableCell>{user.checkInTime}</StyledTableCell>
                                        <StyledTableCell>{ctime[i]}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                onClick={() => handelTime(i)}
                                                style={{ backgroundColor: "darkgray" }}
                                            >
                                                CheckOut
                                            </Button>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            );
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col mt-5">
                    <Typography variant="h3" component="h2"
                        sx={{
                            marginTop: 10
                        }}
                    >
                        Know Your Data
                    </Typography>
                </div>
            </div>
            <div className="row">
                <div className="col">{renderTable()}</div>
            </div>
        </div>
    );
};

export default GetStudentData;

