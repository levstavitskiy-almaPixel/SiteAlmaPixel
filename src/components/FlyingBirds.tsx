import React from 'react';

const FlyingBirds: React.FC = () => {
  console.log('FlyingBirds component rendered');
  
  // Добавляем видимые логи на страницу
  const logMessage = 'FlyingBirds component rendered at: ' + new Date().toLocaleTimeString();

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
        <div className="text-xs mt-1">{logMessage}</div>
      </div>
      
      {/* Видимые логи */}
      <div className="absolute bottom-4 left-4 bg-black text-green-400 p-2 rounded text-xs max-w-md">
        <div>Console Logs:</div>
        <div>✓ FlyingBirds component rendered</div>
        <div>✓ Time: {new Date().toLocaleTimeString()}</div>
        <div>✓ Check Safari Console (F12) for more</div>
      </div>
    </div>
  );
};

export default FlyingBirds;
