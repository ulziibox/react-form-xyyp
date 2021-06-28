import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";

//App bar
import { MenuItem, Badge, Button, Modal } from "@material-ui/core";

//Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MailIcon from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons";
import MoreIcon from "@material-ui/icons";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  modalPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const getModalStyle = () => {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
};

const Layout = ({ children }) => {
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  // console.log(router.pathname);

  //Drawer function
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  //App bar function
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/about">
          <a>About</a>
        </Link>
      </MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );

  const Modalbody = (
    <div style={modalStyle} className={classes.modalPaper}>
      <h2 id="simple-modal-title">Login</h2>
      <p id="simple-modal-description">You need to login</p>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Form UI
            </Typography>

            <Button color="inherit" onClick={handleModalToggle}>
              Login
            </Button>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <BookmarkBorderIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalToggle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {Modalbody}
      </Modal>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/">
            <a>
              <ListItem
                button
                selected={router.pathname === "/" ? true : false}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </a>
          </Link>
          <Link href="/about">
            <a>
              <ListItem
                button
                selected={router.pathname === "/about" ? true : false}
              >
                <ListItemIcon>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </a>
          </Link>

          <ListItem button>
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </List>
      </Drawer>

      <div className={classes.toobar} />
      {children}
    </div>
  );
};

export default Layout;
