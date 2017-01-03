import React from 'react';
import { Overlay, Image, Popover} from 'react-bootstrap';


//import App from './Test.js';

const popoverFocus = (
  <Popover id="popover-trigger-focus" title="Popover bottom">
    <strong>Holy guacamole!</strong> 
      Check this info.
  </Popover>
);



var BaseHeader = React.createClass({
  render: function() {
    return (
      <div className="BaseHeader" >
        <Overlay trigger="focus" placement="bottom" overlay={popoverFocus}>
          <Image src="img/buildings/crystal01.png" responsive />
        </Overlay>
      </div>
    )
  }
});

export default BaseHeader;