import React from 'react';

const FlyingBirds: React.FC = () => {
  console.log('FlyingBirds component rendered');

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Простейший тест */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-red-500 text-white flex items-center justify-center">
        ПТИЦА
      </div>
      
      {/* Отладочная информация */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded">
        <div>FlyingBirds работает!</div>
        <div>Z-index: 50</div>
        <div>Position: fixed</div>
      </div>
    </div>
  );
};

export default FlyingBirds;
