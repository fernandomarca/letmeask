import { database } from "../../../../../shared/infra/services/firebase";
import { User } from "../../../../users/models/user";
import { Question } from "../../../models/question";
import { IRoomService } from "../../IRoomService";

export class RoomService implements IRoomService {
  public async sendQuestionService(roomId: string, question: Question) {
    await database.ref(`rooms/${roomId}/questions`).push(question);
  }

  public async likeQuestion(
    roomId: string,
    questionId: string,
    user: User | undefined
  ) {
    await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
      authorId: user?.id,
    });
  }

  public async removeLikeQuestion(
    roomId: string,
    questionId: string,
    likeId: string
  ) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
      .remove();
  }

  public async deleteQuestion(
    questionId: string,
    roomId: string
  ): Promise<void> {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  public async endRoom(roomId: string): Promise<void> {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
  }

  public async checkQuestionAsAnswered(
    questionId: string,
    roomId: string
  ): Promise<void> {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  public async highlightQuestion(
    questionId: string,
    roomId: string
  ): Promise<void> {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }
}
