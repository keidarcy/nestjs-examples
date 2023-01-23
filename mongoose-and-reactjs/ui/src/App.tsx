import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3001';

// interface TodoProps {
//   title: string;
//   complete: boolean;
// }
// const Todo: React.FC<TodoProps> = ({ title, complete }) => {
//   return (
//     <div>
//       <p>{todos}</p>
//       <div>{title}</div>
//     </div>
//   );
// };

function App() {
  const [todos, setTodos] = useState('');
  useEffect(() => {
    const fn = async () => {
      const data = await (await fetch(API_URL)).json();
      setTodos(data);
    };
    fn();
    //
  }, [setTodos]);
  return <div>{JSON.stringify(todos)}</div>;
}

export default App;
