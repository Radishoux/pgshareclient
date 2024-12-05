import React, { useState } from 'react';

function Craft() {
  const [uploaded, setUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [errorsAllowed, setErrorsAllowed] = useState(3);
  const [uploadLink, setUploadLink] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (imagePreview && textInput) {
    const response = await fetch('https://pgshare.onrender.com/img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        img: imagePreview,
        response: textInput,
      }),
    });
    const data = await response.json();


    if (response.ok) {
      if (data.id) {
        const link = `?i=${data.id}&ae=${errorsAllowed}`;
        setUploadLink(link);
        setUploaded(true);
      }
    } else {
      console.error('Upload failed');
    }
  }
};

const copyToClipboard = () => {
  // copy to clipboard the actual link + uploadLink
  navigator.clipboard.writeText((window.location.href + uploadLink));
};

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Craft Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Upload an image of less than 100kb pls
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-full h-auto rounded" />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
              Text Input
            </label>
            <input
              type="text"
              id="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex items-center justify-center mt-2">
              <button type="button" onClick={() => setErrorsAllowed(errorsAllowed - 1)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                -
              </button>
              <div className="mx-4 text-gray-600">
                Errors allowed: {errorsAllowed}
              </div>
              <button type="button" onClick={() => setErrorsAllowed(errorsAllowed + 1)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!imagePreview || !textInput}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(!imagePreview || !textInput) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Submit
            </button>
          </div>
        </form>
        {uploaded && (
        <div className="mt-4 flex items-center">
          <a href={uploadLink} rel='noreferrer' className="text-blue-500 hover:underline" target='_blank'>
            {uploadLink}
          </a>
          <button onClick={copyToClipboard} className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>

          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Craft;