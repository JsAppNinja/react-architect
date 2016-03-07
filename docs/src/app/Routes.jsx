import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as components from './components';

import App from './App';
import GettingStarted from './GettingStarted';
import Customization from './Customization';
import Typography from './Typography';
import Home from './Home';
import NavigationDrawers from './components/NavigationDrawers';
import HelloWorld from './commonExamples/HelloWorld';
import { toDashedName } from './utils';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route key={GettingStarted.path} path={GettingStarted.path} component={GettingStarted} />
    <Route key={Customization.path} path={Customization.path} component={Customization} />
    <Route key={Typography.path} path={Typography.path} component={Typography} />
    {Object.keys(components).map(k => {
      const component = components[k];
      if(!component.name || component.name === 'NavigationDrawers') {
        return;
      }
      const path = toDashedName(component.name);
      return <Route key={path} path={`components/${path}`} component={component} />;
    })}
    <Route key="navigation-drawers-routes" path="/components/navigation-drawers" component={NavigationDrawers}>
      <Route path=":suffix" component={HelloWorld} />
    </Route>
  </Route>
);
