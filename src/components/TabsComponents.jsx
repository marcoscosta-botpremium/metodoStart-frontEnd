import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PsychologyIcon from '@mui/icons-material/Psychology';
import UpdateIcon from '@mui/icons-material/Update';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  tabsWrapper: {
    position: 'fixed !important',
    left: 0,
    top: 'auto !important',
    bottom: '0 !important',
    height: '72px !important',
    width: '100%',
    transition: 'transform 0.3s ease',
    transform: 'translateY(100%)',
    [theme.breakpoints.up('xs')]: {
      display: 'flex !important',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex !important',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none !important',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none !important',
    },
    [theme.breakpoints.up('xl')]: {
      display: 'none !important',
    },
  },
  tabsVisible: {
    transform: 'translateY(0)',
  },
  tabs: {
    backgroundColor: '#0d0e0d !important',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    color: 'rgb(26, 227, 99) !important',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const TabsComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const tabRoutes = ['/tutorials', '/robot', '/upgrades'];
  const currentTabIndex = tabRoutes.indexOf(location.pathname);
  const isHome = location.pathname === '/home';

  // Toggle state to control tab visibility
  const [tabsVisible, setTabsVisible] = useState(!isHome)

  useEffect(() => {
    setTabsVisible(!isHome)
  }, [isHome])

  return (
    <div className={`${classes.tabsWrapper} ${tabsVisible ? classes.tabsVisible : ''}`}>
      <Tabs
        value={currentTabIndex}
        centered
        className={classes.tabs}
      >
        <Tab
          label="Aulas"
          icon={<DashboardIcon />}
          component={RouterLink}
          to="/tutorials"
          classes={{
            wrapper: classes.tabLabel,
            icon: classes.icon,
            selected: classes.activeTab,
          }}
        />
        <Tab
          label="Operações"
          icon={<PsychologyIcon />}
          component={RouterLink}
          to="/robot"
          classes={{
            wrapper: classes.tabLabel,
            icon: classes.icon,
            selected: classes.activeTab,
          }}
        />
        <Tab
          label="Atualizações"
          icon={<UpdateIcon />}
          component={RouterLink}
          to="/upgrades"
          classes={{
            wrapper: classes.tabLabel,
            icon: classes.icon,
            selected: classes.activeTab,
          }}
        />
      </Tabs>
    </div>
  );
};

export default TabsComponent;
