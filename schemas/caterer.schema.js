import * as z from "zod";

/**
 * Schema for caterer location data
 */
export const locationSchema = z.object({
  type: z.string().default("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

/**
 * Schema for business hours data
 */
export const businessHourSchema = z.object({
  day_of_week: z.string(),
  open_time: z.string(),
  close_time: z.string(),
  is_closed: z.boolean().default(false),
});

/**
 * Main caterer form schema
 */
export const catererFormSchema = z.object({
  user: z.string().min(1, "User is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  cuisines: z.array(z.string()).optional(),
  location: locationSchema,
  business_hours: z.array(businessHourSchema),
  phone_number: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  pickup_instructions: z.string().optional(),
  average_preparation_time: z.number().min(0).default(30),
  tags: z.array(z.string()).optional(),
  is_featured: z.boolean().default(false),
  status: z
    .enum(["active", "inactive", "pending", "suspended"])
    .default("pending"),
  accepts_orders: z.boolean().default(true),
});

