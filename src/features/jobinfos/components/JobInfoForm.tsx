"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  experienceLevel,
  JobInfoTable,
  type ExperienceLevel,
} from "@/drizzle/schema";
import {
  jobInfoFormSchema,
  type JobInfoFormInput,
  type JobInfoFormValues,
} from "@/features/jobinfos/schema";
import { LoadingSwap } from "@/components/ui/loading-swap";
import z from "zod";
import { CreateJobInfo, updateJobInfo } from "../actions";
import { toast } from "sonner";

const defaultValues: JobInfoFormInput = {
  name: "",
  jobTitle: "",
  experienceLevel: "junior",
  description: "",
};

function getExperienceLevelLabel(level: ExperienceLevel) {
  switch (level) {
    case "junior":
      return "Junior";
    case "mid-level":
      return "Mid-level";
    case "senior":
      return "Senior";
    default:
      throw new Error(`Unknown experience level: ${level satisfies never}`);
  }
}

type JobInfoFormData=z.infer<typeof jobInfoFormSchema>

export function JobInfoForm({
  jobInfo,
}: {
  jobInfo?: Pick<
    typeof JobInfoTable.$inferSelect,
    "id" | "name" | "title" | "experienceLevel" | "description"
  >;
}) {
  const form = useForm<JobInfoFormInput, undefined, JobInfoFormValues>({
    defaultValues: jobInfo
      ? {
          name: jobInfo.name,
          jobTitle: jobInfo.title ?? "",
          experienceLevel: jobInfo.experienceLevel,
          description: jobInfo.description,
        }
      : defaultValues,
    resolver: zodResolver(jobInfoFormSchema),
  });

   async function onSubmit(values: JobInfoFormData) {
    const action =jobInfo ? updateJobInfo.bind(null,jobInfo.id) : CreateJobInfo;
    const res =await action(values);
    if(res.error){
      toast.error(res.message)
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter job name" {...field} />
              </FormControl>
              <FormDescription>
                {" "}
                This name is displayed in the UI for easy indetification
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormDescription>
                  Optional. Only enter if there is a specific job title you are
                  applying for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceLevel.map((level) => (
                      <SelectItem key={level} value={level}>
                        {getExperienceLevelLabel(level)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A Next.js 15 and React 19 full stack web
developer job that uses Drizzle ORM and Postgres for
database management"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be as specific as possible; the more information you provide,
                the better the interviews will be.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          <LoadingSwap isLoading={form.formState.isSubmitting}>
            Save Job information
          </LoadingSwap>
        </Button>

        {/* {validatedValues != null ? (
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm text-foreground">
              Schema validation passed. The form is ready to connect to an
              action later.
            </p>
          </div>
        ) : null} */}
      </form>
    </Form>
  );
}
