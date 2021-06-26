import { useState } from "react";
import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import googleIconImg from "../assets/images/google-icon.svg";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoForDarkImg from "../assets/images/logoForDark.svg";
import { Button } from "../shared/components/Button/components/Button";
import { useAuth } from "../modules/users/hooks/useAuth";
import { database } from "../shared/infra/services/firebase";
import {
  useMediaQuery,
  useColorMode,
  Input,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import "../shared/styles/auth.scss";

export function Home() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }
    if (roomRef.val().endedAt) {
      alert("Room already closed. ");
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <Flex w="20px" alignItems="center" my="2" mx="auto">
            {colorMode === "light" ? (
              <IconButton
                borderRadius="8px"
                colorScheme="blue"
                size="lg"
                onClick={toggleColorMode}
                aria-label="Escolher tema"
                icon={<MoonIcon />}
              />
            ) : (
              <IconButton
                borderRadius="8px"
                colorScheme="blue"
                size="lg"
                onClick={toggleColorMode}
                aria-label="Escolher tema"
                icon={<SunIcon />}
              />
            )}
          </Flex>
          {colorMode === "light" ? (
            <img src={logoImg} alt="logo letmeask" />
          ) : (
            <img src={logoForDarkImg} alt="logo letmeask" />
          )}

          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={(event) => handleJoinRoom(event)}>
            <Input
              color="#29292e"
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
              _placeholder={{
                color: "#29292e",
              }}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
