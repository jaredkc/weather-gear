import { type ActionFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { commitSession, getSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const sport = formData.get("sport") as string;
  const clientDate = formData.get("clientDate") as string;
  // console.log({ sport, clientDate });

  invariant(sport, "Sport not found");
  invariant(clientDate, "Date not found");

  const session = await getSession(request);
  session.set("sport", sport);
  session.set("clientDate", clientDate);

  return json(
    { sport, clientDate },
    {
      headers: {
        "Set-Cookie": await commitSession(session, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
        }),
      },
    },
  );
};
