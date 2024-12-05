import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Play.css';

function Play() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [buttonColor, setButtonColor] = useState('bg-blue-500');
  const location = useLocation();
  const [blocks, setBlocks] = useState(0.5);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const id = new URLSearchParams(location.search).get('i');

    if (id) {
      fetch(`https://pgshare.onrender.com/img?id=${id}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [location]);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const img = new Image();

      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      img.onload = () => pixelate(blocks);
      img.src = data.img;

      setCanvas(canvas);
      setCtx(ctx);
      setImg(img);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => prev + 0.25);
      pixelate();
    }, 1000);
    return () => clearInterval(interval);
  }, [blocks]);

  function pixelate() {
    if (!ctx || !img) return;
    const size = (blocks) * 0.01;
    const w = canvas.width * size;
    const h = canvas.height * size;

    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
  }

  const levenshteinDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  const handleSubmit = (e) => {
    const ae = parseInt(new URLSearchParams(location.search).get('ae')) || 3;

    e.preventDefault();
    if (data && data.response) {
      const errors = levenshteinDistance(inputValue, data.response);

      if (errors === 0) {
        setButtonColor('bg-green-500');
        setBlocks(30);
        for (let i = 1; i < 99999; i++) {
          window.clearInterval(i);
        }
      } else if (errors <= ae) {
        setButtonColor('bg-yellow-500');
      } else {
        setButtonColor('bg-red-500');
      }

      setTimeout(() => {
        setButtonColor('bg-blue-500');
      }, 3000);
    }
    console.log('Submitted:', inputValue);
  };

  return (
    <div className="bg-purple-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <p className="mb-4">find the corresponding description to the picture</p>
        {data && (
          <canvas id="canvas" width="600" height="600"></canvas>
        )}
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
            placeholder="Enter text"
          />
          <button
            type="submit"
            className={`${buttonColor} text-white p-2 rounded w-full transition-colors duration-3000`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Play;