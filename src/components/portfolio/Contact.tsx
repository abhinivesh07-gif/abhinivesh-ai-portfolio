import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { profile, socials } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-cyan/60 focus:ring-2 focus:ring-cyan/20 aria-[invalid=true]:border-destructive/70";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  const inner = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-brand-soft text-cyan">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="block truncate font-medium text-foreground">{value}</span>
      </span>
      {href && (
        <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
      )}
    </>
  );
  const cls =
    "group glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300";
  return href ? (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(cls, "hover:-translate-y-0.5 hover:border-cyan/40")}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    const { error } = await supabase.from("contact_messages").insert(values);
    if (error) {
      toast.error("Your message couldn't be sent. Please try again in a moment.");
      return;
    }
    reset();
    setSent(true);
    toast.success("Message sent! I'll get back to you soon.");
  };

  return (
    <Section id="contact">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[420px] max-w-4xl rounded-full bg-gradient-brand opacity-10 blur-[120px]" />
      <SectionHeading
        index="09"
        eyebrow="Contact"
        title={
          <>
            Have an Idea? <span className="text-gradient">Let's Build Something Amazing.</span>
          </>
        }
        description="I'm always interested in learning, collaborating, and exploring innovative ideas. Feel free to connect with me!"
      />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.35fr]">
        <Reveal className="space-y-3">
          <ContactRow
            icon={Mail}
            label="Email"
            value={socials.email || "Email coming soon"}
            href={socials.email ? `mailto:${socials.email}` : ""}
          />
          <ContactRow
            icon={Linkedin}
            label="LinkedIn"
            value={socials.linkedin ? "Connect on LinkedIn" : "Profile coming soon"}
            href={socials.linkedin}
          />
          <ContactRow
            icon={Github}
            label="GitHub"
            value={socials.github ? "Follow my code" : "Profile coming soon"}
            href={socials.github}
          />
          <ContactRow icon={MapPin} label="Location" value={profile.location} href="" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass border-gradient relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse-glow rounded-full bg-success/40 blur-2xl" />
                    <CheckCircle2 className="relative size-16 text-success" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-foreground">Message sent successfully!</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Thanks for reaching out. I'll read your message and get back to you soon.
                  </p>
                  <Button variant="glass" size="pill" className="mt-8" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                  aria-label="Contact form"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Name" error={errors.name?.message}>
                      <input
                        id="name"
                        autoComplete="name"
                        placeholder="Your name"
                        className={fieldClass}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register("name")}
                      />
                    </Field>
                    <Field id="email" label="Email" error={errors.email?.message}>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={fieldClass}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                      />
                    </Field>
                  </div>
                  <Field id="subject" label="Subject" error={errors.subject?.message}>
                    <input
                      id="subject"
                      placeholder="What's this about?"
                      className={fieldClass}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      {...register("subject")}
                    />
                  </Field>
                  <Field id="message" label="Message" error={errors.message?.message}>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell me about your idea, project or opportunity..."
                      className={cn(fieldClass, "resize-none")}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      {...register("message")}
                    />
                  </Field>
                  <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
