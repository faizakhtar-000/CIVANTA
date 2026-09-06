import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { MapPin, Filter, Layers } from "lucide-react";
import { mockSubmissions } from "../../data/mockData";

const statusColors = {
  Submitted: "#f59e0b",
  Verified: "#8b5cf6",
  Assigned: "#6366f1",
  "In Progress": "#3b82f6",
  Resolved: "#10b981",
};

const locationCoords = {
  "Bengaluru, Karnataka": [12.9716, 77.5946],
  "Noida, Uttar Pradesh": [28.5355, 77.391],
  "Ahmedabad, Gujarat": [23.0225, 72.5714],
  "Kochi, Kerala": [9.9312, 76.2673],
  "Hyderabad, Telangana": [17.385, 78.4867],
  "Mumbai, Maharashtra": [19.076, 72.8777],
  "Delhi, Delhi": [28.7041, 77.1025],
  "Chennai, Tamil Nadu": [13.0827, 80.2707],
};

const filters = [
  { key: "all", label: "All" },
  { key: "Submitted", label: "Pending" },
  { key: "In Progress", label: "In Progress" },
  { key: "Resolved", label: "Resolved" },
  { key: "high-priority", label: "High Priority" },
];

export default function MapView({
  submissions = mockSubmissions,
  height = "500px",
  interactive = true,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = submissions.filter((s) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "high-priority") {
      return s.priority === "High";
    }
    return s.status === activeFilter;
  });

  // Create map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: interactive,
    });

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }
    ).addTo(map);

    mapInstanceRef.current = map;

    // Fix initial rendering size
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [interactive]);

  // Add markers
  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) return;

    markersRef.current.forEach((marker) => {
      marker.remove();
    });

    markersRef.current = [];

    filtered.forEach((sub) => {
      const coords =
        locationCoords[sub.location] || [20.5937, 78.9629];

      const color = statusColors[sub.status] || "#6366f1";

      const marker = L.circleMarker(coords, {
        radius: sub.priority === "High" ? 10 : 7,
        fillColor: color,
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Arial; min-width: 200px;">
          <div style="font-size: 11px; color: #64748b;">
            ${sub.id}
          </div>

          <div style="font-weight: 600; margin: 4px 0;">
            ${sub.title}
          </div>

          <div style="font-size: 12px; color: #475569;">
            📍 ${sub.location}
          </div>

          <div style="margin-top: 6px;">
            <b>${sub.status}</b>
          </div>
        </div>
      `);

      marker.on("click", () => {
        setSelected(sub);
      });

      markersRef.current.push(marker);
    });

    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.2));
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [filtered]);

  return (
    <div className="space-y-4">

      {/* Filters */}
      <Card className="p-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 px-2">
          <Filter className="h-4 w-4" />
          Filter:
        </div>

        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeFilter === filter.key
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {filter.label}
          </button>
        ))}

        <div className="ml-auto text-xs text-slate-500">
          <span className="font-semibold text-slate-900">
            {filtered.length}
          </span>{" "}
          submissions
        </div>
      </Card>

      {/* MAP */}
      <div
        className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-soft"
        style={{ height }}
      >
        <div
          ref={mapRef}
          style={{
            height: "100%",
            width: "100%",
            minHeight: "600px",
          }}
        />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-card p-3 z-[400]">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
            <Layers className="h-3 w-3" />
            Status Legend
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {Object.entries(statusColors).map(
              ([status, color]) => (
                <div
                  key={status}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: color }}
                  />

                  <span className="text-slate-600">
                    {status}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Selected submission */}
      {selected && (
        <Card className="p-4 flex items-start gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                statusColors[selected.status] + "20",
            }}
          >
            <MapPin
              className="h-5 w-5"
              style={{
                color: statusColors[selected.status],
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500">
                {selected.id}
              </span>

              <Badge
                tone={
                  selected.priority === "High"
                    ? "rose"
                    : selected.priority === "Medium"
                    ? "amber"
                    : "slate"
                }
              >
                {selected.priority}
              </Badge>
            </div>

            <div className="font-semibold text-slate-900 mt-1">
              {selected.title}
            </div>

            <div className="text-sm text-slate-600">
              📍 {selected.location}
            </div>
          </div>

          <button
            onClick={() => setSelected(null)}
            className="text-xs text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </Card>
      )}
    </div>
  );
}