import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/1todos?userId=${userId}`);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos?userId=11443/${todoId}`);
};
