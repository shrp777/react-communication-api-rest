import { useEffect, useState } from "react";
import { Todo } from "./types/Todo";
import TodoService from "./services/TodoService";

function App() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const API: string = import.meta.env.VITE_API_REST; //on récupère la valeur de la variable d'environnement définie dans .env

  //lorsque l'on connait la valeur de la constante API
  //on déclenche le useEffect
  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        //on instancie un objet de type TodoService
        //on lui passe en paramètre l'URL de base
        const todoService: TodoService = new TodoService(API);
        //on appelle la méthode du service pour récupérer les todos
        const result: Array<Todo> = await todoService.findTodos();
        //
        setTodos(result);
        setIsError(false);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      }
    }

    fetchTodos();
  }, [API]); //on définit les valeurs surveillées par le useEffect

  return (
    <>
      <section>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {!isLoading &&
          !isError &&
          todos.map((currentTodo) => (
            <article key={crypto.randomUUID()}>
              <span>{currentTodo.title}</span>
              <span>Completed : {currentTodo.completed ? "✅" : "❌"}</span>
            </article>
          ))}
      </section>
    </>
  );
}

export default App;
