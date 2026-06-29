-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('EN', 'UR', 'AR', 'HI');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "GoetheLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "GoetheModule" AS ENUM ('LESEN', 'HOEREN', 'SCHREIBEN', 'SPRECHEN');

-- CreateEnum
CREATE TYPE "GoetheTaskType" AS ENUM ('LESEN_GLOBAL', 'LESEN_DETAIL', 'LESEN_MATCHING', 'LESEN_TRUE_FALSE', 'HOEREN_GLOBAL', 'HOEREN_DETAIL', 'HOEREN_MATCHING', 'HOEREN_TRUE_FALSE', 'SCHREIBEN_MESSAGE', 'SCHREIBEN_LETTER', 'SCHREIBEN_ESSAY', 'SPRECHEN_INTRODUCE', 'SPRECHEN_ASK_ANSWER', 'SPRECHEN_PRESENT', 'SPRECHEN_DISCUSS');

-- CreateEnum
CREATE TYPE "GoetheAttemptStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'SCORED');

-- CreateEnum
CREATE TYPE "GoetheDifficulty" AS ENUM ('FOUNDATION', 'CORE', 'STRETCH');

-- CreateEnum
CREATE TYPE "GoetheSessionMode" AS ENUM ('PRACTICE_SET', 'MOCK');

-- CreateEnum
CREATE TYPE "GoetheSessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

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
    "targetLevel" "GoetheLevel",
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
CREATE TABLE "GoetheItem" (
    "id" TEXT NOT NULL,
    "level" "GoetheLevel" NOT NULL,
    "module" "GoetheModule" NOT NULL,
    "taskType" "GoetheTaskType" NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "difficulty" "GoetheDifficulty" NOT NULL DEFAULT 'CORE',
    "guidanceNote" TEXT,
    "timeLimitSeconds" INTEGER NOT NULL DEFAULT 0,
    "topicTag" TEXT NOT NULL DEFAULT 'general',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoetheItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoetheAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "level" "GoetheLevel" NOT NULL,
    "module" "GoetheModule" NOT NULL,
    "taskType" "GoetheTaskType" NOT NULL,
    "status" "GoetheAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
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

    CONSTRAINT "GoetheAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoetheSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mode" "GoetheSessionMode" NOT NULL,
    "level" "GoetheLevel" NOT NULL,
    "module" "GoetheModule",
    "targetCount" INTEGER NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "currentDifficulty" "GoetheDifficulty" NOT NULL DEFAULT 'CORE',
    "plan" JSONB,
    "status" "GoetheSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoetheSession_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "GoetheItem_level_module_active_difficulty_idx" ON "GoetheItem"("level", "module", "active", "difficulty");

-- CreateIndex
CREATE INDEX "GoetheItem_level_taskType_active_idx" ON "GoetheItem"("level", "taskType", "active");

-- CreateIndex
CREATE INDEX "GoetheAttempt_userId_status_submittedAt_idx" ON "GoetheAttempt"("userId", "status", "submittedAt");

-- CreateIndex
CREATE INDEX "GoetheAttempt_userId_startedAt_idx" ON "GoetheAttempt"("userId", "startedAt");

-- CreateIndex
CREATE INDEX "GoetheAttempt_itemId_idx" ON "GoetheAttempt"("itemId");

-- CreateIndex
CREATE INDEX "GoetheAttempt_sessionId_sessionStep_idx" ON "GoetheAttempt"("sessionId", "sessionStep");

-- CreateIndex
CREATE INDEX "GoetheSession_userId_status_startedAt_idx" ON "GoetheSession"("userId", "status", "startedAt");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoetheAttempt" ADD CONSTRAINT "GoetheAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoetheAttempt" ADD CONSTRAINT "GoetheAttempt_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "GoetheItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoetheAttempt" ADD CONSTRAINT "GoetheAttempt_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GoetheSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoetheSession" ADD CONSTRAINT "GoetheSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

