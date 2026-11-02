import { useState, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/lib/data";
import { contactFormSchema, type ContactFormData } from "@shared/contact";
import { submitContactForm } from "@/lib/contact";

interface StatusMessage {
  type: "success" | "error";
  text: string;
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const { toast } = useToast();
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const isSubmittingRef = useRef(false);

  const onSubmit = async (data: ContactFormData) => {
    // Prevent accidental duplicate submissions
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setStatusMessage(null);

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setStatusMessage({
          type: "success",
          text: result.message,
        });

        toast({
          title: "Message sent",
          description: result.message,
        });

        // Clear the form only after confirmed successful delivery
        reset();
      } else {
        // Preserve entered form values on failure (do not call reset)
        setStatusMessage({
          type: "error",
          text: result.message,
        });

        toast({
          title:
            result.statusCode === 429
              ? "Rate limit exceeded"
              : "Submission failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: personalInfo.email },
    { icon: MapPin, label: "Location", value: personalInfo.location },
    ...(personalInfo.phone
      ? [{ icon: Phone, label: "Phone", value: personalInfo.phone }]
      : []),
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="font-mono-label text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--color-accent-amber)" }}
            >
              /// 09 — Contact
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground">
            Let's work together
          </h2>

          <p className="text-lg sm:text-xl font-display font-medium text-muted-foreground max-w-3xl">
            Have a project in mind, or open to internships and collaborations? I'd
            love to hear from you.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Contact Details Column */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Feel free to reach out directly through any of these communication
              channels or send a message using the form.
            </p>

            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border border-border bg-card/40 rounded-lg group hover:border-border/80 hover:bg-card/70 transition-all"
                >
                  <div className="p-3 border border-border text-muted-foreground group-hover:text-primary transition-colors rounded-md bg-muted/30">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 border border-border p-8 md:p-12 bg-muted/20 rounded-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
              {/* Status Alert Banner */}
              {statusMessage && (
                <div
                  role="alert"
                  className={`p-4 rounded-lg border text-sm flex items-start gap-3 transition-all ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-destructive/10 border-destructive/30 text-destructive"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {statusMessage.type === "success"
                        ? "Message Delivered"
                        : "Unable to Send Message"}
                    </p>
                    <p className="text-xs opacity-90 mt-0.5">
                      {statusMessage.text}
                    </p>
                  </div>
                </div>
              )}

              {/* Honeypot field (hidden from legitimate users, catches spam bots) */}
              <input
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-name"
                  {...register("name")}
                  placeholder="Your name"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.name}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors text-sm disabled:opacity-50"
                />
                {errors.name && (
                  <p className="font-mono-label text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors text-sm disabled:opacity-50"
                />
                {errors.email && (
                  <p className="font-mono-label text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  Subject <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-subject"
                  {...register("subject")}
                  placeholder="Project inquiry, collaboration, opportunity..."
                  disabled={isSubmitting}
                  aria-invalid={!!errors.subject}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors text-sm disabled:opacity-50"
                />
                {errors.subject && (
                  <p className="font-mono-label text-xs text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  {...register("message")}
                  placeholder="What's on your mind?"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.message}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors min-h-[120px] resize-none text-sm leading-relaxed disabled:opacity-50"
                />
                {errors.message && (
                  <p className="font-mono-label text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 rounded-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    Sending message...{" "}
                    <Loader2 className="ml-3 w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message <Send className="ml-3 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
