import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Collapse,
  Badge,
} from '@material-ui/core';
import {
  Home,
  Accessibility,
  Work,
  SportsBasketball,
  Bathtub,
  AddShoppingCart,
  ExpandMore,
  ExpandLess,
  Done,
  ClosedCaptionOutlined,
  HomeWorkOutlined,
  SupervisedUserCircle,
  Money,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

import { logOutUser } from '../../redux/actions/userAction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: '#263238',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#333',
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    color: '#ffffff',
  },
  linkDark: {
    color: '#333333',
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  image: {
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    marginLeft: 25,
    marginTop: 10,
  },
}));

const Navbar = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdwonOpen, setDropdownOpen] = useState(false);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);

  const handleCart = () => history.push('/addtocart');

  const handleClose = (e) => setAnchorEl(null);

  const handleDropDownOpen = (e) => setDropdownOpen(!dropdwonOpen);

  const handleLogout = () => {
    props.logOutUser();
    history.push('/');
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        {props.user.authenticated && props.user.data ? (
          <Avatar
            src={`http://localhost:5000/uploads/${props.user.data.image}`}
            className={classes.image}
          />
        ) : null}
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </Link>
          <Link to="/customers" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Accessibility />
              </ListItemIcon>
              <ListItemText>Customers</ListItemText>
            </ListItem>
          </Link>
          <Link to="/contracters" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText>Contracters</ListItemText>
            </ListItem>
          </Link>
          <Link to="/designer" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <SportsBasketball />
              </ListItemIcon>
              <ListItemText>Designer</ListItemText>
            </ListItem>
          </Link>
          <Link to="/plumber" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Bathtub />
              </ListItemIcon>
              <ListItemText>Plumber</ListItemText>
            </ListItem>
          </Link>
          <Link to="/shop" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Money />
              </ListItemIcon>
              <ListItemText>Product Order</ListItemText>
            </ListItem>
          </Link>
          {props.user.authenticated ? (
            <>
              <ListItem button onClick={handleDropDownOpen}>
                <ListItemIcon>
                  <HomeWorkOutlined />
                </ListItemIcon>
                <ListItemText primary="Project Details" />
                {dropdwonOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={dropdwonOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to={'/openproject'} className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Done />
                      </ListItemIcon>
                      <ListItemText primary="opne prokect" />
                    </ListItem>
                  </Link>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ClosedCaptionOutlined />
                    </ListItemIcon>
                    <ListItemText primary="close project" />
                  </ListItem>
                </List>
              </Collapse>
            </>
          ) : null}
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
            E-contracter
          </Typography>
          {props.user.authenticated && (
            <div className={classes.toolbarButtons}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <Avatar
                  src={
                    props.user.data
                      ? `http://localhost:5000/uploads/${props.user.data.image}`
                      : `http://localhost:5000/uploads/no-image.jpg`
                  }
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link className={classes.linkDark} to="/">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>logout</MenuItem>
              </Menu>
            </div>
          )}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleCart}
          >
            <Badge badgeContent={cartItems.length} color="primary">
              <AddShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="e-contracter">
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
        <Hidden mdDown implementation="css">
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
        {props.children}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logOutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
