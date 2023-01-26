import { RecordsModel } from "./records.model";
import { ResultsModel } from "./results.model";

/* Definición de la interfaz para el GameModel. */
export interface GameModel{
  gameId: Number,
  playerId: String,
  active: boolean,
  finished: boolean,
  gameDate: Date,
  records: RecordsModel[],
  results: ResultsModel[]
}
