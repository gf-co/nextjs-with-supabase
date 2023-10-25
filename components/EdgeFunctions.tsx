"use client";

import { useNotification } from "@/contexts/NotificationProvider";
import { useUser } from "@/contexts/UserProvider";
import { Database } from "@/lib/database.types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import EdgeFunctionsSkeleton from "./EdgeFunctionsSkeleton";

type Task = Database["public"]["Tables"]["tasks"]["Row"];

export default function EdgeFunctions() {
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState("");
  const [isDeleting, setIsDeleting] = useState("");
  const supabase = createClientComponentClient<Database>();
  const { user, isLoading } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { showNotification } = useNotification();
  const addTaskFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const getData = async () => {
      if (isLoading) {
        return;
      }

      if (!user) {
        setTasks([]);
        setIsFetching(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke(
          "edge-functions",
          {
            method: "GET",
          },
        );

        if (error) throw error;

        return setTasks(data);
      } catch {
        showNotification("Get tasks from database failed");
      } finally {
        setIsFetching(false);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      showNotification("User not signed in");
      return;
    }

    setIsCreating(true);

    const formData = new FormData(event.currentTarget);
    const taskName = formData.get("taskName") as string;

    try {
      const { data } = await supabase.functions.invoke("edge-functions", {
        method: "POST",
        body: { name: taskName, user_id: user.id },
      });

      setTasks((prevTasks) => [...prevTasks, data]);

      showNotification("Task added");

      // Reset the form
      if (addTaskFormRef.current) {
        addTaskFormRef.current.reset();
      }
    } catch (error) {
      showNotification("Add task to database failed");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      showNotification("User not signed in");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const taskId = formData.get("taskId") as string;
    const taskName = formData.get("taskName") as string;

    setIsUpdating(taskId);

    try {
      await supabase.functions.invoke("edge-functions", {
        method: "PUT",
        body: { id: taskId, name: taskName, user_id: user.id },
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              name: taskName,
            };
          }

          return task;
        }),
      );
      showNotification("Task updated");
    } catch (error) {
      showNotification("Update task in database failed");
    } finally {
      setIsUpdating("");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) {
      showNotification("User not signed in");
      return;
    }

    setIsDeleting(taskId);

    try {
      await supabase.functions.invoke("edge-functions", {
        method: "DELETE",
        body: { id: taskId },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      showNotification("Task deleted");
    } catch (error) {
      showNotification("Delete task from database failed");
    } finally {
      setIsDeleting("");
    }
  };

  if (isFetching) return <EdgeFunctionsSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Uses Supabase Edge Functions to interact with our Postgres database
      </small>
      {!tasks.length && (
        <p className="text-sm opacity-50">No tasks in the database yet</p>
      )}
      {tasks.map((task) => (
        <form
          key={task.id}
          onSubmit={handleUpdateTask}
          className="flex flex-nowrap gap-1"
        >
          <input type="hidden" name="taskId" value={task.id} />
          <Input
            name="taskName"
            type="text"
            size="md"
            defaultValue={task.name}
            required={true}
            isRequired={true}
          />
          <Button isLoading={isUpdating === task.id} type="submit">
            Update
          </Button>
          <Button
            isLoading={isDeleting === task.id}
            type="button"
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </Button>
        </form>
      ))}
      <Divider />
      <form
        ref={addTaskFormRef}
        onSubmit={handleAddTask}
        className="flex flex-nowrap items-center gap-4"
      >
        <Input
          name="taskName"
          type="text"
          placeholder="Add a task"
          size="md"
          required={true}
          isRequired={true}
          readOnly={isCreating}
          isReadOnly={isCreating}
          disabled={isCreating}
          isDisabled={isCreating}
        />
        <Button
          isLoading={isCreating}
          disabled={isCreating}
          isDisabled={isCreating}
          type="submit"
          className="ml-auto"
        >
          Add
        </Button>
      </form>
    </div>
  );
}
