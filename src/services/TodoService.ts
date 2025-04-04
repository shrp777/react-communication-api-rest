import axios, { AxiosInstance } from "axios";
import { Todo } from "../types/Todo";

export default class TodoService {
  baseURL: string;
  httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    //https://jsonplaceholder.typicode.com
    this.httpClient = axios.create({
      baseURL: baseURL,
      timeout: 1000,
      headers: { "Content-Type": "application/json" }
    });
  }

  async findTodos(): Promise<Array<Todo>> {
    try {
      //on complète la base d'URL avec "/todos"
      //on stocke le résultat de la requête HTTP, soit, des données au format JSON si la requête est résolue
      const response = await this.httpClient.get<Todo[]>("/todos");

      //on map une fonction anonyme qui génère un objet de type Todo à partir des données JSON de chaque item
      const todos: Array<Todo> = response.data.map<Todo>((jsonItem) => ({
        id: jsonItem.id,
        completed: jsonItem.completed,
        userId: jsonItem.userId,
        title: jsonItem.title
      }));

      return todos;
    } catch (error) {
      //si la requête échoue
      if (axios.isAxiosError(error)) {
        console.error("Axios error :", error.response?.status, error.message);
        throw new Error("Can't fetch todos");
      } else {
        console.error("Unknown error :", error);
        throw error;
      }
    }
  }
}
