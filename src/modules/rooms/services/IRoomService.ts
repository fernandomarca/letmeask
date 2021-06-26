import { User } from "../../users/models/user";
import { Question } from "../models/question";

export interface IRoomService {
  sendQuestionService(roomId: string, question: Question): Promise<void>;

  likeQuestion(
    roomId: string,
    questionId: string,
    user: User | undefined
  ): Promise<void>;

  removeLikeQuestion(
    roomId: string,
    questionId: string,
    likeId: string
  ): Promise<void>;

  deleteQuestion(questionId: string, roomId: string): Promise<void>;

  endRoom(roomId: string): Promise<void>;

  checkQuestionAsAnswered(questionId: string, roomId: string): Promise<void>;

  highlightQuestion(questionId: string, roomId: string): Promise<void>;
}
