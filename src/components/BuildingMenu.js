import React, { Component } from 'react'
import { connect } from 'react-redux'
import buildings_pngs from '../util/buildings_img_nod.json'
import { changeBuilding  } from './../actions/buildings'

class BuildingMenu extends Component {
    constructor(props)
    {
        super(props)
        // TODO BUILDING SELECT
        //this.buildingSelect = this.buildingSelect.bind(this)
        //this.buildingMenuShow = this.buildingMenuShow.bind(this)
        // this.changeBuildingLvl = this.changeBuildingLvl.bind(this)

    }

    render() {
        const { changeBuild, from, lvl } = this.props
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
            >
            {Object.keys(buildings_pngs).map((buildingName) => {
                const img =  require('./../img/buildings/NOD/' + buildingName + '.png')
                return (
                    <div
                        className="BuildingMenuItem"
                        key={buildingName}
                        onClick={() => changeBuild(from, buildings_pngs[buildingName], lvl)}
                    >
                        <img
             //  onClick={changeBuild(buildings_pngs[buildingName])}
                           // onClick={this.buildingSelect}
                            src={img} //NOD GDI variable
                            alt={buildingName}
                            data-name={buildingName}
                            data-id={buildings_pngs[buildingName]}
                        />
                        <p>{buildings_pngs[buildingName]}</p>
                    </div>
              )
            })}
          </div>
        )
    }


    //TODO BUILDING SELECT
    // //add building to base if selected in menu
    // buildingSelect(event)
    // {
    //     const id = event.target.dataset.id
    //     const name = event.target.dataset.name
    //     this.props.dispatch({
    //         type: 'menu.buildingSelect',
    //         name,
    //         id
    //     })
    // }
    
    // keep building menu open while using it 
   /* buildingMenuShow()
    {
        const from =  this.props.slot
        this.props.dispatch({
            type: 'menu.bMenuOpenFrom',
            from // TODO warum braucht er hier nochmal from? 
        })
    }*/



}
function mapStateToProps(state) {
    return {
        lvl: state.buildings[state.menu.from].lvl || state.menu.lvl,
        from: state.menu.from
    }
}

const mapDispatchToProps = (dispatch, props) => {
    console.log("WERDEN IM MENÜ DIE RICHRIGEN ÜBERgeBEN?")
    console.log(props)
    console.log(props.from)
    console.log(props.lvl)
    return {
        changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMenu)
