import React from 'react';
import { connect } from 'react-redux'
import buildings_pngs from '../util/buildings_img_nod.json'

class BuildingMenu extends React.Component {
    constructor(props)
    {
        super(props)
        this.buildingSelect = this.buildingSelect.bind(this)
        this.buildingMenuShow = this.buildingMenuShow.bind(this)
    }
  render() {
    const divStyle = {
              position: 'absolute',
              backgroundColor: '#EEE',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              border: '1px solid #CCC',
              borderRadius: 3,
              marginLeft: -5,
              marginTop: 5,
              padding: 10,
            }
    return (
      <div
          className="BuildingMenu"
          style={divStyle}
          onClick={this.buildingMenuShow}
      
      >
        //buildings in the menu are given through 'buildings_pngs'
        {Object.keys(buildings_pngs).map((buildingName) => {
            const img =  require('./../img/buildings/NOD/' + buildingName + '.png')
            return (
                <span className="BuildingMenuItem">
                    <img
                        onClick={this.buildingSelect}
                        src={img} //NOD GDI variable
                        alt={buildingName}
                        data-name={buildingName}
                        data-id={buildings_pngs[buildingName]}
                    />
                    <p>{buildings_pngs[buildingName]}</p>
                </span>
          );
        })}
      </div>
    );
  }
    
    //add building to base if selected in menu
    buildingSelect(event)
    {
        const id = event.target.dataset.id
        const name = event.target.dataset.name
        this.props.dispatch({
            type: 'menu.buildingSelect',
            name,
            id

        })
    }
    
    // keep building menu open while using it 
    buildingMenuShow(event)
    {
        const from =  this.props.x + this.props.y*9
        this.props.dispatch({
            type: 'menu.buildingMenuShow',
            from // TODO warum braucht er hier nochmal from? 
        })
    }

}




export default connect()(BuildingMenu);
