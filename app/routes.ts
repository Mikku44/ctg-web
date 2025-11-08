import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [

        index("routes/home.tsx"),
        route("/contact","routes/contact.tsx"),
        
        route("/about","routes/about.tsx"),
        route("/tours","routes/tours.tsx"),
        route("/tours/:tour_id","routes/tourDetail.tsx"),
        route("*", "components/NotFound.tsx"),
    ]),




] satisfies RouteConfig;
