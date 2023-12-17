import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Assay = {
  id: string;
  name: string;
  incubation_period_mode:
    | "Supernatant incubation"
    | "Detection antibody incubation"
    | "SA-HRP incubation"
    | "TMB incubation";
  preparatory_steps: Array<"Plate block step">;
  washing_volume_in_microliters: number;
  washing_frequency: number;
};

export async function listAssays({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("assays")
    .select("id, name")
    .eq("profile_id", userId);

  return data;
}

export async function createAssay({
  name,
  incubation_period_mode,
  washing_volume_in_microliters,
  washing_frequency,
  preparatory_steps,
  userId,
}: Omit<Assay, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("assays")
    .insert({
      name,
      incubation_period_mode,
      washing_volume_in_microliters,
      washing_frequency,
      preparatory_steps,
      profile_id: userId,
    })
    .single();

  if (!error) {
    return data;
  }

  throw new Error(error.message);
}

export async function deleteAssay({
  id,
  userId,
}: Pick<Assay, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("assays")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getAssay({
  id,
  userId,
}: Pick<Assay, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("assays")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    const { profile_id, id, created_at, ...response } = data;
    return response;
  }

  return null;
}
