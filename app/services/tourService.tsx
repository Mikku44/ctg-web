import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { TourCardProps } from "~/components/featureCard";
import { db } from "~/lib/firebase/config";
import type { Package, Tour, TourImage } from "~/models/tour";


const TOURS = "Tours";
const TOUR_IMAGES = "TourImages";
const PACKAGES = "Packages";

export const tourService = {
  /** 🧭 Get all published tours with related images + packages */
  async getAll(): Promise<Tour[]> {
    const q = query(collection(db, TOURS), where("status", "==", "published"));
    const snapshot = await getDocs(q);

    const tours: Tour[] = [];
    for (const docSnap of snapshot.docs) {
      const tour = { id: docSnap.id, ...docSnap.data() } as Tour;
      tour.images = await this.getImages(tour.id);
      tour.packages = await this.getPackages(tour.id);
      tours.push(tour);
    }
    return tours;
  },

  async getAllForCard(): Promise<TourCardProps[]> {
    const tours = await this.getAll();

    return tours.map((tour) => {
      const firstPackage = tour.packages?.[0];
      return {
        id : tour.id,
        slug : tour.slug,
        image: tour.featured_image || tour.images?.[0]?.image_url || "",
        title: tour.title,
        description: tour.description,
        price: firstPackage ? firstPackage.price.toLocaleString("en-US") + " THB" : tour.price_from.toLocaleString("en-US") + " THB",
        rating: tour.rating ?? 0,
        duration: tour.duration,
        route: `/tours/${tour.slug}`,
        place_location : tour.location,
        maxPeople: firstPackage?.max_people,
        tourType: tour.tour_type,
      };
    });
  },

  /** 🔍 Get a single tour by slug */
  async getBySlug(slug: string): Promise<Tour | null> {
    const q = query(collection(db, TOURS), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    const tour = { id: docSnap.id, ...docSnap.data() } as Tour;

    tour.images = await this.getImages(tour.id);
    tour.packages = await this.getPackages(tour.id);
    return tour;
  },

  /** 📘 Get a tour by ID */
  async getById(id: string): Promise<Tour | null> {
    const ref = doc(db, TOURS, id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    const tour = { id: snap.id, ...snap.data() } as Tour;
    tour.images = await this.getImages(id);
    tour.packages = await this.getPackages(id);
    return tour;
  },

  /** ➕ Create a new tour */
  async create(data: Omit<Tour, "id" | "created_at" | "updated_at">): Promise<string> {
    const ref = await addDoc(collection(db, TOURS), {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return ref.id;
  },

  /** ✏️ Update a tour */
  async update(id: string, data: Partial<Tour>): Promise<void> {
    const ref = doc(db, TOURS, id);
    await updateDoc(ref, { ...data, updated_at: new Date() });
  },

  /** 🗑️ Delete a tour and its related data */
  async remove(id: string): Promise<void> {
    await Promise.all([
      this.deleteImagesByTour(id),
      this.deletePackagesByTour(id),
      deleteDoc(doc(db, TOURS, id)),
    ]);
  },

  /** 🖼️ Add image */
  async addImage(tourId: string, imageUrl: string, orderIndex?: number): Promise<void> {
    await addDoc(collection(db, TOUR_IMAGES), {
      tour_id: tourId,
      image_url: imageUrl,
      order_index: orderIndex,
    });
  },

  /** 🎟️ Add package */
  async addPackage(tourId: string, pkg: Omit<Package, "id" | "tour_id">): Promise<void> {
    await addDoc(collection(db, PACKAGES), {
      ...pkg,
      tour_id: tourId,
    });
  },

  /** 🔹 Get images for a tour */
  async getImages(tourId: string): Promise<TourImage[]> {
    const q = query(collection(db, TOUR_IMAGES), where("tour_id", "==", tourId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as TourImage)
    );
  },

  /** 🔹 Get packages for a tour */
  async getPackages(tourId: string): Promise<Package[]> {
    const q = query(collection(db, PACKAGES), where("tour_id", "==", tourId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Package)
    );
  },

  /** 🗑️ Helpers */
  async deleteImagesByTour(tourId: string): Promise<void> {
    const q = query(collection(db, TOUR_IMAGES), where("tour_id", "==", tourId));
    const snapshot = await getDocs(q);
    await Promise.all(snapshot.docs.map((d) => deleteDoc(doc(db, TOUR_IMAGES, d.id))));
  },

  async deletePackagesByTour(tourId: string): Promise<void> {
    const q = query(collection(db, PACKAGES), where("tour_id", "==", tourId));
    const snapshot = await getDocs(q);
    await Promise.all(snapshot.docs.map((d) => deleteDoc(doc(db, PACKAGES, d.id))));
  },
};
