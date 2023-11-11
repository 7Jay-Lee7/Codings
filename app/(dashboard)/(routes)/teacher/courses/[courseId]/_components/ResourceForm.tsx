"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

interface ResourceFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const ResourceForm = ({
  initialData,
  courseId
}: ResourceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment Deleted");
      router.refresh();
    } catch {
        toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border border-[#121212] bg-[#121212] rounded-md p-4">
      <div className="font-bold flex items-center justify-between text-slate-500">
        Course Resources
        <Button onClick={toggleEdit} variant="edit">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-200 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-[#121212] border-[#121212] border text-slate-400 rounded-md font-bold"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                  <button
                    onClick={() => onDelete(attachment.id)}
                    className="ml-auto hover:opacity-75 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-slate-200 mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  )
}