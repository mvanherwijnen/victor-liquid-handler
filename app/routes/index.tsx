import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative sm:overflow-hidden sm:rounded-2xl">
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block text-blue-500 drop-shadow-md">
                  Victor x <span className="text-red-400">ELISA</span>
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/assays"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    Go to app for {user.email}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-md bg-blue-800 px-4 py-3 font-medium text-white hover:bg-blue-600  "
                  >
                    Log In
                  </Link>
                )}
              </div>
              <h1 className="text-center text-6xl mt-8 font-bold tracking-tight sm:text-8xl lg:text-3xl">
                <span className="block text-blue-500 drop-shadow-md">
                  powered by KNR Biotech
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
