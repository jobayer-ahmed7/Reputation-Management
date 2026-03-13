import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteService } from "@/services/service";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteServiceProps = {
  _id: string;
  title: string;
  onDeleteSuccess: (id: string) => void;
};

const DeleteService = ({ _id, title, onDeleteSuccess }: DeleteServiceProps) => {
  const handleDeleteService = async (id: string) => {
    try {
      const res = await deleteService(id);
      console.log(res);
      if (res.success) {
        toast.success("Service deleted successfully");
        onDeleteSuccess(id);
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the service");
      console.error("Failed to delete service:", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="text-red-300 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you want to delete this service?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`Service name: ${title}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={() => handleDeleteService(_id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteService;
