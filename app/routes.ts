import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [

        index("routes/home.tsx"),
        route("/tours/:tour_id","routes/tourDetail.tsx"),
        route("*", "components/NotFound.tsx"),
    ]),




] satisfies RouteConfig;
