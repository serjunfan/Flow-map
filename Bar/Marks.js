export const Marks = ({
  top10data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  barHeight
}) =>
  top10data.map(d => (
    <rect
      className="mark"
      x={xScale(xValue(d))}
      y={yScale(yValue(d)) }
      width={xScale.bandwidth()}
      height={barHeight - yScale(yValue(d))}
    >
    <title>{tooltipFormat(yValue(d))}</title>
    </rect>
  ));
