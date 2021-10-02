import { useHistory, useParams } from 'react-router';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import '../styles/room.scss';
import { Link } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do Letmeask" />
          <div className="buttons-admin">
          <RoomCode code={roomId}/>
          <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <div>
          <h1>Sala: {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>
          <Link className="btn-return" to="/rooms/new">← voltar ao ínicio</Link>        
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
              key={question.id} 
              content={question.content}
              author={question.author}
              >
                <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Botão de apagar pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}