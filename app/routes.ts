import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [

        index("routes/home.tsx"),
        route("/contact", "routes/contact.tsx"),

        //policies
        route("/terms-of-use", "routes/terms-of-use.tsx"),
        route("/privacy-policy", "routes/privacy-policy.tsx"),
        route("/about", "routes/about.tsx"),
        route("/tours", "routes/tours.tsx"),
        route("/guide-service", "routes/guideService.tsx"),
        route("/search", "routes/search.tsx"),
        route("/reviews", "routes/reviews.tsx"),
        route("/checkout", "routes/CheckoutPage.tsx"),
        route("/blogs", "routes/blogs.tsx"),
        route("/blogs/:slug", "routes/slug/blog.tsx"),
        route("/checkout-session", "routes/checkout-session.tsx"),
        route("/tours/:tour_slug", "routes/tourDetail.tsx"),
        route("/tours/:type_slug/:place", "routes/tourCategory.tsx"),
        route("/license/dbd", "routes/dbd.tsx"),



        route("*", "components/NotFound.tsx"),

        // API
        route("/api/payment-intent", "api/paymentIntent.tsx"),
        route("/api/payment-status", "api/paymentStatus.tsx"),
        route("/api/create-invoice", "api/invoiceItem.tsx"),
    ]),
    // admin
    route("/admin/login", "routes/admin/login.tsx"),
    layout("routes/admin/layout.tsx", [
        route("/admin", "routes/admin/admin.tsx"),
        route("/admin/bookings", "routes/admin/bookings.tsx"),
        route("/admin/blog/add", "routes/admin/blog.add.tsx"),
        route("/admin/blog/list", "routes/admin/blog.list.tsx"),
        route("/admin/blog/update/:blogId", "routes/admin/blog.update.tsx"),
        route("/admin/tour/list", "routes/admin/tour.list.tsx"),
        route("/admin/tour/add", "routes/admin/tour.add.tsx"),
        route("/admin/tour/update/:tourId", "routes/admin/tour.update.tsx"),
    ]),





] satisfies RouteConfig;
