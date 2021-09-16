import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Upcomingbookings from './UpcomingBookingTable';


// import AddVaccineForm from './AddVaccineForm'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '85%',
    backgroundColor: '#fff',
    marginTop: '120px',
    marginLeft: '230px'

  },
  selected:{
      backgroundColor : theme.palette.background.paper,
      '&$selected':{
          backgroundColor : "black"
      }
  },
  indicator:{
      backgroundColor:'white',
      color : 'black'
  },
 
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event);
    console.log(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.indicator}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <LinkTab label="Upcoming Bookings"  {...a11yProps(0)} />
        
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        
        <Upcomingbookings/>
      </TabPanel>
    </div>
  );
}
