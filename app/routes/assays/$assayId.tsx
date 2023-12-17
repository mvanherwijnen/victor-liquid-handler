import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Assay } from "~/models/assay.server";
import { deleteAssay, getAssay } from "~/models/assay.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  assay: Assay;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.assayId, "assayId not found");

  const assay = await getAssay({ userId, id: params.assayId });
  if (!assay) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ assay });
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.assayId, "assayId not found");

  await deleteAssay({ userId, id: params.assayId });

  return redirect("/assays");
};

export default function AssayDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.assay.name}</h3>
      <div className="flex flex-row mt-6">
        <div className="flex flex-col mr-8">
        {(Object.keys(data.assay)).map((key) => {
          return <div key={key} className="font-bold">{key}</div>
        })}
        </div>
        <div className="flex flex-col">
        {(Object.keys(data.assay)).map((key) => {
          return <div key={key}>{data.assay[key as keyof typeof data.assay]}</div>
        })}
        </div>
      </div>
      <hr className="my-4" />
      <Form method="post">
      <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 mr-4"
        >
          Start run
        </button>
        <button
          type="submit"
          className="rounded bg-red-500  py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
