import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITask } from "@/types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-50%">할 일</TableHead>
            <TableHead className="w-50%" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
