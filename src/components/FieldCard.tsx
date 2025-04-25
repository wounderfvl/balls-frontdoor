import Link from "next/link";

export function FieldCard({
  field,
}: {
  field: {
    id: number;
    name: string;
    location: string;
    image?: string;
  };
}) {
  return (
    <div className="field-card">
      <div className="field-image">
        {field.image ? (
          <img src={field.image} alt={field.name} />
        ) : (
          <div className="image-placeholder">{field.name}</div>
        )}
      </div>
      <div className="field-info">
        <h3>{field.name}</h3>
        <p>{field.location}</p>
        <Link href={`/booking?field=${field.id}`} className="book-button">
          Book Now
        </Link>
      </div>
    </div>
  );
}
