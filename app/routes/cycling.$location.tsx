import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Header from "~/components/Header";

export const meta: MetaFunction = () => [{ title: "Work-in-progress" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.location, "noteId not found");

  return json({ location: params.location });
};

export default function WIP() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-blue-100">
      <Header />
      Fetch weather for {data.location}
      <div>...</div>
    </main>
  );
}
