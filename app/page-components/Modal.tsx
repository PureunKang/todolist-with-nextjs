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
import { CiCirclePlus } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import React, { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const Modal: React.FC = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-primary w-full">
          <CiCirclePlus />할 일 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">새로운 할 일 추가</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmitNewTodo} className="grid gap-4 py-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                value={newTaskValue || ""}
                onChange={(e) => setNewTaskValue(e.target.value)}
                id="name"
                placeholder=""
                className="col-span-3 w-full"
              />
              <Button type="submit">추가</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
