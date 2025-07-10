import { UserEntity } from "@/database/user.entity";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "1111",
  database: process.env.DB_NAME || "postgres",
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy()
});

export async function initializeDatabase() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("PostgreSQL connected successfully!");
    } else {
      console.log("PostgreSQL already connected.");
    }
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
  }
}
