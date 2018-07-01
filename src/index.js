import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
// ------------------
import { loadEvents } from './features/event/eventsActions';
// ------------------
import './index.css';
import 'semantic-ui-css/semantic.min.css';
// ------------------
import App from './app/layouts/App';
import ScrollToTop from './app/common/util/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
// Add data directly to store on intial loaded
store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
