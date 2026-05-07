import './Spinner.css';

// This component renders a reusable loading spinner.
//
// Why this exists:
// - Loading states happen everywhere in apps
// - Reusable UI prevents duplication
// - Keeps loading logic visually consistent

export const Spinner = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner' />
    </div>
  );
};
