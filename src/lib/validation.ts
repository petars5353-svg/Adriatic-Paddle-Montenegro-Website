import { z } from "zod";

export const bookingSchema = z.object({
  type: z.enum(["budva-caves", "kotor-cliff", "rental"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date"),
  timeSlot: z.string().min(1, "Please choose a time"),
  adults: z.coerce.number().int().min(1, "At least one adult").max(20),
  children: z.coerce.number().int().min(0).max(20),
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Please enter a phone number").max(40),
  notes: z.string().max(1000).optional().or(z.literal("")),
  waiverAccepted: z.coerce.boolean().refine((v) => v === true, "You must accept the liability waiver"),
  // Honeypot — real users leave this empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
