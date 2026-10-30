// Load environment file
try {
  process.loadEnvFile();
} catch {
  // .env is optional or already loaded via process.env
}

export const config = {
  get port(): number {
    return parseInt(process.env.PORT || "5000", 10);
  },
  get nodeEnv(): string {
    return process.env.NODE_ENV || "development";
  },
  get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  },
  get trustProxy(): string | undefined {
    return process.env.TRUST_PROXY;
  },
  get gmailUser(): string | undefined {
    return process.env.GMAIL_USER?.trim();
  },
  get gmailAppPassword(): string | undefined {
    return process.env.GMAIL_APP_PASSWORD?.trim()?.replace(/\s+/g, "");
  },
  get contactReceiverEmail(): string {
    return (
      process.env.CONTACT_RECEIVER_EMAIL?.trim() || "nivedanps1234@gmail.com"
    );
  },
  get githubToken(): string | undefined {
    return process.env.GITHUB_TOKEN?.trim();
  },
  githubUsername: "nivedanps",
};
