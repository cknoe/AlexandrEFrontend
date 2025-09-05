import React, { useState } from 'react';
import { useAuth } from './AuthContext';

import '../../css/form.css'

export default function LoginForm() {
  const { login, token } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(username, password);
      alert("Connexion réussie !" + token);
    } catch {
      alert("Erreur de connexion");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input value={username} name="user_id" onChange={e => setUsername(e.target.value)} />
      <input type="password" name="user_id" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Se connecter</button>
    </form>
  );
}
