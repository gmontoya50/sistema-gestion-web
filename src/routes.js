import React from 'react'

// examples
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]
function renderSwitch(from) {
    switch (from) {
      case "admin":
        return routes;
      case "user":
        return routes;
      default: return [];  
    }
}
const conditional = renderSwitch(
  window.localStorage.getItem("role"),
);

export default conditional;
