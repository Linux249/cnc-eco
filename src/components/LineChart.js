import React, { Component } from 'react';
import styled from 'styled-components';

const linechart = styled.div`
    padding: 8px;
`;

const Path = styled.path`
    stroke-width: 3;
    fill: none;
`;

const Axis = styled.g`
    stroke: #bdc3c7;
`;

const Point = styled.circle`
    fill: #fff;
    stroke-width: 2;
`;

const Area = styled.path`
    padding: 8px;
    fill: #64b5f6;
    stroke: none;
    opacity: 0.4;
`;

const Label = styled.g`
    fill: #64b5f6;
    font-weight: 700;
`;

const Line = styled.line`
    stroke: #7d95b6;
    stroke-width: 2;
    opacity: 1;

    &:hover {
        stroke-width: 14;
    }
`;

const LineTiny = styled.line`
    stroke: #7d95b6;
    stroke-width: 3;
    opacity: 0.7;
`;

const Rect = styled.rect`
    fill: green;
    opacity: 0.2;
`;

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverLoc: null,
            activePoint: null,
            lineLeft: 175,
            lineRight: 575,
            dragLeft: false,
            dragRight: false,
        };
    }
    // GET X & Y || MAX & MIN
    getX() {
        const { data } = this.props;
        return {
            min: data[0].x,
            max: data[data.length - 1].x,
        };
    }
    getY() {
        const { data } = this.props;
        return {
            min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
            max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y),
        };
    }
    // GET SVG COORDINATES
    getSvgX(x) {
        const { svgWidth, yLabelSize } = this.props;
        return yLabelSize + (x / this.getX().max) * (svgWidth - yLabelSize);
    }
    getSvgY(y) {
        const { svgHeight, xLabelSize } = this.props;
        const gY = this.getY();
        return (
            ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / (gY.max - gY.min)
        );
    }
    // BUILD SVG PATH
    makePath() {
        const { data, color } = this.props;
        let pathD = 'M ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(data[0].y) + ' ';

        pathD += data.map((point, i) => {
            return 'L ' + this.getSvgX(point.x) + ' ' + this.getSvgY(point.y) + ' ';
        });

        return <Path d={pathD} style={{ stroke: color }} />;
    }
    // BUILD SHADED AREA
    makeArea() {
        const { data } = this.props;
        let pathD = 'M ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(data[0].y) + ' ';

        pathD += data.map((point, i) => {
            return 'L ' + this.getSvgX(point.x) + ' ' + this.getSvgY(point.y) + ' ';
        });

        const x = this.getX();
        const y = this.getY();
        pathD +=
            'L ' +
            this.getSvgX(x.max) +
            ' ' +
            this.getSvgY(y.min) +
            ' ' +
            'L ' +
            this.getSvgX(x.min) +
            ' ' +
            this.getSvgY(y.min) +
            ' ';

        return <Area d={pathD} />;
    }
    // BUILD GRID AXIS
    makeAxis() {
        const { yLabelSize } = this.props;
        const x = this.getX();
        const y = this.getY();

        return (
            <Axis>
                <line
                    x1={this.getSvgX(x.min) - yLabelSize}
                    y1={this.getSvgY(y.min)}
                    x2={this.getSvgX(x.max)}
                    y2={this.getSvgY(y.min)}
                    strokeDasharray="5"
                />
                <line
                    x1={this.getSvgX(x.min) - yLabelSize}
                    y1={this.getSvgY(y.max)}
                    x2={this.getSvgX(x.max)}
                    y2={this.getSvgY(y.max)}
                    strokeDasharray="5"
                />
            </Axis>
        );
    }
    makeLabels() {
        const { svgHeight, svgWidth, xLabelSize, yLabelSize } = this.props;
        const padding = 5;
        return (
            <Label>
                {/* Y AXIS LABELS */}
                <text transform={`translate(${yLabelSize / 2 + 20}, 20)`} textAnchor="middle">
                    {this.getY().max.toLocaleString('us-EN', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </text>
                <text
                    transform={`translate(${yLabelSize / 2 + 20}, ${svgHeight -
                        xLabelSize -
                        padding})`}
                    textAnchor="middle"
                >
                    {this.getY().min.toLocaleString('us-EN', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </text>
                {/* X AXIS LABELS */}
                <text transform={`translate(${yLabelSize}, ${svgHeight})`} textAnchor="start">
                    {this.props.data[0].d}
                </text>
                <text transform={`translate(${svgWidth}, ${svgHeight})`} textAnchor="end">
                    {this.props.data[this.props.data.length - 1].d}
                </text>
            </Label>
        );
    }
    // FIND CLOSEST POINT TO MOUSE
    getCoords(e) {
        const { svgWidth, data, yLabelSize } = this.props;
        const svgLocation = document.getElementsByClassName('linechart')[0].getBoundingClientRect();
        const adjustment = (svgLocation.width - svgWidth) / 2; //takes padding into consideration
        const relativeLoc = e.clientX - svgLocation.left - adjustment;

        let svgData = [];
        data.map((point, i) => {
            svgData.push({
                svgX: this.getSvgX(point.x),
                svgY: this.getSvgY(point.y),
                d: point.d,
                p: point.p,
            });
        });

        let closestPoint = {};
        for (let i = 0, c = 500; i < svgData.length; i++) {
            if (Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c) {
                c = Math.abs(svgData[i].svgX - this.state.hoverLoc);
                closestPoint = svgData[i];
            }
        }

        if (relativeLoc - yLabelSize < 0) {
            this.stopHover();
        } else {
            this.setState({
                hoverLoc: relativeLoc,
                activePoint: closestPoint,
            });
            this.props.onChartHover(relativeLoc, closestPoint); //Callback
            console.log({ relativeLoc, closestPoint });
            this.setState(prevState => {
                const { dragLeft, dragRight } = prevState;
                if (dragLeft) return { lineLeft: relativeLoc };
                if (dragRight) return { lineRight: relativeLoc };
                return {};
            });
        }
    }
    // STOP HOVER
    stopHover() {
        this.setState({ hoverLoc: null, activePoint: null });
        this.props.onChartHover(null, null);
    }

    // DRAG LINES
    startDrag(line) {
        if (line) console.log(line);
        if (line === 'left') this.setState({ dragLeft: true });
        else if (line === 'right') this.setState({ dragRight: true });
        const mouseup = event => {
            this.setState({
                dragLeft: false,
                dragRight: false,
            });

            document.removeEventListener('mouseup', mouseup);
        };

        document.addEventListener('mouseup', mouseup);
    }

    // MAKE ACTIVE POINT
    makeActivePoint() {
        const { color, pointRadius } = this.props;
        return (
            <Point
                style={{ stroke: color }}
                r={pointRadius}
                cx={this.state.activePoint.svgX}
                cy={this.state.activePoint.svgY}
            />
        );
    }
    // MAKE HOVER LINE
    createLine() {
        const { svgHeight, xLabelSize } = this.props;
        return (
            <g>
                <LineTiny
                    x1={this.state.hoverLoc}
                    y1={-8}
                    x2={this.state.hoverLoc}
                    y2={svgHeight - xLabelSize}
                />
            </g>
        );
    }

    makeLines() {
        const { svgHeight, xLabelSize } = this.props;
        return (
            <g>
                <Line
                    onMouseDown={() => this.startDrag('left')}
                    x1={this.state.lineLeft}
                    y1={-8}
                    x2={this.state.lineLeft}
                    y2={svgHeight - xLabelSize}
                />
                <Line
                    onMouseDown={() => this.startDrag('right')}
                    x1={this.state.lineRight}
                    y1={-8}
                    x2={this.state.lineRight}
                    y2={svgHeight - xLabelSize}
                />
            </g>
        );
    }

    makeRect() {
        const { lineLeft, lineRight } = this.state;
        const width = lineRight - lineLeft;
        return <Rect x={lineLeft} y="0" width={width} height="278" />;
    }

    render() {
        const { svgHeight, svgWidth } = this.props;

        return (
            <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className={'linechart'}
                onMouseLeave={() => this.stopHover()}
                onMouseMove={e => this.getCoords(e)}
            >
                <g>
                    {this.makePath()}
                    {this.makeArea()}
                    {this.makeLabels()}
                    {this.state.hoverLoc ? this.createLine() : null}
                    {this.state.hoverLoc ? this.makeActivePoint() : null}
                    {this.makeRect()}
                    {this.makeLines()}
                    {this.makeAxis()}
                </g>
            </svg>
        );
    }
}
// DEFAULT PROPS
LineChart.defaultProps = {
    data: [],
    color: '#2196F3',
    pointRadius: 5,
    svgHeight: 300,
    svgWidth: 900,
    xLabelSize: 20,
    yLabelSize: 80,
};

export default LineChart;
