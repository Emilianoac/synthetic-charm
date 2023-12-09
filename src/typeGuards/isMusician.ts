import type { Musician, ProfileImage, Album, Cover } from "@/interfaces/musician";

export function isMusician(object: any): object is Musician {
  return (
    typeof object === "object" &&
    "color" in object &&
    "age" in object &&
    "musical_genre" in object &&
    "instrument" in object &&
    "slug" in object &&
    isProfileImage(object.profileImage) &&
    "name" in object &&
    "bio" in object &&
    "country" in object &&
    typeof object.date === "number" &&
    "fun_fact" in object &&
    Array.isArray(object.albums) &&
    object.albums.every(isAlbum) &&
    "id" in object
  );
}

function isProfileImage(object: any): object is ProfileImage {
  return (
    typeof object === "object" &&
    "name" in object &&
    "url" in object
  );
}

function isAlbum(object: any): object is Album {
  return (
    typeof object === "object" &&
    "songs" in object &&
    Array.isArray(object.songs) &&
    "title" in object &&
    "year" in object &&
    isCover(object.cover)
  );
}

function isCover(object: any): object is Cover {
  return (
    typeof object === "object" &&
    "name" in object &&
    "url" in object
  );
}
