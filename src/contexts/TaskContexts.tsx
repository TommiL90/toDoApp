import { createContext, useCallback, useEffect, useState } from 'react';
import { iChildrenProps } from './types';
import { api } from '../services';
import { AxiosResponse } from 'axios';

export interface iTask {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}
export interface iTaskContext {
  tasks: iTask[];
  createTask: (data: Omit<iTask, 'id'>) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
  updateTask: (taskId: string, userId: string, accessToken: string) => Promise<void>;
  searchtask: (taskTitle: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  taskNotFound: string;
  loading: boolean;
}

export const TasksContext = createContext({} as iTaskContext);

export const TasksProvider = ({ children }: iChildrenProps) => {
  const userId: string | null = localStorage.getItem('@to-do:Id');
  const token: string | null = localStorage.getItem('@to-do:Token');
  const [tasks, setTasks] = useState([] as iTask[]);
  const [notFound, setNotFound] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState('');
  const [loading, setLoading] = useState(false);

  const createTask = useCallback(async (data: Omit<iTask, 'id'>) => {
    setLoading(true);
    try {
      const response: AxiosResponse<iTask> = await api.post('/tasks', data);
      setTasks((prevState) => [...prevState, response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string, accessToken: string) => {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateTask = useCallback(async (taskId: string, userId: string, accessToken: string) => {
    try {
      await api.patch(
        `/tasks/${taskId}`,
        { completed: true, userId: userId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter((task) => task.id !== taskId);
        const updatedTask = prevTasks.find((task) => task.id === taskId);
        if (updatedTask) {
          return [...filteredTasks, { ...updatedTask, completed: true }];
        }
        return filteredTasks;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchtask = useCallback(async (taskTitle: string, accessToken: string) => {
    try {
      const response = await api.get(`/tasks?userId=${userId}&title_like=${taskTitle}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
        const response = await api.get(`/tasks?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
