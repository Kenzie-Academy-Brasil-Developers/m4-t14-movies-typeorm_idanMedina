import app from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connected.")

app.listen(PORT, async () => {
  console.log(`Server is running on https://localhost:'${PORT}'`);
})
});
