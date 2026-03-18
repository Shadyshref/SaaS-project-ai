import { experienceLevel } from "@/drizzle/schema";
import { z } from "zod";

// const optionalTrimmedString = (fieldName: string, maxLength: number) =>
//   z
//     .string()
//     .trim()
//     .max(maxLength, `${fieldName} must be ${maxLength} characters or fewer.`)
//     .refine(
//       value => value === "" || value.length >= 2,
//       `${fieldName} must be at least 2 characters.`
//     )
//     .transform(value => (value === "" ? undefined : value))

const experienceLevelSchema = z
  .string()
  .min(1, "Please choose your experience level.")
  .refine(
    (value): value is (typeof experienceLevel)[number] =>
      experienceLevel.includes(value as (typeof experienceLevel)[number]),
    "Please choose your experience level.",
  )
  .transform((value) => value as (typeof experienceLevel)[number]);

export const jobInfoFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  jobTitle: z.string().trim(),
  experienceLevel: experienceLevelSchema,
  description: z
    .string()
    .trim()
    .min(1, "Required.")
    .max(2000, "Description must be 2000 characters or fewer."),
});

export type JobInfoFormInput = z.input<typeof jobInfoFormSchema>;
export type JobInfoFormValues = z.output<typeof jobInfoFormSchema>;
