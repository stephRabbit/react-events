import React from 'react';

const HomePage = ({ history }) => {
  const eventsLink = () => history.push('events');
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <i className="quote right icon" style={{
              display: 'inline-block',
              marginTop: '.14285714em',
              width: '1em',
              height: 'auto',
              verticalAlign: 'middle',
              fontSize: '4rem'
            }}></i>
            <div className="content" style={{display: 'inline-block'}}>Events</div>
          </h1>
          <h2>Do whatever you want to do</h2>
          <div
            className="ui huge white inverted button"
            onClick={eventsLink}
          >
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
