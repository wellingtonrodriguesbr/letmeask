import { useHistory } from 'react-router-dom';

import illutstrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import iconGoogleImg from '../assets/images/google-icon.svg';
import imgLogIn from '../assets/images/log-in 1.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }
      history.push('/rooms/new');
    };

    async function handleJoinRoom(event: FormEvent) {
      event.preventDefault();
      if (roomCode.trim() === '') {
        return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();
      if (!roomRef.exists()) {
        alert('Sala não existente');
        return;
      }

      history.push(`rooms/${roomCode}`);
    }

  return (
    <div id="page-auth">
      <aside>
        <img src={illutstrationImg} alt="Ilustração simbolizando as perguntas e repostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo do Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={iconGoogleImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text" 
            placeholder="Digite o código da sala" 
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
            />
            <Button type="submit">
              <img src={imgLogIn} alt="Seta para direita indicando para entrar na sala" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}