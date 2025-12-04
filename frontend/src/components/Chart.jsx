import React from 'react';

const Chart = ({ type, data }) => {
  const canvasRef = React.createRef();

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (type === 'line') {
      // Draw a line chart
      ctx.beginPath();
      ctx.moveTo(0, data[0]);
      for (let i = 1; i < data.length; i++) {
        ctx.lineTo(i, data[i]);
      }
      ctx.stroke();
    } else if (type === 'bar') {
      // Draw a bar chart
      const width = canvasRef.current.width / data.length;
      const height = canvasRef.current.height;
      const barWidth = width / 2;

      for (let i = 0; i < data.length; i++) {
        const x = i * width + width / 4;
        const y = height - data[i];
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, barWidth, data[i]);
      }
    } else if (type === 'pie') {
      // Draw a pie chart
      const radius = canvasRef.current.width / 2;
      let startAngle = 0;

      for (let i = 0; i < data.length; i++) {
        const angle = (data[i] / sum(data)) * 360;
        ctx.beginPath();
        ctx.moveTo(canvasRef.current.width / 2, canvasRef.current.height / 2);
        ctx.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, radius, startAngle, startAngle + angle);
        startAngle += angle;
        ctx.fillStyle = `rgba(${data[i] * 10}, ${i * 50}, 0)`;
        ctx.fill();
      }
    }
  }, [type, data]);

  return (
    <canvas ref={canvasRef} width="400" height="300"></canvas>
  );
};

export default Chart;