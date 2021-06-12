export const AxisLeft = ({ yScale, innerWidth, 
      tickFormat,tickOffset = 3,ticknum =4 }) =>
  yScale.ticks(ticknum).map(tickValue => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        dy=".32em"
        stroke="black"
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
