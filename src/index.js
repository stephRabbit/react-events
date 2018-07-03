import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
// ------------------
import { configureStore } from './app/store/configureStore';
// ------------------
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';
// ------------------
import App from './app/layouts/App';
import ScrollToTop from './app/common/util/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./app/layouts/App', () => {
    setTimeout(render);
  })
}

store.firebaseAuthIsReady.then(() => {
  render();
});

registerServiceWorker();
