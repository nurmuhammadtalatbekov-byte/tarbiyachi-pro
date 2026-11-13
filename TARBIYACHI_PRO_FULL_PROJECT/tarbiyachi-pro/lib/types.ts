export type OrganizationType = "state_mtt" | "family_non_state_mtt" | "other_non_state_mtt" | "other";
export type EducatorRole = "educator" | "senior_educator" | "methodologist" | "mtt_leader" | "other";
export type QuestionOption = { id: string; text: string };
export type PublicQuestion = {
  id: string; prompt: string; explanation: string | null;
  topic_id: string | null; difficulty: "easy" | "medium" | "hard";
  options: QuestionOption[];
};
