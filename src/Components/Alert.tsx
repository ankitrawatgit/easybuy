import React from 'react'

interface Props {
    message: string;
    onYesClick: () => void;
    onCancelClick: ()=>void;
  }
  
  // Define the Alert component
  const Alert: React.FC<Props> = ({ message, onYesClick,onCancelClick }) => {
    return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 bg-white p-4 rounded-lg shadow-md'>
        <p className="mb-2">{message}</p>
        <div className="flex justify-center">
          <button onClick={onYesClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>
            Yes
          </button>
          <button onClick={onCancelClick} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>
            Cancel
          </button>
        </div>
      </div>
    );
  };

export default Alert