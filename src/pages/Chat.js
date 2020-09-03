import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import decode from "jwt-decode";

import Messages from "./../components/Messages";
import UserList from "./../components/UserList";
import AdminView from "./../components/ForAdmin";
import Footer from "./../components/Footer";

const drawerWidth = 310;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    height: "788px",
    overflowY: "scroll",
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const user = token && decode(token);

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:3001", {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      newSocket.on("disconnect", () => {
        deleteToken();
        history.push("/login");
      });

      newSocket.on("result", (result) => {
        const users = result;
        setAllUsers(users);
      });

      newSocket.on("message", (message) => {
        if (typeof message === "string") {
          alert(message);
        } else {
          setMessages((messages) => [...messages, message]);
        }
      });

      setSocket(newSocket);
    } else {
      history.push("/");
    }
  }, [token, history]);

  const signOut = () => {
    deleteToken();
    socket.disconnect();
    history.push("/login");
  };

  const drawer = (
    <div className="nav">
      <div className={classes.toolbar} />
      <Divider />
      {user && user.isAdmin ? (
        <AdminView allUsers={allUsers} socket={socket} user={user} />
      ) : (
        <UserList allUsers={allUsers} />
      )}
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="wrapper">
      <div className={classes.container}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className="toolbar-cust">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Chat
            </Typography>
            <Button variant="contained" disableElevation onClick={signOut}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Messages messages={messages} />
        </main>
      </div>
      <Footer socket={socket} />
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
