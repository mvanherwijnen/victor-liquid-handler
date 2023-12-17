import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { Assay} from "~/models/assay.server";
import { createAssay } from "~/models/assay.server";
import { requireUserId } from "~/session.server";

export const INCUBATION_PERIOD_MODES = [
  "Supernatant incubation",
  "Detection antibody incubation",
  "SA-HRP incubation",
  "TMB incubation",
];

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const incubation_period_mode = formData.get("incubation_period_mode");
  const preparatory_steps = formData.get('preparatory_steps');
  const washing_volume_in_microliters = formData.get("washing_volume_in_microliters");
  const washing_frequency = formData.get("washing_frequency")

  const assay = await createAssay({ name: `${incubation_period_mode}+wash=${washing_frequency}x${washing_volume_in_microliters}μL`, incubation_period_mode, preparatory_steps: [preparatory_steps], washing_volume_in_microliters, washing_frequency, userId } as unknown as Omit<Assay, 'id'> & { userId: string});
  return redirect(`/assays/${assay.id}`);
};

export default function NewAssayPage() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span className="font-bold">Incubation: </span>
          {
            INCUBATION_PERIOD_MODES.map((mode) => {
              return <label key={mode}>{mode}<input
              name="incubation_period_mode"
              type="radio"
              value={mode}
              className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            ></input></label>
            })
          }
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span className="font-bold">Washing frequency: </span>
          <input
            name="washing_frequency"
            type="number"
            min="1"
            max="6"
            defaultValue="1"
            className="flex-1 rounded-md border-2 border-blue-200 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span className="font-bold">Washing volume in microliter: </span>
          <input
            name="washing_volume_in_microliters"
            type="number"
            min="150"
            max="300"
            defaultValue="300"
            className="flex-1 rounded-md border-2 border-blue-200 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span className="font-bold">Preparatory steps: </span>
          <label>Plate block step
          <input
            name="preparatory_steps"
            type="checkbox"
            value="Plate block step"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
          </label>
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
