import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Assay } from "~/models/assay.server";
import { listAssays } from "~/models/assay.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

type LoaderData = {
  assayItems: Assay[];
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const assayItems = await listAssays({ userId });
  return json({ assayItems });
}

export default function AssaysPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Assay
          </Link>

          <hr />

          {data.assayItems.length === 0 ? (
            <p className="p-4">No assays yet</p>
          ) : (
            <ol>
              {data.assayItems.map((assay) => (
                <li key={assay.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={`/assays/${assay.id}`}
                  >
                    🧪 {assay.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Header() {
  const user = useUser();
  return (
    <header className="flex justify-end items-center bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold mr-auto">
        <Link to=".">🤖 Victor <span className="hidden md:inline-block"> x Elisa</span></Link>
      </h1>
      <p className="mr-6 hidden md:inline-block">{user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </header>
  );
}
