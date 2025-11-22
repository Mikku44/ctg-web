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
  serverTimestamp,
  limit as fbLimit,
  orderBy,
  startAfter
} from "firebase/firestore";
import type { TourCardProps } from "~/components/featureCard";
import { db } from "~/lib/firebase/config";
import type { Package, Tour, TourImage } from "~/models/tour";


const TOURS = "Tours";
const TOUR_IMAGES = "Images";
const PACKAGES = "Packages";

export const tourService = {
  /** 🧭 Get all published tours with related images + packages */
  async getAll(limit?: number): Promise<Tour[]> {
    let q = query(
      collection(db, TOURS),
      where("status", "==", "published")
    );

    // Add Firestore limit if provided
    if (limit && limit > 0) {
      q = query(
        collection(db, TOURS),
        where("status", "==", "published"),
        fbLimit(limit)
      );
    }

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

  async getPaginated(pageSize: number = 10, cursor?: string) {
    const baseCollection = collection(db, TOURS);

    let q;

    // Cursor exists → load the document to startAfter
    if (cursor) {
      const cursorDoc = await getDoc(doc(db, TOURS, cursor));
      if (!cursorDoc.exists()) {
        throw new Error("Cursor document not found");
      }

      q = query(
        baseCollection,
        // where("status", "==", "published"),
        // orderBy("createdAt", "desc"),
        startAfter(cursorDoc),
        fbLimit(pageSize)
      );
    } else {
      // First page (no cursor)
      q = query(
        baseCollection,
        // where("status", "==", "published"),
        // orderBy("createdAt", "desc"),
        fbLimit(pageSize)
      );
    }

    const snapshot = await getDocs(q);

    const tours: Tour[] = [];
    for (const docSnap of snapshot.docs) {
      const tour = { id: docSnap.id, ...docSnap.data() } as Tour;
      tour.images = await this.getImages(tour.id);
      tour.packages = await this.getPackages(tour.id);
      tours.push(tour);
    }

    // Pagination metadata
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return {
      tours,
      nextCursor: lastDoc ? lastDoc.id : null,
      hasMore: !!lastDoc,
    };
  },
  async getPaginatedForCardByPage(page: number, pageSize: number = 8) {
    if (page < 1) page = 1;

    let cursor: string | undefined = undefined;
    let result;

    // Iterate until we reach desired page
    for (let i = 1; i <= page; i++) {
      result = await this.getPaginatedForCard(pageSize, cursor);
      cursor = result.nextCursor || undefined;

      // If there are no more pages, break early
      if (!result.hasMore && i < page) {
        break;
      }
    }

    return result!;
  },

  async getPaginatedForCard(pageSize: number = 10, cursor?: string) {
    // Reuse your main pagination logic
    const { tours, nextCursor, hasMore } = await this.getPaginated(pageSize, cursor);

    // Transform into Card Props
    const cardTours: TourCardProps[] = tours.map((tour) => {
      const firstPackage = tour.packages?.[0];

      return {
        id: tour.id,
        slug: tour.slug,
        image: tour.featured_image || tour.images?.[0]?.image_url || "",
        title: tour.title,
        description: tour.description,
        price: tour.price_from ?? 0,
        rating: tour.rating ?? 0,
        duration: tour.duration,
        route: `/tours/${tour.slug}`,
        place_location: tour.location,
        maxPeople: firstPackage?.max_people,
        recommended: tour.recommended,
        tourType: tour.tour_type,
      };
    });

    return {
      tours: cardTours,
      nextCursor,
      hasMore,
    };
  },

  async getAllForCard(limit?: number): Promise<TourCardProps[]> {
    const tours = await this.getAll(limit);

    return tours.map((tour) => {
      const firstPackage = tour.packages?.[0];

      return {
        id: tour.id,
        slug: tour.slug,
        image: tour.featured_image || tour.images?.[0]?.image_url || "",
        title: tour.title,
        description: tour.description,
        price: tour.price_from ?? 0,
        rating: tour.rating ?? 0,
        duration: tour.duration,
        route: `/tours/${tour.slug}`,
        place_location: tour.location,
        maxPeople: firstPackage?.max_people,
        recommended: tour.recommended,
        tourType: tour.tour_type,
      };
    });
  },
  // search
  async getSeachForCard(search?: string): Promise<TourCardProps[]> {
    const toursRef = collection(db, "tours");
    let q;

    if (search) {
      // Firestore does not support 'contains' or OR queries natively.
      // Example: simple equality search on title (you can expand to multiple queries)
      q = query(toursRef, where("title", "==", search));
    } else {
      q = query(toursRef);
    }

    const snapshot = await getDocs(q);
    const tours = snapshot.docs.map((doc) => doc.data());

    return tours.map((tour: any) => {
      const firstPackage = tour.packages?.[0];
      return {
        id: tour.id,
        slug: tour.slug,
        image: tour.featured_image || tour.images?.[0]?.image_url || "",
        title: tour.title,
        description: tour.description,
        price: tour.price_from ?? 0,
        rating: tour.rating ?? 0,
        duration: tour.duration,
        route: `/tours/${tour.slug}`,
        place_location: tour.location,
        maxPeople: firstPackage?.max_people,
        recommended: tour.recommended,
        tourType: tour.tour_type,
      } as TourCardProps;
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

  async updateImages(tourId: string, images: { image_url: string }[]): Promise<void> {
    // 1. Delete all existing images for this tour
    const q = query(collection(db, TOUR_IMAGES), where("tour_id", "==", tourId));
    const snapshot = await getDocs(q);

    await Promise.all(
      snapshot.docs.map((d) => deleteDoc(doc(db, TOUR_IMAGES, d.id)))
    );

    // 2. Add new images with correct order
    await Promise.all(
      images.map((img, index) =>
        addDoc(collection(db, TOUR_IMAGES), {
          tour_id: tourId,
          image_url: img.image_url,
          order_index: index,
          created_at: serverTimestamp(),
        })
      )
    );
  },

  async updateImage(tourId: string, image_url: string, order_index: number): Promise<void> {
    // Query for existing image with this order_index
    const q = query(
      collection(db, TOUR_IMAGES),
      where("tour_id", "==", tourId),
      where("order_index", "==", order_index)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Image exists → update
      const docRef = doc(db, TOUR_IMAGES, snapshot.docs[0].id);
      await updateDoc(docRef, {
        image_url,
        updated_at: serverTimestamp(),
      });
    } else {
      // No image exists → create new doc
      await addDoc(collection(db, TOUR_IMAGES), {
        tour_id: tourId,
        image_url,
        order_index,
        created_at: serverTimestamp(),
      });
    }
  },

  async deletePackagesByTour(tourId: string): Promise<void> {
    const q = query(collection(db, PACKAGES), where("tour_id", "==", tourId));
    const snapshot = await getDocs(q);
    await Promise.all(snapshot.docs.map((d) => deleteDoc(doc(db, PACKAGES, d.id))));
  },
};
