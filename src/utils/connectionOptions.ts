import Entities from "../entities/entities";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "../db.sqlite3",
  entities: Entities,
});
