import React from 'react'
import PropTypes from 'prop-types';
import Area from '../style/Area'

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}
class Layout extends React.Component {
    componentDidMount(props) {
        this.updateCanvas(props);
    }
    // componentDidUpdate({layout} = {}) {
    //     this.updateCanvas(layout);
    // }
    updateCanvas() {
        const layout  = this.props.layout
        console.log(layout)
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 200, 200);
        // draw children “components”
        let x = 0,
            y = 0
        layout.layout.split("").map((slot, i) => {
            //console.log({i, x, y})
            const color = slot === "." ? "white" : slot === "t" ? "green" : "blue"
            ctx.fillStyle = color
            ctx.fillRect(x, y, 20, 20);
            x += 20
            if(x > 8*20 ) {
                x = 0
                y += 20
                if(y < 160) {
                    // horizontal
                    ctx.moveTo(0, y)
                    ctx.lineTo(180, y)
                }
                if(y < 180) {
                    //vertikal
                    ctx.moveTo(y, 0)
                    ctx.lineTo(y, 160)
                }
            }
            ctx.strokeStyle = "rgba(50,150,120,0.1)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
        })


        //rect({ctx, x: 0, y: 0, width: 20, height: 20});
        //rect({ctx, x: 110, y: 110, width: 20, height: 20});
    }
    render() {
        const { layout } = this.props
        return (
            <Area>
                <div>{`T: ${layout.tib}    - K: ${layout.cris}`}</div>
                <canvas ref="canvas" width={180} height={160}/>
                <div>{`${layout.x} : ${layout.y}`}</div>
            </Area>
        );
    }
}
Layout.propTypes = {
    layout: PropTypes.object.isRequired
}
export default Layout