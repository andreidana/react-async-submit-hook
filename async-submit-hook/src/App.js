import React, { useState } from 'react';
import './App.css';

const useSubmit = submitFunction => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await submitFunction();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return [handleSubmit, isLoading, error];
};

function App() {
  const submit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random() * 100;
        random <= 25 ? resolve() : reject("Something went wrong!");
      }, 5000);
    });
  };
  const [handleSubmit, isLoading, error] = useSubmit(submit);

  return (
    <div className="App">
      <button onClick={handleSubmit} disabled={isLoading}>
        {!isLoading ? "Click me" : "Loading..."}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
