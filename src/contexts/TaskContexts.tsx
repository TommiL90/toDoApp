import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { iChildrenProps } from './types';
import { api } from '../services';
import { AxiosResponse } from 'axios';


interface iTask {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}
interface iTaskContext {
  tasks: iTask[];
  createTask: (data: Omit<iTask,'id'>, accessToken: string) => Promise<void>;
}

export const TasksContext = createContext({} as iTaskContext);

export const TasksProvider = ({ children }: iChildrenProps) => {
  const userId: string | null = localStorage.getItem('@to-do:Id');
  const token: string | null = localStorage.getItem('@to-do:Token');   
  const [tasks, setTasks] = useState([] as iTask[]);

  const createTask = useCallback(async (data: Omit<iTask, 'id'>, accessToken: string) => {
    try {
      const response: AxiosResponse<iTask> = await api.post('/tasks', data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTasks((prevState) => [...prevState, response.data]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get(`/tasks?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    loadTasks();
  }, []);
   

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
