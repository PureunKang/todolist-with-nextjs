"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TableCell, TableRow } from "@/components/ui/table";
import { ITask } from "@/types/tasks";
import { BiSolidEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import React, { useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="w-full">{task.text}</TableCell>
      <TableCell className="flex gap-5">
        <Dialog open={openModalEdit} onOpenChange={setOpenModalEdit}>
          <DialogTrigger asChild>
            <BiSolidEdit cursor="pointer" size={20} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">할 일 변경</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <form onSubmit={handleSubmitEditTodo} className="grid gap-4 py-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    value={taskToEdit || ""}
                    onChange={(e) => setTaskToEdit(e.target.value)}
                    id="name"
                    placeholder=""
                    className="col-span-3 w-full"
                  />
                  <Button type="submit">완료</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={openModalDeleted} onOpenChange={setOpenModalDeleted}>
          <DialogTrigger asChild>
            <BiTrash cursor="pointer" size={20} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle />
              <DialogDescription className="text-center">
                정말로 삭제하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => handleDeleteTask(task.id)}>삭제</Button>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default Task;
