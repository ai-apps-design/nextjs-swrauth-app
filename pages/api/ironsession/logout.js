import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "/libs/ironsession/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
  req.session.destroy();
  res.json({ isLoggedIn: false, login: "", avatarUrl: "" });
}
