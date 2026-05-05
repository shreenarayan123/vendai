"use server";

interface StoreOTPParams {
  email: string;
  otp: string;
  expiryMinutes?: number;
}

interface OTPResult {
  success: boolean;
  otp?: string;
  message: string;
}

export async function prepareEmailAddressVerification(email: string): Promise<OTPResult> {
  try {
    const { client } = await import("@/lib/prisma");
    const nodemailer = (await import("nodemailer")).default;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email format",
      };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Email config and transporter created inside function (server-only)
    const emailConfig = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(emailConfig as any);

    // Email content
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: "Email Verification - OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p style="color: #666; text-align: center; margin: 20px 0;">
            Enter this 6-digit code to verify your email address.
          </p>
          <p style="color: #999; font-size: 14px; text-align: center;">
            This code will expire in 10 minutes. If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
      text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions as any);
    await storeOTP({ email, otp, expiryMinutes: 10, client });

    return {
      success: true,
      otp: otp,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return {
      success: false,
      message: "Failed to send OTP email",
    };
  }
}

async function storeOTP({ email, otp, expiryMinutes = 10, client }: StoreOTPParams & { client?: any }) {
  const { client: _client } = client ? { client } : await import("@/lib/prisma");
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  // Delete any existing OTPs for this email first
  await _client.otpCode.deleteMany({ where: { email } });

  // Store new OTP
  return await _client.otpCode.create({
    data: {
      email,
      otpCode: otp,
      expiresAt,
    },
  });
}

export async function verifyOTP(email: string, inputOTP: string): Promise<boolean> {
  try {
    const { client } = await import("@/lib/prisma");
    const record = await client.otpCode.findFirst({
      where: {
        email,
        otpCode: inputOTP,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });
    if (record) {
      await client.otpCode.update({
        where: { id: record.id },
        data: { used: true },
      });
      return true;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }

  return false;
}

export async function cleanupExpiredOTPs() {
  const { client } = await import("@/lib/prisma");
  await client.otpCode.deleteMany({ where: { expiresAt: { lt: new Date() } } });
}