// This component is responsible for showing how many listings
// the user has saved (liked).
//
// It is a PURE component:
// - It does NOT manage state
// - It simply displays a number passed from the parent
//
// Why this exists:
// - Keeps UI logic (like pluralization) out of the page
// - Makes the badge reusable anywhere in the app
// - Keeps the ListingsPage cleaner and focused on state

interface Props {
  count: number; // Number of saved listings
}

export const SavedBadge = ({ count }: Props) => {
  // Decide the correct label:
  // "1 saved" (singular) vs "X saved" (plural)
  const label = count === 1 ? '1 saved' : `${count} saved`;

  return <div className='saved-badge'>{label}</div>;
};
