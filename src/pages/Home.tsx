import { useHistory } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

import illutstrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import iconGoogleImg from '../assets/images/google-icon.svg';
import imgLogIn from '../assets/images/log-in 1.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home() {
  const history = useHistory();

  function handleCreateRoom() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).then(result => {
      console.log(result);
    });

  // history.push('/rooms/new');
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
          <form>
            <input type="text" placeholder="Digite o código da sala" />
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