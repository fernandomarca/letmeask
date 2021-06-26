export interface Question {
  content: string;
  author: {
    name: string;
    avatar: string;
    email: string | null;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
}
