import { start_mongo } from "$db/mongo";

start_mongo().catch((e) => console.error("Error while starting MongoDB", e));
