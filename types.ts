
export interface Question {
  id: number;
  text: string;
  answer: string;
  hint: string;
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  VICTORY = 'VICTORY'
}
