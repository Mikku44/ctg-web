import ReviewForm from "~/components/ReviewForm";
import ReviewList from "~/components/ReviewList";


export default function Reviews() {
  return (
    <div className="space-y-8">
      <ReviewForm tourId="all" />
      <ReviewList tourId="all" />
    </div>
  );
}
