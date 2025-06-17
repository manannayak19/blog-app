"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BLOG_CATEGORIES } from "@/lib/config";

const blogPostschema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  coverImage: z.string().min(1, "Image is required"),
});

function CreateBlogForm({ user }) {
  //console.log(user)
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogPostschema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      coverImage: "",
    },
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user?.userName}</p>
          </div>
        </div>
        <Button>Publish</Button>
      </header>
      <main>
        <form>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Title"
                className="text-4xl font-semibold border-none outline-none mb-4 p-0 focus-visible: ring-0"
              />
            )}
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-2">{errors.title.message}</p>
          )}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_CATEGORIES.map((categoryItem) => (
                    <SelectItem key={categoryItem.key} value={categoryItem.key}>
                      {categoryItem.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </form>
      </main>
    </div>
  );
}

export default CreateBlogForm;
