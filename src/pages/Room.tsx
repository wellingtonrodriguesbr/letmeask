import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { Link } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('Você precisa estar logado para enviar uma pergunta.');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content" title="Copiar código da sala">
          <img src={logoImg} alt="Logo do Letmeask" />
          <RoomCode code={roomId}/>
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

        <form onSubmit={handleCreateNewQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion} 
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta <button>faça seu login</button>.</span>
              )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
              key={question.id} 
              content={question.content}
              author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}