import { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../shared/components/Button/components/Button";
import { useAuth } from "../modules/users/hooks/useAuth";
import { database } from "../shared/infra/services/firebase";
import { useMediaQuery, Input } from "@chakra-ui/react";
import "../shared/styles/auth.scss";

export function NewRoom() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }
  return (
    <div id="page-auth">
      {isLargerThan768 ? (
        <aside>
          <img
            src={illustrationImg}
            alt="ilustração simbolizando perguntas e respostas"
          />
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>
      ) : null}
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo letmeask" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <Input
              color="#29292e"
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
