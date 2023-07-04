import { createContext, useCallback, useEffect, useState } from 'react';
import { iChildrenProps } from './types';
import { api } from '../services';
import { AxiosResponse } from 'axios';

export interface iTask {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
}
export interface iTaskContext {
  tasks: iTask[];
  createTask: (data: Omit<iTask, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, completed: boolean) => Promise<void>;
  searchtask: (taskTitle: string) => Promise<void>;
  notFound: boolean;
  taskNotFound: string;
  loading: boolean;
}

export const TasksContext = createContext({} as iTaskContext);

export const TasksProvider = ({ children }: iChildrenProps) => {
  const [tasks, setTasks] = useState([] as iTask[]);
  const [notFound, setNotFound] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState('');
  const [loading, setLoading] = useState(false);

  const createTask = useCallback(async (data: Omit<iTask, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response: AxiosResponse<iTask> = await api.post('/tasks', data);

      setTasks((prevState) => [...prevState, response.data]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateTask = useCallback(async (taskId: string, completed: boolean) => {
    try {
      console.log(taskId);
      await api.patch(`/tasks/${taskId}`, { completed: !completed });
      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter((task) => task.id !== taskId);
        const updatedTask = prevTasks.find((task) => task.id === taskId);
        if (updatedTask) {
          return [...filteredTasks, { ...updatedTask, completed: !completed }];
        }
        return filteredTasks;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchtask = useCallback(async (taskTitle: string) => {
    try {
      const response = await api.get(`/tasks?keywords=${taskTitle}`);
      if (!response.data.length) {
        setTaskNotFound(taskTitle);
        return setNotFound(true);
      }
      setNotFound(false);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tasks');

        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        updateTask,
        searchtask,
        notFound,
        taskNotFound,
        loading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
