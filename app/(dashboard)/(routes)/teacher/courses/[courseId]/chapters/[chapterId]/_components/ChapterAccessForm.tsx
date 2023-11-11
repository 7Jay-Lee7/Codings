"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Chapter } from "@prisma/client";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { Checkbox } from "@/components/ui/checkbox";




interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
} : ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="mt-6 border border-[#121212] bg-[#121212] rounded-md p-4">
      <div className="font-bold flex items-center justify-between text-slate-500 text-lg">
        Chapter Access
        <Button onClick={toggleEdit} variant="edit">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2 text-slate-200",
          !initialData.isFree && "text-slate-200 italic font-medium"
        )}>
          {initialData.isFree ? (
            <>This chapter is free for preview</>
          ) : (
            <>This chapter is not free</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription className="text-slate-200">
                      Check this box if you want to make this chapter free for preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="save"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

