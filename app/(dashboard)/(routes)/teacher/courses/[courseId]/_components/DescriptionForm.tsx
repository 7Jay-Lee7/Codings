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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { Course } from "@prisma/client";




interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required!",
  }),
});

export const DescriptionForm = ({
  initialData,
  courseId
} : DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="mt-6 border border-[#121212] bg-[#121212] rounded-md p-4">
      <div className="font-bold flex items-center justify-between text-slate-500">
        Course Description
        <Button onClick={toggleEdit} variant="edit">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2 text-slate-200",
          !initialData.description && "text-slate-200 italic font-medium"
        )}>
          {initialData.description || "No Description"}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about...'"
                      {...field}
                      className="text-slate-200 border-[#121212] focus:border-slate-400 border-4 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
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

