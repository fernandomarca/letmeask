import { Box, Flex, useColorMode, useMediaQuery } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import deleteImg from "../assets/images/delete.svg";
import logoImg from "../assets/images/logo.svg";
import logoForDarkImg from "../assets/images/logoForDark.svg";
import { useRoom } from "../modules/rooms/hooks/useRoom";
import { roomService } from "../modules/rooms/services";
import { Button } from "../shared/components/Button/components/Button";
import { Question } from "../shared/components/Question/components/Question";
import { RoomCode } from "../shared/components/RoomCode/components/RoomCode";
import "../shared/styles/room.scss";

type RoomParams = {
  id: string;
};
export function AdminRoom() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { colorMode } = useColorMode();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);
  const history = useHistory();

  async function handleDeleteQuestion(questionId: string) {
    await roomService.deleteQuestion(questionId, roomId);
  }

  async function handleEndRoom() {
    await roomService.endRoom(roomId);
    history.push("/");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await roomService.checkQuestionAsAnswered(questionId, roomId);
  }

  async function handleHighlightQuestion(questionId: string) {
    await roomService.highlightQuestion(questionId, roomId);
  }

  return (
    <Box
      id="page-room"
      mx="4"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        as="header"
        w={["320px", "100%"]}
        flexDirection={isLargerThan768 ? "row" : "column"}
        mx="auto"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          className="content"
          display="flex"
          flexDirection={isLargerThan768 ? "row" : "column"}
          mx="auto"
          color="#29292e"
        >
          {colorMode === "light" ? (
            <img src={logoImg} alt="logo letmeask" />
          ) : (
            <img src={logoForDarkImg} alt="logo letmeask" />
          )}
          <Box
            flexDirection={isLargerThan768 ? "row" : "column"}
            color="#29292e"
          >
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </Box>
        </Box>
      </Box>

      <main>
        <Flex
          className="room-title"
          w={["320px", "100%"]}
          alignItems="center"
          justifyContent="center"
          mx="auto"
        >
          <h1>Sala {title}</h1>
          {questions.length > 1 ? (
            <span>{questions.length} perguntas</span>
          ) : (
            <span>{questions.length} pergunta</span>
          )}
        </Flex>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              context={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </Box>
  );
}
