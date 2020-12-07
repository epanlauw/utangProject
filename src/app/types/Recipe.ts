type Difficulty =
  | "Super Simple"
  | "Fairly Easy"
  | "Average"
  | "Hard"
  | "Very Difficult";

type Comment = {
  username: string;
  content: string;
  createdAt: Date;
};

export type Recipe = {
  id: number;
  name: string;
  difficulty: Difficulty;
  imageUrl: string;
  steps: string;
  ingredients: Array<string>;
  comments: Array<Comment>;
  createdAt: Date;
  updatedAt: Date;
};
