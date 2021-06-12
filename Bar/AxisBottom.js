export const AxisBottom = ({ xScale, innerHeight,  tickOffset = 3 }) =>
  xScale.domain().map(tickValue => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)+30},0)`}
    >
      <text style={{ textAnchor: 'middle' }} stroke='black'
        dy=".71em" y={innerHeight + tickOffset}>
        {tickValue ==='United States of America' ? 'USA' 
        : tickValue === 'United Kingdom' ? 'UK' : tickValue}
      </text>
    </g>
  ));
