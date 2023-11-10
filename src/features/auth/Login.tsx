import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSessionPassword } from '../../store/sessionSlice';
import { login } from '../../store/authSlice';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const correctPassword = '1234';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      dispatch(setSessionPassword(password));
      dispatch(login());

      alert('Senha correta! Acesso permitido.');
      navigate('/');
    } else {
      alert('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 py-8 px-4 rounded-lg shadow-md w-full sm:max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">
          Página Protegida por Senha
        </h2>
        <label className="text-gray-400">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 px-4 py-2 w-full rounded-md bg-gray-700 text-white"
            required
          />
        </label>
        <button
          onClick={handlePasswordSubmit}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Acessar
        </button>
      </div>
    </div>
  );
};

export default Login;
