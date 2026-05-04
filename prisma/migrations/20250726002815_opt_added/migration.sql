-- CreateTable
CREATE TABLE "OtpCode" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "otpCode" VARCHAR(6) NOT NULL,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_otp_email_expiry" ON "OtpCode"("email", "expiresAt");
