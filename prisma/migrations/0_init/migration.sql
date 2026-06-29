-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('EN', 'UR', 'AR', 'HI');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "CefrLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "FrenchSkill" AS ENUM ('COMPREHENSION_ORALE', 'COMPREHENSION_ECRITE', 'EXPRESSION_ECRITE', 'EXPRESSION_ORALE');

-- CreateEnum
CREATE TYPE "ExamFamily" AS ENUM ('TEF', 'TCF', 'DELF_DALF');

-- CreateEnum
CREATE TYPE "FrenchTaskType" AS ENUM ('MCQ', 'MATCHING', 'VRAI_FAUX', 'SHORT_ANSWER', 'WRITING_TASK', 'SPEAKING_TASK');

-- CreateEnum
CREATE TYPE "FrenchAttemptStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'SCORED');

-- CreateEnum
CREATE TYPE "FrenchDifficulty" AS ENUM ('FOUNDATION', 'CORE', 'STRETCH');

-- CreateEnum
CREATE TYPE "FrenchSessionMode" AS ENUM ('PRACTICE_SET', 'MOCK');

-- CreateEnum
CREATE TYPE "FrenchSessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'EN',
    "countryCode" TEXT,
    "referralCode" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "emailVerificationTokenHash" TEXT,
    "emailVerificationExpiresAt" TIMESTAMP(3),
    "emailVerificationLastSentAt" TIMESTAMP(3),
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "subscriptionStatus" TEXT,
    "subscriptionPlan" TEXT,
    "subscriptionCurrentPeriodEnd" TIMESTAMP(3),
    "subscriptionCancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "trialEndsAt" TIMESTAMP(3),
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'FREE',
    "compProUntil" TIMESTAMP(3),
    "compGrantedAt" TIMESTAMP(3),
    "compGrantedBy" TEXT,
    "compReason" TEXT,
    "targetLevel" "CefrLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessedWebhook" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarlyAccess" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EarlyAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AICostLedger" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "feature" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL,
    "outputTokens" INTEGER NOT NULL,
    "cacheReadTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheWriteTokens" INTEGER NOT NULL DEFAULT 0,
    "costCents" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "errorMessage" TEXT,

    CONSTRAINT "AICostLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrenchItem" (
    "id" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "skill" "FrenchSkill" NOT NULL,
    "taskType" "FrenchTaskType" NOT NULL,
    "examFamily" "ExamFamily",
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "difficulty" "FrenchDifficulty" NOT NULL DEFAULT 'CORE',
    "guidanceNote" TEXT,
    "timeLimitSeconds" INTEGER NOT NULL DEFAULT 0,
    "topicTag" TEXT NOT NULL DEFAULT 'general',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FrenchItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrenchAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "skill" "FrenchSkill" NOT NULL,
    "taskType" "FrenchTaskType" NOT NULL,
    "examId" TEXT NOT NULL,
    "status" "FrenchAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "response" JSONB NOT NULL DEFAULT '{}',
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "pointsMax" INTEGER NOT NULL DEFAULT 0,
    "scoreEstimate" JSONB,
    "feedback" JSONB,
    "aiModel" TEXT,
    "costCents" INTEGER,
    "latencyMs" INTEGER,
    "sessionId" TEXT,
    "sessionStep" INTEGER,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FrenchAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrenchSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mode" "FrenchSessionMode" NOT NULL,
    "examId" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "skill" "FrenchSkill",
    "targetCount" INTEGER NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "currentDifficulty" "FrenchDifficulty" NOT NULL DEFAULT 'CORE',
    "plan" JSONB,
    "status" "FrenchSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FrenchSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationTokenHash_key" ON "User"("emailVerificationTokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeSubscriptionId_key" ON "User"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_referralCode_idx" ON "User"("referralCode");

-- CreateIndex
CREATE INDEX "User_stripeCustomerId_idx" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "User_stripeSubscriptionId_idx" ON "User"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "User_compProUntil_idx" ON "User"("compProUntil");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE INDEX "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");

-- CreateIndex
CREATE INDEX "ProcessedWebhook_processedAt_idx" ON "ProcessedWebhook"("processedAt");

-- CreateIndex
CREATE UNIQUE INDEX "EarlyAccess_email_key" ON "EarlyAccess"("email");

-- CreateIndex
CREATE INDEX "EarlyAccess_email_idx" ON "EarlyAccess"("email");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_approved_createdAt_idx" ON "Review"("approved", "createdAt");

-- CreateIndex
CREATE INDEX "AICostLedger_timestamp_idx" ON "AICostLedger"("timestamp" DESC);

-- CreateIndex
CREATE INDEX "AICostLedger_userId_timestamp_idx" ON "AICostLedger"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "AICostLedger_feature_timestamp_idx" ON "AICostLedger"("feature", "timestamp");

-- CreateIndex
CREATE INDEX "FrenchItem_level_skill_active_difficulty_idx" ON "FrenchItem"("level", "skill", "active", "difficulty");

-- CreateIndex
CREATE INDEX "FrenchItem_level_skill_examFamily_active_idx" ON "FrenchItem"("level", "skill", "examFamily", "active");

-- CreateIndex
CREATE INDEX "FrenchItem_level_taskType_active_idx" ON "FrenchItem"("level", "taskType", "active");

-- CreateIndex
CREATE INDEX "FrenchAttempt_userId_status_submittedAt_idx" ON "FrenchAttempt"("userId", "status", "submittedAt");

-- CreateIndex
CREATE INDEX "FrenchAttempt_userId_startedAt_idx" ON "FrenchAttempt"("userId", "startedAt");

-- CreateIndex
CREATE INDEX "FrenchAttempt_itemId_idx" ON "FrenchAttempt"("itemId");

-- CreateIndex
CREATE INDEX "FrenchAttempt_sessionId_sessionStep_idx" ON "FrenchAttempt"("sessionId", "sessionStep");

-- CreateIndex
CREATE INDEX "FrenchSession_userId_status_startedAt_idx" ON "FrenchSession"("userId", "status", "startedAt");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FrenchAttempt" ADD CONSTRAINT "FrenchAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FrenchAttempt" ADD CONSTRAINT "FrenchAttempt_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "FrenchItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FrenchAttempt" ADD CONSTRAINT "FrenchAttempt_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "FrenchSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FrenchSession" ADD CONSTRAINT "FrenchSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

