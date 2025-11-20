import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function MapSection({
  sampleProperties,
}: {
  sampleProperties: any[];
}) {
  return (
    <section className="w-full h-[50vh] mt-20 sm:mt-28 relative z-0">
      <MapContainer
        center={[13.7563, 100.5018]}
        zoom={5}
        className="h-full w-full "
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {sampleProperties.map((p: any) => (
          <Marker
            key={p.id}
            position={[13.7563 + Math.random(), 100.5018 + Math.random()]}
          >
            <Popup>
              {p.title} <br /> {p.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
