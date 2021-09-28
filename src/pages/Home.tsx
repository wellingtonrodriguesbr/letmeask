import illutstrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import iconGoogleImg from '../assets/images/google-icon.svg';
import imgLogIn from '../assets/images/log-in 1.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home() {
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
          <button className="create-room">
            <img src={iconGoogleImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" name="" id="" placeholder="Digite o código da sala" />
            <Button type="submit">
              Entrar na sala
              <img src={imgLogIn} alt="" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}