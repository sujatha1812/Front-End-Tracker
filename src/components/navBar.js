import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/users/useractions";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import GroupsIcon from "@mui/icons-material/Groups";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import CallMadeIcon from "@mui/icons-material/CallMade";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

function NavBar() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history = useNavigate();
    const isstaff = sessionStorage.getItem("isstaff");
    const username = JSON.parse(sessionStorage.getItem("username"));
    const logoutHandler = () => {
        dispatch(logoutUser());
        history("/");
    };
    const mystyle = {
        color: "white",
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Touchless Timesheet Tracker
                    </Typography>
                    <ul>

                        {isstaff === "true" ? (
                            <>
                                <a className="link" href="all-students" style={mystyle}>
                                    <Tooltip
                                        title="All-Students"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <GroupsIcon />
                                    </Tooltip>
                                </a>

                                <a className="link" href="create-attendance" style={mystyle}>
                                    <Tooltip
                                        title="Generate-code"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <SpellcheckIcon />
                                    </Tooltip>
                                </a>

                                <a className="link" href="user-profile" style={mystyle}>
                                    <Tooltip
                                        title="Your Profile"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <ContactPageIcon />
                                    </Tooltip>
                                </a>

                                <a className="link" href="get-student-data" style={mystyle}>
                                    <Tooltip
                                        title="Know Your Data"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <InfoIcon />
                                    </Tooltip>
                                </a>
                            </>

                        ) : (
                            <>
                                <a className="link" href="user-profile" style={mystyle}>
                                    <Tooltip
                                        title="Your Profile"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <ContactPageIcon />
                                    </Tooltip>
                                </a>

                                <a className="link" href="get-student-data" style={mystyle}>
                                    <Tooltip
                                        title="Know Your Data"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <InfoIcon />
                                    </Tooltip>
                                </a>
                                <a className="link" href="check-in" style={mystyle}>
                                    <Tooltip
                                        title="Scanner"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <DocumentScannerIcon />
                                    </Tooltip>
                                </a>
                                <a className="link" href="faq" style={mystyle}>
                                    <Tooltip
                                        title="FAQ"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <QuestionMarkIcon />
                                    </Tooltip>
                                </a>
                            </>
                        )}
                        {userInfo ? (
                            <>
                                <Tooltip
                                    title={username}
                                    style={{
                                        cursor: "pointer",
                                        marginRight: 100,
                                        fontSize: 45,
                                    }}
                                    variant="contained"
                                >
                                    <PersonIcon />
                                </Tooltip>
                                <button
                                    onClick={logoutHandler}
                                    className="logout"
                                    style={{ marginRight: 20 }}
                                >
                                    <Tooltip
                                        title="Logout"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <LogoutIcon
                                            style={{
                                                fontSize: 40,
                                            }}
                                        />
                                    </Tooltip>
                                </button>
                            </>
                        ) : (
                            <>
                                <a href="login" className="link" style={mystyle}>
                                    <Tooltip
                                        title="Login"
                                        style={{
                                            cursor: "pointer",
                                            marginRight: 100,
                                            fontSize: 45,
                                        }}
                                        variant="contained"
                                    >
                                        <CallMadeIcon />
                                    </Tooltip>
                                </a>
                            </>
                        )}

                    </ul>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
