export async function fetchListings() {
  const res = await fetch('/data/listings.json', {cache: 'no-store'});
  if (!res.ok) throw new Error('Failed to fetch listings');
  return res.json();
}

export async function fetchListingById(id) {
  const list = await fetchListings();
  return list.find((p) => String(p.id) === String(id)) || null;
}
