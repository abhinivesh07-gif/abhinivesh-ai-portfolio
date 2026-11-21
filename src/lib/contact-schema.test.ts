import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = {
  name: "Priya",
  email: "priya@example.com",
  subject: "Hackathon team",
  message: "Would love to team up for the next hackathon!",
};

describe("contact form rules", () => {
  it("accepts a complete, valid message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a name", () => {
    expect(contactSchema.safeParse({ ...valid, name: "   " }).success).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("requires a subject", () => {
    expect(contactSchema.safeParse({ ...valid, subject: "" }).success).toBe(false);
  });

  it("requires a message of at least 10 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "Hi there" }).success).toBe(false);
  });

  it("rejects messages over 2000 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(2001) }).success).toBe(false);
  });
});
