import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { WaveGroup } from './waveGroup';

const Waves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [time, setTime] = useState(0);
  const requestRef = useRef<number>(0);

  const waveGroup = new WaveGroup();

  useEffect(() => {
    resize();
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // ctx 생기면
  useEffect(() => {
    if (ctx instanceof CanvasRenderingContext2D) {
      ctx.scale(2, 2);
      resize();
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [canvasRef.current]);

  // 사이즈 조정
  const resize = () => {
    if (canvasRef.current instanceof HTMLCanvasElement) {
      const width = document.body.clientWidth ?? window.innerWidth;
      const height = document.body.clientHeight ?? window.innerHeight;
      canvasRef.current.width = width * 1.5;
      canvasRef.current.height = height;

      const context = canvasRef.current.getContext('2d');
      setCtx(context);
      context?.scale(4, 2);
      waveGroup.resize(width, height);
    }
  };

  // 파도를 움직이는 함수
  const animate = (t: DOMHighResTimeStamp) => {
    if (canvasRef.current instanceof HTMLCanvasElement) {
      if (ctx instanceof CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        waveGroup.draw(ctx);
      }
      setTime(t);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  return (
    <Div>
      {/* <p>{time}</p> */}
      <canvas ref={canvasRef} />
    </Div>
  );
};
export default Waves;

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;

  align-items: center;
  canvas {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  p {
    display: none;
  }
`;
