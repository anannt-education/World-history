import { notFound } from "next/navigation";
import { getForm } from "@/content/forms";
import { ExamWorkspace } from "@/components/exam/exam-workspace";
export const metadata = { robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ formId: string }> }) {
  const form = getForm((await params).formId);
  if (!form) notFound();
  return <ExamWorkspace form={form} resultsOnly />;
}
